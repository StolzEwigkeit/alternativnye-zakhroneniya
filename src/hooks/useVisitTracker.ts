import { useEffect } from 'react';

const ENDPOINT = 'https://functions.poehali.dev/e2819c9c-dfcb-45d8-81f8-3a37829a36cb';

const detectDevice = () => {
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
};

const refHost = () => {
  if (!document.referrer) return null;
  try {
    const host = new URL(document.referrer).hostname;
    return host === location.hostname ? null : host;
  } catch {
    return null;
  }
};

const send = (section?: string) => {
  const payload = {
    path: location.pathname,
    section: section ?? null,
    referrer: refHost(),
    device: detectDevice(),
  };
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
};

export const useVisitTracker = (sections: { id: string; title: string }[] = []) => {
  useEffect(() => {
    send();
  }, []);

  useEffect(() => {
    if (!sections.length) return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target.id)) return;
          seen.add(entry.target.id);
          const found = sections.find((s) => s.id === entry.target.id);
          if (found) send(found.title);
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);
};

export default useVisitTracker;
