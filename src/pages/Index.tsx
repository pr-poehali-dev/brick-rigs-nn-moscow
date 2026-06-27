import { useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';


interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.closest('button') || target.closest('a'))) return;
      points.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      const now = Date.now();
      points.current = points.current.filter(p => now - p.t < 1000);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.current.length > 1) {
        const total = points.current.length;
        for (let i = 1; i < total; i++) {
          const prev = points.current[i - 1];
          const curr = points.current[i];
          const age = now - curr.t;
          const progress = i / total;
          const alpha = Math.max(0, (1 - age / 1000) * 0.4);
          const lineWidth = 1 + progress * 6;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};



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
  { num: '2.7', title: 'CR / КР', full: 'Car Rule / Правило Машин', desc: 'Нельзя призывать военную технику — за это бан 4 дня (исключение: фракция ВП и Армия). Призыв машины с подозрительным/неадекватным названием — перманентный бан.', punishment2: [{ label: 'Военная техника', ban: 'Бан 4 дня' }, { label: 'Подозрит. название', ban: 'Перманентный бан' }] },
  { num: '3', title: 'Чат', full: 'от англ. to chat — «болтать, общаться»', desc: 'Средство обмена сообщениями через компьютерную сеть в режиме реального времени.' },
  { num: '3.1', title: 'Спам', full: 'Flood / Флуд', desc: 'Отправка более 3-ёх однотипных сообщений.', punishment: 'Мьют 1 час' },
  { num: '3.2', title: 'Оскорбление', full: 'Insult / Инсульт', desc: 'Отправка обидных сообщений в сторону человека.', punishment: 'Мьют 2 часа' },
  { num: '3.2.1', title: 'Оскорбление личности', full: 'Personal Insult', desc: 'Отправка обидных сообщений в сторону личности человека.', punishment: 'Мьют 3 часа' },
  { num: '3.2.2', title: 'Оскорбление религии', full: 'Religious Insult', desc: 'Отправка обидных сообщений в сторону религии человека.', punishment: 'Мьют 4 часа' },
  { num: '3.2.3', title: 'Оскорбление расы', full: 'Racial Insult', desc: 'Отправка обидных сообщений в сторону расы человека.', punishment: 'Мьют 5 часов' },
  { num: '3.2.4', title: 'Оскорбление родных', full: 'Family Insult', desc: 'Отправка обидных сообщений в сторону родных человека.', punishment: 'Мьют 1 день' },
  { num: '3.3', title: 'Упоминание родных', full: 'Family Mention', desc: 'Отправка сообщений, упоминающих родных в сторону человека.', punishment: 'Варн → Мьют 10 часов' },
  { num: '3.4', title: '18+ Контент', full: 'Adult Content / Контент для взрослых', desc: 'Отправка контента 18+ или не для слабонервных.', punishment: 'Бан 1–10 дней' },
  { num: '3.5', title: 'Злоупотребление Caps Lock', full: 'Caps Abuse', desc: 'Отправка более 3-ёх сообщений, написанных ВЕРХНИМ РЕГИСТРОМ.', punishment: 'Мьют 1 час' },
  { num: '3.6', title: 'Оффтоп', full: 'Off-topic / Не по теме', desc: 'Отправка сообщений не по теме чата.', punishment: 'Мьют 1 час' },
  { num: '3.7', title: 'Злоупотребление матом', full: 'Profanity Abuse', desc: 'Злоупотребление нецензурной лексикой или ники с матом.', punishment: 'Мьют 1 день' },
  { num: '3.8', title: 'Ссылки', full: 'Links / Линки', desc: 'Отправка ссылок строго запрещена.', punishment: 'Бан 2 дня' },
  { num: '3.9', title: 'Призыв на другой проект', full: 'Raid / Рейд', desc: 'Призыв на другой проект или попытка рейда сервера.', punishment: 'Перманентный бан' },
  { num: '4', title: 'Войс-чат', full: 'от англ. voice chat — голосовой чат', desc: 'Формат общения, при котором люди разговаривают голосом через интернет в реальном времени.' },
  { num: '4.1', title: 'Спам звуковой панелью', full: 'Soundboard Spam', desc: 'Отправка звуков более 3-ёх раз.', punishment: 'Мьют 1 час' },
  { num: '4.2', title: 'Оскорбление', full: 'Voice Insult / Голосовое оскорбление', desc: 'Говорение обидных слов в сторону человека.', punishment: 'Мьют 2 часа' },
  { num: '4.2.1', title: 'Оскорбление личности', full: 'Personal Voice Insult', desc: 'Говорение обидных слов в сторону личности человека.', punishment: 'Мьют 3 часа' },
  { num: '4.2.2', title: 'Оскорбление религии', full: 'Religious Voice Insult', desc: 'Говорение обидных слов в сторону религии человека.', punishment: 'Мьют 4 часа' },
  { num: '4.2.3', title: 'Оскорбление расы', full: 'Racial Voice Insult', desc: 'Говорение обидных слов в сторону расы человека.', punishment: 'Мьют 5 часов' },
  { num: '4.2.4', title: 'Оскорбление родных', full: 'Family Voice Insult', desc: 'Говорение обидных слов в сторону родных человека.', punishment: 'Мьют 1 день' },
  { num: '4.3', title: 'Упоминание родных', full: 'Family Voice Mention', desc: 'Говорение, упоминающее родных в сторону человека.', punishment: 'Варн → Мьют 10 часов' },
  { num: '4.4', title: 'Орание в микрофон', full: 'Mic Screaming', desc: 'Непрерывные громкие звуки либо ор в микрофон.', punishment: 'Мьют 5–10 часов' },
  { num: '4.5', title: 'Музыка', full: 'Music in Voice / Музыка в голосе', desc: 'Включение любой музыки в войс-чат.', punishment: 'Мьют 1 час' },
  { num: '4.6', title: 'Злоупотребление матом', full: 'Voice Profanity Abuse', desc: 'Злоупотребление нецензурной лексикой в голосовом чате.', punishment: 'Мьют 1 день' },
  { num: '4.7', title: 'Призыв на другой проект', full: 'Voice Raid / Голосовой рейд', desc: 'Призыв на другой проект через голосовой чат.', punishment: 'Перманентный бан' },
];

