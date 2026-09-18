import React from 'react';
import { CfpLogo } from './CfpLogo';
import { NavigationTab } from '../types';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { CFP_SOCIAL_LINKS, FacebookIcon, InstagramIcon } from './SocialLinks';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenContact }) => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#00183b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CfpLogo size={48} className="bg-white rounded-full p-0.5" />
              <div>
                <span className="font-heading text-lg font-bold tracking-tight text-white">
                  CFP Nº 651 Puerto Madryn
                </span>
                <p className="text-xs text-[#ADC7FC]">
                  Centro de Formación Profesional • Cursos Gratuitos y Oficiales
                </p>
              </div>
            </div>
            <p className="text-xs text-[#ADC7FC]/80 leading-relaxed max-w-md">
              Institución pública dependiente del Ministerio de Educación de la Provincia del Chubut.
              Formamos profesionales capacitados en oficios técnicos y de servicios para impulsar el
              desarrollo productivo sustentable de Puerto Madryn y la región patagónica.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#ADC7FC]">
              <ShieldCheck className="h-4 w-4 text-[#6ED4F2]" />
              <span>Certificación Oficial Ministerio de Educación</span>
            </div>

            {/* Redes Sociales */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6ED4F2] mb-2">
                Redes Sociales
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={CFP_SOCIAL_LINKS.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook del CFP 651 (abre en nueva pestaña)"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1877F2] transition-colors shadow-2xs"
                >
                  <FacebookIcon className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href={CFP_SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram del CFP 651 (abre en nueva pestaña)"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all shadow-2xs"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#6ED4F2]">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs text-[#ADC7FC]">
              <li>
                <button
                  onClick={() => onSelectTab('cursos')}
                  className="hover:text-white transition-colors"
                >
                  Catálogo de Cursos y Talleres
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('requisitos')}
                  className="hover:text-white transition-colors"
                >
                  Requisitos de Ingreso
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('faq')}
                  className="hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('institucional')}
                  className="hover:text-white transition-colors"
                >
                  Institucional y Autoridades
                </button>
              </li>
            </ul>
          </div>

          {/* Sede & Contact info */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#6ED4F2]">
              Sedes Formativas
            </h4>
            <ul className="space-y-2 text-xs text-[#ADC7FC]">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#FFDAD7] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p><span className="text-white font-medium">Sede Central:</span> Rosales 695</p>
                  <p><span className="text-white font-medium">Anexo B° Roca:</span> Comodoro Rivadavia 750</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#ADC7FC] shrink-0" />
                <span>(0280) 445-0651 / 447-1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#ADC7FC] shrink-0" />
                <span>cfp651madryn@chubut.edu.ar</span>
              </li>
            </ul>

            <button
              onClick={onOpenContact}
              className="mt-2 inline-flex items-center rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
            >
              Ver mapa y horarios
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#ADC7FC]/70">
          <p>© {new Date().getFullYear()} Centro de Formación Profesional Nº 651. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span>Puerto Madryn, Chubut</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
