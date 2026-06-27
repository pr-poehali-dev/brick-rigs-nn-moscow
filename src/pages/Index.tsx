import { useRef } from 'react';
import Icon from '@/components/ui/icon';

const NN_IMG = 'https://cdn.poehali.dev/projects/880e65a8-0481-459a-aad5-111eba817912/files/8befb2d5-ba3d-4e44-88ae-e2e0d04661d8.jpg';
const MSK_IMG = 'https://cdn.poehali.dev/projects/880e65a8-0481-459a-aad5-111eba817912/files/1d5da627-7d6b-4703-90ff-3a1c67ad0357.jpg';
const DISCORD = 'https://discord.gg/4TkbDG3a2b';

const RULES = [
  { num: '1', title: 'RP / РП', full: 'Role Play / Ролевая игра', desc: 'Отыгровка персонажа и его жизни.' },
  { num: '1.1', title: 'Non RP / Нон РП', full: 'Non Role Play / Не Ролевая Игра', desc: 'Действия нарушающие РП процесс.', punishment: 'Бан 1 день' },
  { num: '1.2', title: 'NRD / НРД', full: 'Non RP Drive / Вождение не Ролевой Игры', desc: 'Езда с нарушением ПДД, с многочисленными ДТП и созданием опасности на дорогах.', punishment: 'Бан 1 день' },
  { num: '1.3', title: 'ООС', full: 'Out Of Character / Не В Персонаже', desc: 'Действия происходящие вне основного РП процесса.' },
  { num: '1.4', title: 'IC / ИС', full: 'In Character / В Персонаже', desc: 'Действия происходящие в основном РП процессе.' },
  { num: '1.5', title: 'DM / ДМ', full: 'Death Match / Смертельный поединок', desc: 'Убийство без каких-либо IC причин.', punishment: 'Бан 1 день' },
  { num: '1.5.1', title: 'MDM / МДМ', full: 'Mass Death Match / Массовый Смертельный Поединок', desc: 'Убийство без каких-либо IC причин более 2-ух раз.', punishment: 'Бан от 3 до 7 дней' },
  { num: '1.5.2', title: 'RK / РК', full: 'Revange Kill / Убийство с целью Мести', desc: 'Убийство с целью мести игрока — например, если он вас убил по IC и вы решили отомстить.', punishment: 'Бан 2 дня' },
  { num: '1.5.3', title: 'TK / ТК', full: 'Team Kill / Убийство Своих', desc: 'Убийство людей, находящихся в вашей команде или фракции.', punishment: 'Бан 2 дня' },
  { num: '1.5.4', title: 'SK / СК', full: 'Spawn Kill / Убийство на месте Появления', desc: 'Убийство любого человека при месте появления.', punishment: 'Бан 1 день' },
  { num: '1.6', title: 'PG / ПГ', full: 'Power Gaming / Игра Силы', desc: 'Отсутствие страха потерять жизнь, представление себя супергероем, который может вынести толпу в драке.', punishment: 'Бан 5 дней' },
  { num: '1.7', title: 'FRP / ФРП', full: 'Fear Role Play / Ролевая Игра со Страхом', desc: 'Вы обязаны бояться навредить себе и потерять жизнь.', punishment: 'Бан 1 день' },
  { num: '1.8', title: 'MG / МГ', full: 'Meta Gaming / Мета Игра', desc: 'Вы не имеете права использовать знания, которые ваш РП персонаж не знает.', punishment: 'Бан 2 дня' },
  { num: '1.9', title: 'NLR / НЛР', full: 'New Life Rule / Правило Новой Жизни', desc: 'После смерти ваш персонаж забывает что было до смерти — у вас частичная амнезия.' },
  { num: '2', title: 'GM / ГМ', full: 'God Mode / Режим Бога', desc: 'Вы не можете включать ГМ в РП (кнопка I на клавиатуре).', punishment: 'Бан 4 дня' },
  { num: '2.1', title: 'FRCR / ФРКР', full: 'Free Car / Бесплатный Автомобиль', desc: 'Вы не можете призывать автомобиль, если он не зарегистрирован (исключения: велосипед, питбайки) или вы попали в ДТП.', punishment: 'Бан 2 дня' },
  { num: '2.2', title: 'FRP / ФРП', full: 'Fail Role Play / Мешать Ролевой Игре', desc: 'Нет права войти в РП с другими гражданами, помешав их основной РП игре.', punishment: 'Бан 1 день' },
  { num: '2.3', title: 'FRTP / ФРТП', full: 'Free Teleport / Бесплатный телепорт', desc: 'Телепорт на любые расстояния запрещён.', punishment: 'Бан 2 дня' },
  { num: '2.4', title: 'FRRS / ФРРС', full: 'Free Respawn / Бесплатное Перерождение', desc: 'Запрещается возрождаться до прибытия медиков.', punishment: 'Бан 1 день' },
  { num: '2.5', title: 'CDOD / КДОД', full: 'Call Doctors On Death / Позвонить Медикам При Смерти', desc: 'Правило позволяет вызвать медиков, находясь без сознания.' },
  { num: '2.6', title: 'DR / ДР', full: 'Death Rule / Правило Смерти', desc: 'После того как здоровье падает на 0% — вы теряете сознание. Можно позвонить медикам или полиции, но нельзя писать в общий чат.', punishment: 'Бан 1 день' },
  { num: '2.7', title: 'CR / КР', full: 'Car Rule / Правило Машин', desc: 'Нельзя призывать военную технику — за это бан 4 дня (исключение: фракция ВП и Армия). Призыв машины с подозрительным/неадекватным названием — перманентный бан.', punishment2: [{ label: 'Военная техника', ban: 'Бан 4 дня' }, { label: 'Подозрит. название', ban: 'Перм бан' }] },
];

