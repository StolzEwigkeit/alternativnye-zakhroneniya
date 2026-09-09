import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';

type Post = {
  title: string;
  tag: string;
  date: string;
  read: string;
  excerpt: string;
};

const TAGS = ['Все', 'История', 'Экология', 'Право', 'Деньги', 'Личное'];

const POSTS: Post[] = [
  {
    title: 'Из чего складывается счёт за похороны и где начинается лишнее',
    tag: 'Деньги',
    date: '4 сентября 2026',
    read: '9 мин',
    excerpt:
      'Разбираем структуру расходов по позициям — что относится к необходимому, что к обрядовому, а что появляется в смете исключительно потому, что в этот момент никто не спорит.',
  },
  {
    title: 'Волеизъявление на одном листе: что написать, чтобы вас поняли',
    tag: 'Право',
    date: '28 августа 2026',
    read: '6 мин',
    excerpt:
      'Свободная форма пугает сильнее бланка. Показываем, из каких смысловых блоков собирается работающий документ и какие формулировки чаще всего вызывают споры.',
  },
  {
    title: 'Дерево вместо камня: как устроены эко-захоронения в Европе',
    tag: 'Экология',
    date: '19 августа 2026',
    read: '8 мин',
    excerpt:
      'Мемориальные леса Германии и Британии существуют десятилетиями. Смотрим, как они организованы юридически и что из этого опыта постепенно доходит до России.',
  },
  {
    title: 'Почему в России до сих пор неловко говорить о смерти',
    tag: 'Личное',
    date: '11 августа 2026',
    read: '7 мин',
    excerpt:
      'Молчание кажется формой заботы, но чаще оставляет близких наедине с решениями в худший день их жизни. О том, как начать разговор и не превратить его в драму.',
  },
  {
    title: 'Крада, курган, кладбище: тысяча лет русского прощания',
    tag: 'История',
    date: '2 августа 2026',
    read: '11 мин',
    excerpt:
      'От языческого костра к церковному погосту и первому советскому крематорию. Прослеживаем, как менялась норма — и почему многое из народных обычаев дожило до нас.',
  },
  {
    title: 'Углеродный след прощания: честный разговор о кремации',
    tag: 'Экология',
    date: '24 июля 2026',
    read: '6 мин',
    excerpt:
      'Кремация расходует газ и даёт выбросы, но не занимает землю бессрочно. Сравниваем нагрузку на среду без идеологии и лозунгов.',
  },
  {
    title: 'Кто принимает решение, если человек не оставил распоряжений',
    tag: 'Право',
    date: '15 июля 2026',
    read: '5 мин',
    excerpt:
      'Закон устанавливает очерёдность близких, но в жизни она сталкивается с семейными обидами. Объясняем порядок и типичные развилки.',
  },
  {
    title: 'Что остаётся: место памяти без могилы',
    tag: 'Личное',
    date: '6 июля 2026',
    read: '7 мин',
    excerpt:
      'Если прах развеян, а дерево растёт за тысячу километров, куда приходить в годовщину? О новых формах памяти, которые люди придумывают сами.',
  },
];

const Blog = () => {
  const [tag, setTag] = useState('Все');

  const filtered = useMemo(
    () => (tag === 'Все' ? POSTS : POSTS.filter((p) => p.tag === tag)),
    [tag],
  );

  return (
    <section id="blog" className="border-t border-rule bg-card py-16 md:py-28">
      <div className="mx-auto max-w-folio px-5 md:px-10 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 text-[0.78em] uppercase tracking-[0.28em] text-folio">
              Раздел VI
            </p>
            <h2 className="font-display text-[2.6em] leading-[1.05] text-foreground md:text-[4em]">
              Блог
            </h2>
          </div>
          <p className="max-w-[40ch] text-[0.9em] text-folio">
            Тексты о том, что обычно остаётся за скобками разговора. Анонсы
            материалов — статьи выходят постепенно.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-y border-rule py-4">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-4 py-2 text-[0.8em] uppercase tracking-[0.14em] transition-colors ${
                t === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'text-folio hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="group grid gap-3 border-b border-rule py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <span className="text-[0.74em] uppercase tracking-[0.18em] text-primary">
                  {p.tag}
                </span>
                <p className="mt-2 text-[0.82em] text-folio">
                  {p.date} · {p.read}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="max-w-[30ch] font-display text-[1.6em] leading-tight text-foreground md:text-[2.1em]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[62ch] text-[0.88em] leading-relaxed text-folio">
                  {p.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.76em] uppercase tracking-[0.16em] text-folio">
                  <Icon name="Clock3" size={14} />
                  Скоро
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
