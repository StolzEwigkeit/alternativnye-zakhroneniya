const STATS = [
  { value: '6', label: 'способов, разобранных по шагам' },
  { value: '№8-ФЗ', label: 'основной закон о погребении' },
  {
    value: '3',
    label: 'шага помощи: подбор, волеизъявление, контроль исполнения',
  },
];

const Manifesto = () => {
  return (
    <section
      id="zachem"
      className="border-t border-rule bg-card py-16 md:py-28"
    >
      <div className="mx-auto max-w-folio px-5 md:px-10 lg:px-16">
        <p className="mb-10 text-[0.78em] uppercase tracking-[0.28em] text-folio">
          Зачем этот справочник
        </p>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <figure className="md:col-span-5">
            <div className="overflow-hidden bg-background">
              <img
                src="https://cdn.poehali.dev/projects/e5088199-e505-4ed2-9b02-966e302bf100/files/76a13582-75d7-44aa-85e6-5a0c498699f6.jpg"
                alt="Керамическая урна с молодым саженцем"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 border-t border-rule pt-3 text-[0.8em] leading-relaxed text-folio">
              Биоразлагаемая урна с саженцем: прах становится частью дерева, а
              место памяти — живым.
            </figcaption>
          </figure>

          <div className="md:col-span-7">
            <blockquote className="font-display text-[2em] leading-[1.12] text-foreground md:text-[3em]">
              «Каждый имеет право на свой способ прощания с миром»
            </blockquote>

            <div className="mt-10 space-y-6 text-foreground/90">
              <p className="drop-cap">
                В России о смерти говорят шёпотом. Тему обходят за столом,
                откладывают «на потом» и почти никогда не обсуждают с теми, кого
                она коснётся в первую очередь. В итоге хоронят «как принято»: по
                инерции, по совету случайного агента, в спешке первых суток.
                Человек мог мечтать, чтобы его прах развеяли над морем или
                вырастили из него дерево, — но никто об этом не знал, а спросить
                было неловко.
              </p>
              <p>
                Этот проект не оказывает ритуальных услуг и не проводит похороны.
                Мы рассказываем о существующих способах простым языком, помогаем
                подобрать тот, что ближе именно вам, корректно оформить
                волеизъявление и — по желанию — проследить, чтобы его исполнили.
                Без навязчивых звонков, без прайсов и без попыток что-либо
                продать.
              </p>
            </div>

            <dl className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.value}>
                  <dt className="font-display text-[2.2em] leading-none text-primary">
                    {s.value}
                  </dt>
                  <dd className="mt-3 text-[0.82em] leading-relaxed text-folio">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
