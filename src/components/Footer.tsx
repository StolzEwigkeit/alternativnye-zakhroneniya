import { scrollToId } from '@/components/Header';
import Icon from '@/components/ui/icon';

const COL_A = [
  { id: 'sposoby', label: 'Способы прощания' },
  { id: 'sravnenie', label: 'Сравнение способов' },
  { id: 'istoriya', label: 'История и культуры' },
];

const COL_B = [
  { id: 'zakon', label: 'Юридические аспекты' },
  { id: 'faq', label: 'Частые вопросы' },
  { id: 'blog', label: 'Блог' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule py-14 md:py-20">
      <div className="mx-auto max-w-folio px-5 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="font-display text-[2.2em] leading-none text-foreground">
              После<span className="text-primary">.</span>
            </p>
            <p className="mt-5 max-w-[52ch] text-[0.88em] leading-relaxed text-folio">
              Справочник об альтернативных способах захоронения. Ритуальных услуг
              мы не оказываем: рассказываем о них, помогаем подобрать способ,
              оформить волеизъявление и по желанию проследить за его исполнением.
            </p>
          </div>

          <nav className="md:col-span-3">
            <p className="mb-5 text-[0.72em] uppercase tracking-[0.2em] text-folio">
              Разделы
            </p>
            <ul className="space-y-3">
              {COL_A.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="story-link text-[0.9em] text-foreground/90 hover:text-foreground"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3">
            <p className="mb-5 text-[0.72em] uppercase tracking-[0.2em] text-folio">
              Ещё
            </p>
            <ul className="space-y-3">
              {COL_B.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="story-link text-[0.9em] text-foreground/90 hover:text-foreground"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 flex items-start gap-3 border-t border-rule pt-8 text-[0.9em] leading-relaxed text-foreground/90">
          <Icon name="Heart" size={16} className="mt-1 shrink-0 text-primary" />
          <span>
            Если вам сейчас тяжело — телефон горячей линии 8&nbsp;800&nbsp;2000&nbsp;122.
          </span>
        </p>

        <p className="mt-8 text-[0.8em] text-folio">
          © {year} «После». Материалы носят справочный характер.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
