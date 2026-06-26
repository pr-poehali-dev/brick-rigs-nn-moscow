import Icon from '@/components/ui/icon';

const NN_IMG = 'https://cdn.poehali.dev/projects/880e65a8-0481-459a-aad5-111eba817912/files/8befb2d5-ba3d-4e44-88ae-e2e0d04661d8.jpg';
const MSK_IMG = 'https://cdn.poehali.dev/projects/880e65a8-0481-459a-aad5-111eba817912/files/1d5da627-7d6b-4703-90ff-3a1c67ad0357.jpg';
const DISCORD = 'https://discord.gg/4TkbDG3a2b';

const Index = () => {
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
          {[
            { img: NN_IMG, title: 'Нижний Новгород', desc: 'Город на слиянии Оки и Волги. Кремль, набережные и атмосфера старого центра в нашем РП.' },
            { img: MSK_IMG, title: 'Москва', desc: 'Столица в огнях. Небоскрёбы Москва-Сити и исторический центр для ваших ролевых историй.' },
          ].map((c) => (
            <div key={c.title} className="group overflow-hidden rounded-[2rem] border border-border bg-card transition-transform hover:scale-[1.02]">
              <div className="relative h-64 overflow-hidden">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="font-display mb-3 text-2xl font-bold">{c.title}</h3>
                <p className="text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
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
