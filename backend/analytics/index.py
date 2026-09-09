import json
import os
import hashlib
import hmac
from datetime import date, timedelta

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}


def _resp(status, payload):
    return {
        'statusCode': status,
        'headers': {'Content-Type': 'application/json', **CORS},
        'body': json.dumps(payload, ensure_ascii=False, default=str),
        'isBase64Encoded': False,
    }


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _esc(value, limit=200):
    if value is None:
        return None
    text = str(value)[:limit]
    return text.replace("'", "''")


def _visitor_hash(ip, agent):
    salt = os.environ.get('ANALYTICS_PASSWORD', 'salt')
    raw = f'{ip}|{agent}|{date.today().isoformat()}|{salt}'
    return hashlib.sha256(raw.encode()).hexdigest()[:32]


def _track(event):
    body = json.loads(event.get('body') or '{}')
    identity = (event.get('requestContext') or {}).get('identity') or {}
    ip = identity.get('sourceIp', '0.0.0.0')
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    agent = headers.get('user-agent', '')

    path = _esc(body.get('path') or '/')
    section = _esc(body.get('section'))
    referrer = _esc(body.get('referrer'))
    device = _esc(body.get('device') or 'desktop', 20)
    vhash = _visitor_hash(ip, agent)

    section_sql = f"'{section}'" if section else 'NULL'
    referrer_sql = f"'{referrer}'" if referrer else 'NULL'

    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO site_visits (path, section, referrer_host, device, visitor_hash) "
                f"VALUES ('{path}', {section_sql}, {referrer_sql}, '{device}', '{vhash}')"
            )
    return _resp(200, {'ok': True})


def _stats(event):
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    token = headers.get('x-auth-token', '')
    secret = os.environ.get('ANALYTICS_PASSWORD', '')
    if not secret or not hmac.compare_digest(token, secret):
        return _resp(401, {'error': 'Неверный пароль'})

    since = (date.today() - timedelta(days=29)).isoformat()
    result = {}
    with _conn() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT COUNT(*), COUNT(DISTINCT visitor_hash) FROM site_visits')
            total, uniques = cur.fetchone()
            result['total'] = total
            result['uniques'] = uniques

            cur.execute(
                "SELECT COUNT(*), COUNT(DISTINCT visitor_hash) FROM site_visits "
                'WHERE visit_day = CURRENT_DATE'
            )
            t_total, t_uniques = cur.fetchone()
            result['today'] = t_total
            result['todayUniques'] = t_uniques

            cur.execute(
                'SELECT visit_day, COUNT(*), COUNT(DISTINCT visitor_hash) FROM site_visits '
                f"WHERE visit_day >= '{since}' GROUP BY visit_day ORDER BY visit_day"
            )
            result['daily'] = [
                {'day': r[0], 'views': r[1], 'visitors': r[2]} for r in cur.fetchall()
            ]

            cur.execute(
                'SELECT section, COUNT(*) FROM site_visits WHERE section IS NOT NULL '
                'GROUP BY section ORDER BY COUNT(*) DESC LIMIT 12'
            )
            result['sections'] = [{'name': r[0], 'views': r[1]} for r in cur.fetchall()]

            cur.execute(
                'SELECT COALESCE(referrer_host, %s), COUNT(*) FROM site_visits '
                'GROUP BY 1 ORDER BY COUNT(*) DESC LIMIT 10',
                ('Прямые заходы',),
            )
            result['sources'] = [{'name': r[0], 'views': r[1]} for r in cur.fetchall()]

            cur.execute('SELECT device, COUNT(*) FROM site_visits GROUP BY device')
            result['devices'] = [{'name': r[0], 'views': r[1]} for r in cur.fetchall()]

    return _resp(200, result)


def handler(event, context):
    """Собственная статистика посещений сайта: запись визита и закрытая выдача сводки по паролю."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action') or 'track'

    if action == 'stats':
        return _stats(event)
    if method == 'POST':
        return _track(event)
    return _resp(200, {'ok': True})