const Index = () => {
  const rulesRef = useRef<HTMLElement>(null);
  const citiesRef = useRef<HTMLElement>(null);
  const discordRulesRef = useRef<HTMLDivElement>(null);

  const scrollToRules = () => {
    rulesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCities = () => {
    citiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToDiscordRules = () => {
    discordRulesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorTrail />
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

        <button
          onClick={scrollToCities}
          className="absolute bottom-8 animate-bounce text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ГОРОДА */}
      <section ref={citiesRef} className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
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
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-3">Интересный факт:</p>
                <p className="text-foreground text-xl font-bold leading-relaxed">
                  Сайт был начат в 2:30, а закончен в 4 часа утра
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
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-3">Интересный факт:</p>
                <p className="text-foreground text-xl font-bold leading-relaxed">
                  Тут ничего нет :)))
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки перехода к правилам */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            onClick={scrollToRules}
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-card px-10 py-4 text-lg font-semibold text-foreground transition-all hover:bg-accent hover:scale-105"
          >
            <Icon name="BookOpen" size={22} />
            Правила нашего проекта
            <Icon name="ChevronDown" size={20} className="transition-transform group-hover:translate-y-1" />
          </button>
          <button
            onClick={scrollToDiscordRules}
            className="group inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-7 py-3 text-base font-semibold text-foreground/80 transition-all hover:bg-accent hover:scale-105"
          >
            <Icon name="MessageCircle" size={18} />
            Правила нашего сервера
            <Icon name="ChevronDown" size={18} className="transition-transform group-hover:translate-y-1" />
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
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Правила</h2>
          <p className="mt-3 text-muted-foreground">Соблюдай правила — и к тебе будут относиться лучше</p>
        </div>

        <div className="mb-4 rounded-2xl border border-border/30 bg-card/20 px-6 py-5">
          <p className="font-display text-2xl font-bold sm:text-3xl"
            style={{ background: 'linear-gradient(90deg, #ffffff 0%, #666 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Разделы 1–2 &nbsp;·&nbsp; РП правила
          </p>
        </div>

        <div className="relative flex flex-col gap-0">
          {RULES.map((rule, idx) => {
            const depth = rule.num.split('.').length - 1;
            const r = rule as typeof RULES[number] & { punishment2?: {label: string; ban: string}[] };
            const isLast = idx === RULES.length - 1;
            const isSection34Start = rule.num === '3';

            return (
              <div key={rule.num}>
              {isSection34Start && (
                <div ref={discordRulesRef} className="my-6 rounded-2xl border border-border/30 bg-card/20 px-6 py-5">
                  <p className="font-display text-2xl font-bold sm:text-3xl"
                    style={{ background: 'linear-gradient(90deg, #ffffff 0%, #666 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Разделы 3–4 &nbsp;·&nbsp; Discord правила
                  </p>
                </div>
              )}
              <div className="group relative flex items-stretch gap-0">

                {/* Левая колонка: кружок + вертикальная линия */}
                <div className="relative flex flex-col items-center" style={{ width: 40, minWidth: 40 }}>
                  {/* Линия сверху */}
                  {idx !== 0 && (
                    <div className="w-px flex-none bg-gradient-to-b from-border/60 to-border/20" style={{ height: '0.75rem' }} />
                  )}
                  {/* Кружок */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card font-mono font-bold text-[9px] text-muted-foreground transition-all duration-200 group-hover:border-white/40 group-hover:text-white group-hover:bg-white/10"
                    style={{ boxShadow: 'none' }}>
                    {rule.num}
                  </div>
                  {/* Линия снизу */}
                  {!isLast && (
                    <div className="w-px flex-1 bg-gradient-to-b from-border/20 to-border/60 min-h-[0.75rem]" />
                  )}
                </div>

                {/* Горизонтальный коннектор */}
                <div className="flex items-center" style={{ width: 16, minWidth: 16 }}>
                  <div className="h-px w-full bg-gradient-to-r from-border/40 to-transparent group-hover:from-white/20 transition-colors duration-200" />
                </div>

                {/* Карточка */}
                <div
                  className="flex-1 my-1 rounded-2xl border border-border/20 bg-card/30 p-4 transition-all duration-200 group-hover:bg-white/[0.06] group-hover:border-white/20 group-hover:shadow-[0_0_20px_-8px_rgba(255,255,255,0.15)]"
                  style={{ marginLeft: `${depth * 10}px` }}
                >
                  <div className="flex flex-wrap items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug"
                        style={{ background: 'linear-gradient(90deg, #ffffff 0%, #a0a0a0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {rule.title}
                        <span className="ml-1.5 font-normal text-xs"
                          style={{ background: 'linear-gradient(90deg, #777 0%, #444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          — {rule.full}
                        </span>
                      </p>
                      <p className="mt-1 text-xs leading-relaxed"
                        style={{ background: 'linear-gradient(90deg, #888 0%, #555 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {rule.desc}
                      </p>

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
        {/* Человечек из Brick Rigs машет рукой */}
        <div className="flex justify-center mb-6">
          <svg
            width="72"
            height="100"
            viewBox="0 0 72 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="brick-guy"
          >
            <style>{`
              @keyframes wave {
                0%, 100% { transform-origin: 60px 38px; transform: rotate(0deg); }
                25% { transform-origin: 60px 38px; transform: rotate(-35deg); }
                75% { transform-origin: 60px 38px; transform: rotate(10deg); }
              }
              @keyframes body-sway {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(2px); }
              }
              .brick-guy { animation: body-sway 1.2s ease-in-out infinite; }
              .waving-arm { animation: wave 1.2s ease-in-out infinite; }
            `}</style>

            {/* Голова — квадратная как в Brick Rigs */}
            <rect x="22" y="2" width="28" height="28" rx="4" stroke="white" strokeWidth="2.2" />
            {/* Глаза */}
            <rect x="28" y="10" width="5" height="5" rx="1" stroke="white" strokeWidth="1.8" />
            <rect x="39" y="10" width="5" height="5" rx="1" stroke="white" strokeWidth="1.8" />
            {/* Рот */}
            <path d="M30 22 Q36 27 42 22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

            {/* Тело */}
            <rect x="20" y="32" width="32" height="30" rx="4" stroke="white" strokeWidth="2.2" />

            {/* Левая рука (статичная) */}
            <line x1="20" y1="38" x2="6" y2="52" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="2" y="50" width="8" height="8" rx="2" stroke="white" strokeWidth="2" />

            {/* Правая рука (машет) */}
            <g className="waving-arm">
              <line x1="52" y1="38" x2="65" y2="26" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <rect x="62" y="18" width="8" height="8" rx="2" stroke="white" strokeWidth="2" />
            </g>

            {/* Левая нога */}
            <line x1="28" y1="62" x2="24" y2="82" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="18" y="80" width="12" height="8" rx="2" stroke="white" strokeWidth="2" />

            {/* Правая нога */}
            <line x1="44" y1="62" x2="48" y2="82" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="42" y="80" width="12" height="8" rx="2" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        Нижегородская / Московская области РП · Brick Rigs
      </footer>
    </div>
  );
};

export default Index;