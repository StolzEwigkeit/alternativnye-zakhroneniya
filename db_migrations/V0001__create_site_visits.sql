CREATE TABLE IF NOT EXISTS site_visits (
    id BIGSERIAL PRIMARY KEY,
    visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    visit_day DATE NOT NULL DEFAULT CURRENT_DATE,
    path TEXT NOT NULL DEFAULT '/',
    section TEXT,
    referrer_host TEXT,
    device TEXT,
    visitor_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_site_visits_day ON site_visits (visit_day);
CREATE INDEX IF NOT EXISTS idx_site_visits_hash ON site_visits (visitor_hash);
CREATE INDEX IF NOT EXISTS idx_site_visits_section ON site_visits (section);