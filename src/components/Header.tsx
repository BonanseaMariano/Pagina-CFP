import React, { useState } from 'react';
import { CfpLogo } from './CfpLogo';
import { NavigationTab } from '../types';
import { MapPin, Menu, X } from 'lucide-react';
import { CFP_SOCIAL_LINKS, FacebookIcon, InstagramIcon } from './SocialLinks';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenContact: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'cursos', label: 'Cursos y Talleres' },
    { id: 'requisitos', label: 'Requisitos de Ingreso' },
    { id: 'faq', label: 'Preguntas Frecuentes' },
    { id: 'institucional', label: 'Institucional' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md transition-all shadow-[0_1px_3px_rgba(15,45,89,0.04)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity matching Image 2 */}
        <div
          onClick={() => onSelectTab('cursos')}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-95"
        >
          <CfpLogo size={48} className="drop-shadow-xs" />
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#0F2D59]">
              CFP Nº 651
            </span>
            <span className="text-xs font-medium text-[#44474F]">
              Puerto Madryn <span className="text-[#B71322]">•</span> Cursos Gratuitos y Oficiales
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation items matching Image 2 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0F2D59] text-white shadow-xs'
                    : 'text-[#44474F] hover:bg-[#F2F4F7] hover:text-[#0F2D59]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Contacto y Sede + Redes + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Social Links on Desktop */}
          <div className="hidden lg:flex items-center gap-1 border-r border-[#E2E8F0] pr-2 mr-1">
            <a
              href={CFP_SOCIAL_LINKS.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook del CFP 651"
              aria-label="Facebook del CFP 651"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:text-[#1877F2] hover:bg-slate-100 transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={CFP_SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram del CFP 651"
              aria-label="Instagram del CFP 651"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:text-[#E4405F] hover:bg-slate-100 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Contacto y Sede button matching Image 2 style */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#ECEEF1] px-4 py-2 text-sm font-semibold text-[#191C1E] hover:bg-[#E0E3E6] transition-colors border border-transparent hover:border-[#CBD5E1]"
          >
            <MapPin className="h-4 w-4 text-[#0F2D59]" />
            <span>Contacto y Sede</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#191C1E] hover:bg-[#F2F4F7] md:hidden"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E2E8F0] bg-white px-4 py-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#0F2D59] text-white'
                      : 'text-[#44474F] hover:bg-[#F2F4F7]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="mt-2 flex items-center gap-2 rounded-lg bg-[#ECEEF1] px-4 py-2.5 text-sm font-semibold text-[#191C1E]"
            >
              <MapPin className="h-4 w-4 text-[#0F2D59]" />
              <span>Contacto y Sede</span>
            </button>

            {/* Mobile Social Links */}
            <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500">Redes Sociales:</span>
              <div className="flex items-center gap-2">
                <a
                  href={CFP_SOCIAL_LINKS.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#1877F2] hover:bg-slate-200 transition-colors"
                >
                  <FacebookIcon className="h-3.5 w-3.5" />
                  <span>Facebook</span>
                </a>
                <a
                  href={CFP_SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#E4405F] hover:bg-slate-200 transition-colors"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
