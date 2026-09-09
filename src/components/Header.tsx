import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

export const NAV_LINKS = [
  { id: 'sposoby', label: 'Способы' },
  { id: 'sravnenie', label: 'Сравнение' },
  { id: 'istoriya', label: 'История' },
  { id: 'zakon', label: 'Закон' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'blog', label: 'Блог' },
];

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: 'smooth' });
};

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="font-display text-[1.7em] leading-none tracking-tight text-foreground"
  >
    После<span className="text-primary">.</span>
  </button>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-background/92 backdrop-blur-md border-b border-rule'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-folio items-center justify-between px-5 py-4 md:px-10 lg:px-16">
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="story-link text-[0.82em] uppercase tracking-[0.18em] text-folio hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Меню"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground"
              >
                <Icon name="Menu" size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] bg-card border-l border-border">
              <div className="mt-10 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    className="text-left font-display text-[1.8em] leading-tight text-foreground"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <p className="mt-12 text-[0.8em] leading-relaxed text-folio">
                Справочник об альтернативных способах прощания. Ритуальных услуг
                не оказываем.
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
