import { scrollToId } from '@/components/Header';
import Icon from '@/components/ui/icon';

const CONTENTS = [
  { num: '01', title: 'Кремация и урна', note: 'Самый распространённый городской путь' },
  { num: '02', title: 'Дерево памяти', note: 'Эко-захоронение: капсула и саженец' },
  { num: '03', title: 'Развеивание праха', note: 'Ветер, вода, любимое место' },
  { num: '04', title: 'Украшение из праха', note: 'Кристалл или стекло на память' },
  { num: '05', title: 'Криоконсервация', note: 'Хранение при сверхнизких температурах' },
  { num: '06', title: 'Мумификация и древние ритуалы', note: 'От бальзамирования до пластинации' },
];

const Hero = () => {
  return (
    <section id="glavnaya" className="paper-grain pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="mx-auto max-w-folio px-5 md:px-10 lg:px-16">
        <p className="mb-8 text-[0.78em] uppercase tracking-[0.28em] text-folio">
          Справочник · Издание о прощании
        </p>

        <h1 className="max-w-[16ch] font-display text-[3.1em] font-normal leading-[1.02] tracking-[-0.01em] text-foreground md:text-[5.2em] lg:text-[6.2em]">
          Каждый имеет право на свой способ прощания с миром
        </h1>

        <div className="mt-10 grid gap-8 border-t border-rule pt-8 md:mt-16 md:grid-cols-12 md:gap-12">
          <p className="max-w-[46ch] text-folio md:col-span-5 lg:col-span-4">
            Шесть способов — от привычной кремации до дерева памяти и
            криоконсервации. Мы объясняем, как устроен каждый, что говорит
            российский закон и как заранее записать свою волю так, чтобы её
            исполнили.
          </p>

          <div className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <p className="mb-6 text-[0.78em] uppercase tracking-[0.24em] text-folio">
              Содержание
            </p>
            <ul>
              {CONTENTS.map((item) => (
                <li key={item.num} className="border-t border-rule first:border-t-0">
                  <button
                    onClick={() => scrollToId('sposoby')}
                    className="group flex w-full items-baseline gap-5 py-4 text-left md:py-5"
                  >
                    <span className="font-display text-[1.1em] text-folio tabular-nums">
                      {item.num}
                    </span>
                    <span className="flex-1">
                      <span className="story-link font-display text-[1.55em] leading-tight text-foreground md:text-[1.9em]">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[0.82em] text-folio">
                        {item.note}
                      </span>
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      size={20}
                      className="mt-1 shrink-0 text-folio transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
