import React from 'react';
import { Search } from 'lucide-react';

interface HeroBannerProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedTurno: string;
  onSelectTurno: (turno: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedTurno,
  onSelectTurno,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-gradient-to-b from-white via-[#F7F9FC] to-[#F4F6F9] pt-8 pb-10 sm:pt-12 sm:pb-14">
      {/* Subtle patagonian nautical background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#008CA8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-[#0F2D59]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Institutional Pill Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-[#0F2D59]">
            <span className="h-2 w-2 rounded-full bg-[#008CA8]" />
            <span>Ciclo Lectivo {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F2D59] leading-tight">
            Oferta Formativa <br />
            <span className="text-[#008CA8]">Centro de Formación Profesional Nº 651</span>
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-[#44474F] leading-relaxed">
            Capacitate en oficios técnicos e industriales con salida laboral inmediata en Puerto Madryn.
            Adquirí herramientas prácticas y competencias profesionales para impulsar tu futuro en el mundo del trabajo.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#747780]" />
            <input
              type="text"
              placeholder="Buscar curso, rubro o especialidad..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1E293B] shadow-2xs outline-none transition-all placeholder:text-[#747780] focus:border-[#008CA8] focus:ring-2 focus:ring-[#008CA8]/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Turno selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#44474F] whitespace-nowrap">
              Turno:
            </span>
            <div className="flex rounded-lg border border-[#CBD5E1] bg-white p-0.5 shadow-2xs">
              {['Todos', 'Mañana', 'Tarde', 'Vespertino'].map((t) => (
                <button
                  key={t}
                  onClick={() => onSelectTurno(t)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                    selectedTurno === t
                      ? 'bg-[#0F2D59] text-white shadow-2xs'
                      : 'text-[#44474F] hover:bg-[#F2F4F7]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[#44474F] mr-1">Áreas:</span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#008CA8] text-white shadow-xs'
                    : 'bg-white text-[#44474F] border border-[#CBD5E1] hover:border-[#008CA8] hover:text-[#008CA8]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