const Index = () => {
  const rulesRef = useRef<HTMLElement>(null);

  const scrollToRules = () => {
    rulesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Декоративные размытые круги */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="animate-float-up mb-8 flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm text-muted-foreground" style={{ animationDelay: '0ms' }}>
          <Icon name="Gamepad2" size={16} />
          Brick Rigs · РП проект
        </div>

        <h1 className="animate-float-up font-display max-w-4xl text-4xl font-bold leading-tight sm:text-6xl md:text-7xl" style={{ animationDelay: '120ms' }}>
          Нижегородская
          <span className="block text-muted-foreground">/ Московская</span>
          области РП
        </h1>

        <p className="animate-float-up mt-8 max-w-2xl text-lg font-medium text-foreground/90 sm:text-2xl" style={{ animationDelay: '240ms' }}>
          Мы медиум рп проект, который давно на страницах Brick Rigs!
        </p>

        <div className="animate-float-up mt-12 flex flex-col items-center gap-4" style={{ animationDelay: '360ms' }}>
          <p className="text-muted-foreground">Вот наш дискорд сервер:</p>
          <a
            href={DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="glow group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <Icon name="MessageCircle" size={22} />
            Присоединиться в Discord
            <Icon name="ArrowRight" size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
          <span className="text-sm text-muted-foreground">{DISCORD}</span>
        </div>

        <div className="absolute bottom-8 animate-bounce text-muted-foreground">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ГОРОДА */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display mb-12 text-center text-3xl font-bold sm:text-4xl">Наши города</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Нижний Новгород — с переворотом */}
          <div className="group" style={{ perspective: '1000px' }}>
            <div
              className="relative transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(0deg)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'rotateY(180deg)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'rotateY(0deg)')}
            >
              {/* ЛИЦО */}
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card" style={{ backfaceVisibility: 'hidden' }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={NN_IMG} alt="Нижний Новгород" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-display mb-3 text-2xl font-bold">Нижний Новгород</h3>
                  <p className="text-muted-foreground">Город на слиянии Оки и Волги. Кремль, набережные и атмосфера старого центра в нашем РП.</p>
                </div>
              </div>

              {/* ОБОРОТ */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-card flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <Icon name="PartyPopper" size={40} className="mb-4 text-muted-foreground" />
                <p className="text-foreground text-base font-medium leading-relaxed">
                  Сайт кста сделан в 3 часа ночи лол кек чебурек ( Достаточно кринжово было? )
                </p>
              </div>
            </div>
          </div>

          {/* Москва — с переворотом */}
          <div className="group" style={{ perspective: '1000px' }}>
            <div
              className="relative transition-transform duration-700"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateY(0deg)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'rotateY(180deg)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'rotateY(0deg)')}
            >
              {/* ЛИЦО */}
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card" style={{ backfaceVisibility: 'hidden' }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={MSK_IMG} alt="Москва" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-display mb-3 text-2xl font-bold">Москва</h3>
                  <p className="text-muted-foreground">Столица в огнях. Небоскрёбы Москва-Сити и исторический центр для ваших ролевых историй.</p>
                </div>
              </div>

              {/* ОБОРОТ */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-card flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <Icon name="Ghost" size={40} className="mb-4 text-muted-foreground" />
                <p className="text-foreground text-base font-medium leading-relaxed">
                  Тут ничего нет :)))
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка перехода к правилам */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={scrollToRules}
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-accent hover:scale-105"
          >
            <Icon name="BookOpen" size={22} />
            Правила нашего проекта
            <Icon name="ChevronDown" size={20} className="transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display mb-12 text-center text-3xl font-bold sm:text-4xl">О проекте</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: 'Users', title: 'Медиум РП', text: 'Сбалансированный ролевой режим: серьёзный отыгрыш без лишней зарегулированности.' },
            { icon: 'History', title: 'История', text: 'Мы давно на страницах Brick Rigs и продолжаем развивать сообщество игроков.' },
            { icon: 'MapPin', title: 'Две области', text: 'Нижегородская и Московская — два мира со своей атмосферой и сюжетами.' },
          ].map((f) => (
            <div key={f.title} className="rounded-[2rem] border border-border bg-card p-8 text-center transition-colors hover:bg-accent">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Icon name={f.icon} size={28} />
              </div>
              <h3 className="font-display mb-2 text-xl font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="glow mt-8 rounded-[2rem] border border-border bg-card p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Icon name="Sparkle" size={28} />
            </div>
            <div>
              <h3 className="font-display mb-3 text-xl font-bold">Как всё начиналось</h3>
              <p className="text-muted-foreground">
                Хоть у нас мало активных участников на данный момент, но наш сервер был создан в декабре 2025-го года
                двумя друзьями — <span className="font-semibold text-foreground">Mryo</span> (сейчас{' '}
                <span className="font-semibold text-foreground">trauma</span>) и{' '}
                <span className="font-semibold text-foreground">SHAITANMASHINANAHUY#HUY</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ПРАВИЛА */}
      <section ref={rulesRef} className="mx-auto max-w-4xl scroll-mt-8 px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-card border border-border">
            <Icon name="BookOpen" size={28} />
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Правила проекта</h2>
          <p className="mt-3 text-muted-foreground">Соблюдай правила — и игра будет честной для всех</p>
        </div>

        <div className="relative flex flex-col">
          {/* Вертикальная линия-хребет */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/40" />

          {RULES.map((rule, idx) => {
            const depth = rule.num.split('.').length - 1;
            const isRoot = depth === 0;
            const r = rule as typeof RULES[number] & { punishment2?: {label: string; ban: string}[] };

            return (
              <div key={rule.num} className="relative flex items-start gap-3 py-1">
                {/* Кружок на линии */}
                <div className={`relative z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold transition-colors
                  ${isRoot
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card text-muted-foreground border-border/50'}`}>
                  {isRoot ? rule.num : '·'}
                </div>

                {/* Горизонтальная черта от кружка к карточке */}
                <div className="absolute left-10 top-[1.35rem] h-px w-3 bg-border/40" />

                {/* Карточка */}
                <div className={`flex-1 rounded-2xl border p-4 transition-colors
                  ${isRoot
                    ? 'border-border bg-card'
                    : 'border-border/30 bg-card/40 hover:bg-card/70'}`}
                  style={{ marginLeft: `${depth * 12}px` }}
                >
                  <div className="flex flex-wrap items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${isRoot ? 'font-bold text-foreground' : 'font-semibold text-foreground'}`}>
                        {rule.title}
                        <span className="ml-1.5 font-normal text-muted-foreground text-xs">— {rule.full}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{rule.desc}</p>

                      {r.punishment2 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {r.punishment2.map((p) => (
                            <span key={p.label} className="inline-flex items-center gap-1 rounded-xl border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-red-400">
                              <Icon name="AlertTriangle" size={10} />
                              <span className="text-muted-foreground font-normal">{p.label}:</span>
                              {p.ban}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {'punishment' in rule && rule.punishment && !r.punishment2 && (
                      <span className="shrink-0 self-start inline-flex items-center gap-1 rounded-xl border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-red-400 whitespace-nowrap">
                        <Icon name="AlertTriangle" size={10} />
                        {rule.punishment}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground/70 max-w-xl mx-auto leading-relaxed">
          Каждый бан может быть обжалован на нашем{' '}
          <a href="https://discord.gg/4TkbDG3a2b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
            Discord-сервере
          </a>
          . Никакие обстоятельства, которые вы назовёте, не освобождают от ответственности.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="glow rounded-[2.5rem] border border-border bg-card p-10 text-center sm:p-16">
          <Icon name="Sparkles" size={36} className="mx-auto mb-6 text-foreground" />
          <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">Готов начать игру?</h2>
          <p className="mb-8 text-muted-foreground">Заходи на наш Discord-сервер и стань частью истории проекта.</p>
          <a
            href={DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <Icon name="MessageCircle" size={22} />
            Открыть Discord
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        Нижегородская / Московская области РП · Brick Rigs
      </footer>
    </div>
  );
};

export default Index;