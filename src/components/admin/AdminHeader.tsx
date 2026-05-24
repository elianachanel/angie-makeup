"use client";

type Props = {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
};

export function AdminHeader({ title, subtitle, onMenuClick }: Props) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <p className="section-label mb-1">Panel</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#f7efe8] sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-[#a89a9e]">{subtitle}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onMenuClick}
        className="glass-panel rounded-xl px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-[#e8b4bc] lg:hidden"
        aria-label="Abrir menú"
      >
        Menú
      </button>
    </header>
  );
}
