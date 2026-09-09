import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';

type Row = {
  method: string;
  eco: number;
  ecoLabel: string;
  cost: number;
  costLabel: string;
  access: number;
  accessLabel: string;
  note: string;
};

/** cost: 5 = минимальные расходы, 1 = максимальные */
const ROWS: Row[] = [
  {
    method: 'Кремация и урна',
    eco: 3,
    ecoLabel: 'Умеренно',
    cost: 4,
    costLabel: 'Умеренные',
    access: 5,
    accessLabel: 'Есть в большинстве крупных городов',
    note: 'В малых городах крематория может не быть — потребуется перевозка',
  },
  {
    method: 'Дерево памяти',
    eco: 5,
    ecoLabel: 'Высокая',
    cost: 3,
    costLabel: 'Умеренные',
    access: 2,
    accessLabel: 'Частные рощи, единичные проекты',
    note: 'Статуса эко-кладбища в законе нет — важно заранее решить вопрос с землёй',
  },
  {
    method: 'Развеивание праха',
    eco: 5,
    ecoLabel: 'Высокая',
    cost: 5,
    costLabel: 'Минимальные расходы',
    access: 4,
    accessLabel: 'Доступно почти везде, но с оговорками',
    note: 'Нужно согласие собственника участка; в ООПТ и на воде ограничения',
  },
  {
    method: 'Украшение из праха',
    eco: 3,
    ecoLabel: 'Умеренно',
    cost: 2,
    costLabel: 'Высокие',
    access: 3,
    accessLabel: 'Через зарубежные лаборатории',
    note: 'Ожидание от 4 до 9 месяцев; стеклянная подвеска — доступнее и быстрее',
  },
  {
    method: 'Криоконсервация',
    eco: 1,
    ecoLabel: 'Низкая',
    cost: 1,
    costLabel: 'Максимальные',
    access: 1,
    accessLabel: 'Единичные компании',
    note: 'Юридическое поле серое, научных гарантий возвращения к жизни нет',
  },
  {
    method: 'Мумификация и древние ритуалы',
    eco: 1,
    ecoLabel: 'Низкая',
    cost: 2,
    costLabel: 'Договорные',
    access: 1,
    accessLabel: 'В России практически не встречается',
    note: 'Реалистичный аналог — бальзамирование длительного хранения или пластинация',
  },
];

const Dots = ({ value }: { value: number }) => (
  <span className="inline-flex items-center gap-1" aria-label={`${value} из 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`h-[7px] w-[7px] rounded-full ${
          i <= value ? 'bg-primary' : 'bg-rule'
        }`}
      />
    ))}
  </span>
);

type SortKey = 'method' | 'eco' | 'cost' | 'access';

const Comparison = () => {
  const [sortKey, setSortKey] = useState<SortKey>('method');
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    const copy = [...ROWS];
    copy.sort((a, b) => {
      if (sortKey === 'method') return a.method.localeCompare(b.method, 'ru');
      return (b[sortKey] as number) - (a[sortKey] as number);
    });
    return asc ? copy : copy.reverse();
  }, [sortKey, asc]);

  const toggle = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const Th = ({ k, children }: { k: SortKey; children: React.ReactNode }) => (
    <TableHead className="h-auto px-4 py-4 align-bottom">
      <button
        onClick={() => toggle(k)}
        className="flex items-center gap-1.5 text-[0.72em] uppercase tracking-[0.16em] text-folio transition-colors hover:text-foreground"
      >
        {children}
        <Icon
          name={sortKey === k ? (asc ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'}
          size={13}
          className={sortKey === k ? 'text-primary' : 'opacity-40'}
        />
      </button>
    </TableHead>
  );

  return (
    <section
      id="sravnenie"
      className="border-t border-rule bg-card py-16 md:py-28"
    >
      <div className="mx-auto max-w-folio px-5 md:px-10 lg:px-16">
        <p className="mb-6 text-[0.78em] uppercase tracking-[0.28em] text-folio">
          Раздел II
        </p>
        <h2 className="max-w-[16ch] font-display text-[2.6em] leading-[1.05] text-foreground md:text-[4em]">
          Сравнение способов
        </h2>
        <p className="mt-6 max-w-[52ch] text-[0.92em] text-folio">
          Три оси: экологичность, порядок расходов и доступность. Заголовки
          колонок кликабельны — таблицу можно отсортировать по любому признаку.
        </p>

        <div className="mt-10 border border-rule bg-background">
          <Table className="text-[0.95em]">
            <TableHeader>
              <TableRow className="border-rule hover:bg-transparent">
                <Th k="method">Способ</Th>
                <Th k="eco">Экологичность</Th>
                <Th k="cost">Порядок расходов</Th>
                <Th k="access">Доступность</Th>
                <TableHead className="h-auto px-4 py-4 align-bottom text-[0.72em] uppercase tracking-[0.16em] text-folio">
                  На что обратить внимание
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((r) => (
                <TableRow key={r.method} className="border-rule hover:bg-card/60">
                  <TableCell className="px-4 py-5 align-top">
                    <span className="font-display text-[1.35em] leading-tight text-foreground">
                      {r.method}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-5 align-top">
                    <Dots value={r.eco} />
                    <span className="mt-2 block text-[0.85em] text-folio">
                      {r.ecoLabel}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-5 align-top">
                    <Dots value={r.cost} />
                    <span className="mt-2 block text-[0.85em] text-folio">
                      {r.costLabel}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-5 align-top">
                    <Dots value={r.access} />
                    <span className="mt-2 block text-[0.85em] text-folio">
                      {r.accessLabel}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[26ch] px-4 py-5 align-top text-[0.85em] leading-relaxed text-folio">
                    {r.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-6 max-w-[70ch] text-[0.82em] leading-relaxed text-folio">
          Больше точек в колонке расходов — меньше нагрузка на бюджет. Оценки
          редакционные и сравнительные: они показывают соотношение способов между
          собой, а не абсолютные величины. Точные суммы зависят от региона и
          конкретного исполнителя — прайсов мы не публикуем и ритуальных услуг не
          оказываем.
        </p>
      </div>
    </section>
  );
};

export default Comparison;