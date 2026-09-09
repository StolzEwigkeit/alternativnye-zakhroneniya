import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const ENDPOINT = 'https://functions.poehali.dev/e2819c9c-dfcb-45d8-81f8-3a37829a36cb?action=stats';

type Row = { name: string; views: number };
type Day = { day: string; views: number; visitors: number };

type Stats = {
  total: number;
  uniques: number;
  today: number;
  todayUniques: number;
  daily: Day[];
  sections: Row[];
  sources: Row[];
  devices: Row[];
};

const DEVICE_LABEL: Record<string, string> = {
  desktop: 'Компьютер',
  mobile: 'Телефон',
  tablet: 'Планшет',
};

const Bars = ({ rows, empty }: { rows: Row[]; empty: string }) => {
  if (!rows.length) return <p className="text-[0.86em] text-folio">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.views), 1);
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.name}>
          <div className="flex items-baseline justify-between gap-4 text-[0.9em]">
            <span className="truncate">{DEVICE_LABEL[r.name] ?? r.name}</span>
            <span className="tabular-nums text-folio">{r.views}</span>
          </div>
          <div className="mt-1.5 h-1 w-full bg-rule">
            <div className="h-full bg-primary" style={{ width: `${(r.views / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
};

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border border-rule bg-card p-7">
    <h2 className="mb-5 text-[0.74em] uppercase tracking-[0.2em] text-folio">{title}</h2>
    {children}
  </section>
);

const Stats = () => {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!password) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(ENDPOINT, { headers: { 'X-Auth-Token': password } });
      if (res.status === 401) {
        setError('Неверный пароль');
        setData(null);
      } else if (!res.ok) {
        setError('Не удалось загрузить статистику');
      } else {
        setData(await res.json());
      }
    } catch {
      setError('Нет связи с сервером');
    }
    setLoading(false);
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-[380px] border border-rule bg-card p-9">
          <p className="font-display text-[1.5em] font-semibold uppercase tracking-[0.12em]">
            После<span className="text-primary">.</span>
          </p>
          <p className="mt-4 text-[0.9em] leading-[1.6] text-muted-foreground">
            Статистика посещений. Доступ только по паролю.
          </p>
          <Input
            type="password"
            value={password}
            autoFocus
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="mt-6 rounded-none border-rule bg-background"
          />
          {error && <p className="mt-3 text-[0.85em] text-destructive">{error}</p>}
          <Button
            onClick={login}
            disabled={loading}
            className="mt-5 w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? 'Проверяю…' : 'Войти'}
          </Button>
        </div>
      </div>
    );
  }

  const maxDay = Math.max(...data.daily.map((d) => d.views), 1);

  return (
    <div className="min-h-screen bg-background px-6 py-14 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-8">
          <h1 className="font-display text-[clamp(30px,4vw,48px)] font-semibold leading-none">
            Статистика посещений
          </h1>
          <a href="/" className="story-link text-[0.9em] text-muted-foreground">
            <Icon name="ArrowLeft" size={14} className="mr-1 inline" />
            На сайт
          </a>
        </div>

        <div className="mt-10 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: data.today, t: 'просмотров сегодня' },
            { n: data.todayUniques, t: 'посетителей сегодня' },
            { n: data.total, t: 'просмотров всего' },
            { n: data.uniques, t: 'посетителей всего' },
          ].map((s) => (
            <div key={s.t} className="bg-card p-7">
              <p className="font-display text-[2.6em] font-semibold leading-none text-primary tabular-nums">
                {s.n}
              </p>
              <p className="mt-2 text-[0.82em] text-muted-foreground">{s.t}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card title="Посещения за 30 дней">
            {data.daily.length ? (
              <div className="flex h-40 items-end gap-1">
                {data.daily.map((d) => (
                  <div
                    key={d.day}
                    title={`${d.day}: ${d.views} просмотров`}
                    className="flex-1 bg-primary/70 transition-colors hover:bg-primary"
                    style={{ height: `${Math.max((d.views / maxDay) * 100, 4)}%` }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[0.86em] text-folio">Пока нет данных</p>
            )}
          </Card>

          <Card title="Популярные разделы">
            <Bars rows={data.sections} empty="Пока нет данных" />
          </Card>

          <Card title="Откуда приходят">
            <Bars rows={data.sources} empty="Пока нет данных" />
          </Card>

          <Card title="Устройства">
            <Bars rows={data.devices} empty="Пока нет данных" />
          </Card>
        </div>

        <p className="mt-10 text-[0.8em] italic text-folio">
          Мы не собираем персональные данные посетителей и не передаём их третьим лицам: считаем
          только обезличенные визиты.
        </p>
      </div>
    </div>
  );
};

export default Stats;
