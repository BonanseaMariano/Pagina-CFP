import React from 'react';
import { X, MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';
import { CfpLogo } from './CfpLogo';
import { CFP_SOCIAL_LINKS, FacebookIcon, InstagramIcon } from './SocialLinks';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=CFP+651+Rosales+695+Puerto+Madryn+Chubut';
  const anexoMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Comodoro+Mart%C3%ADn+Rivadavia+750,+U9120+Puerto+Madryn,+Chubut';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#00183b]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F7F9FC] px-6 py-4">
          <div className="flex items-center gap-3">
            <CfpLogo size={40} />
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#0F2D59]">
                Contacto y Sedes Formativas
              </h2>
              <p className="text-xs text-[#44474F]">Centro de Formación Profesional Nº 651</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Map Preview / Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sede Central Rosales 695 */}
            <div className="overflow-hidden rounded-2xl border border-[#CBD5E1] bg-slate-900 shadow-xs relative">
              <div className="h-52 w-full relative overflow-hidden flex items-center justify-center">
                <img
                  src="/puerto-madryn-map.png"
                  alt="Plano de calles de Puerto Madryn - Ubicación Sede Central Rosales 695"
                  className="absolute inset-0 h-full w-full object-cover object-center filter blur-[1.5px] scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-slate-900/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/25" />

                <div className="relative z-10 mx-3 flex flex-col items-center justify-center rounded-xl bg-white/95 px-4 py-3.5 text-center shadow-lg backdrop-blur-md border border-white/80 w-[92%] max-w-[280px]">
                  <div className="relative mb-1.5 flex items-center justify-center">
                    <span className="absolute h-7 w-7 rounded-full bg-[#B71322]/25 animate-ping" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#B71322] text-white shadow-md">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </div>
                  <span className="inline-block rounded-full bg-[#0F2D59]/10 px-2 py-0.5 text-[10px] font-bold text-[#0F2D59] mb-1">
                    Sede Central
                  </span>
                  <span className="font-heading font-bold text-sm text-[#0F2D59] leading-tight">
                    Rosales 695
                  </span>
                  <span className="text-[11px] text-[#44474F] mt-0.5">
                    (esq. Domecq García) • Puerto Madryn
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[#0F2D59] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#00183b] transition-all active:scale-95 cursor-pointer"
                  >
                    <Navigation className="h-3 w-3" />
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Anexo Barrio Roca */}
            <div className="overflow-hidden rounded-2xl border border-[#CBD5E1] bg-slate-900 shadow-xs relative">
              <div className="h-52 w-full relative overflow-hidden flex items-center justify-center">
                <img
                  src="/puerto-madryn-map.png"
                  alt="Plano de calles de Puerto Madryn - Ubicación Anexo Barrio Roca"
                  className="absolute inset-0 h-full w-full object-cover object-bottom filter blur-[1.5px] scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-slate-900/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/25" />

                <div className="relative z-10 mx-3 flex flex-col items-center justify-center rounded-xl bg-white/95 px-4 py-3.5 text-center shadow-lg backdrop-blur-md border border-white/80 w-[92%] max-w-[280px]">
                  <div className="relative mb-1.5 flex items-center justify-center">
                    <span className="absolute h-7 w-7 rounded-full bg-[#008CA8]/25 animate-ping" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#008CA8] text-white shadow-md">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </div>
                  <span className="inline-block rounded-full bg-[#008CA8]/10 px-2 py-0.5 text-[10px] font-bold text-[#008CA8] mb-1">
                    Anexo B° Roca
                  </span>
                  <span className="font-heading font-bold text-sm text-[#0F2D59] leading-tight">
                    Comodoro Martín Rivadavia 750
                  </span>
                  <span className="text-[11px] text-[#44474F] mt-0.5">
                    U9120 Puerto Madryn, Chubut
                  </span>
                  <a
                    href={anexoMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[#008CA8] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#007086] transition-all active:scale-95 cursor-pointer"
                  >
                    <Navigation className="h-3 w-3" />
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3 text-[#0F2D59] mb-1">
                <MapPin className="h-4 w-4 text-[#B71322]" />
                <h4 className="font-heading text-sm font-bold">Direcciones y Sedes</h4>
              </div>
              <p className="text-xs text-[#44474F] mt-1 font-medium leading-relaxed">
                <span className="font-bold text-[#0F2D59]">Sede Central:</span> Rosales 695 (esq. Domecq García)<br />
                <span className="font-bold text-[#0F2D59]">Anexo B° Roca:</span> Comodoro Martín Rivadavia 750
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3 text-[#0F2D59] mb-1">
                <Clock className="h-4 w-4 text-[#008CA8]" />
                <h4 className="font-heading text-sm font-bold">Horarios de Secretaría</h4>
              </div>
              <p className="text-xs text-[#44474F] mt-1 font-medium leading-relaxed">
                Lunes a Viernes 08:30 a 20:45 hs
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3 text-[#0F2D59] mb-1">
                <Phone className="h-4 w-4 text-emerald-600" />
                <h4 className="font-heading text-sm font-bold">Teléfono / WhatsApp</h4>
              </div>
              <p className="text-xs text-[#44474F] mt-1 font-medium">
                (0280) 445-0651 / 447-1234
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3 text-[#0F2D59] mb-1">
                <Mail className="h-4 w-4 text-[#0F2D59]" />
                <h4 className="font-heading text-sm font-bold">Correo Institucional</h4>
              </div>
              <p className="text-xs text-[#44474F] mt-1 font-medium truncate">
                cfp651madryn@chubut.edu.ar
              </p>
            </div>
          </div>

          {/* Social Networks Section */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-r from-[#F7F9FC] to-white p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#0F2D59]">
                  Redes Sociales
                </h4>
                <p className="text-xs text-[#44474F] mt-0.5">
                  Seguí las novedades y aperturas de talleres.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CFP_SOCIAL_LINKS.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir Facebook del CFP 651"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1877F2] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1565C0] active:scale-95 transition-all"
                >
                  <FacebookIcon className="h-4 w-4" />
                  <span>Facebook</span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>
                <a
                  href={CFP_SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir Instagram del CFP 651"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 active:scale-95 transition-all"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Instagram</span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] p-4 text-xs text-[#44474F] leading-relaxed">
            <span className="font-bold text-[#0F2D59]">Recepción de inscripciones:</span> Las
            inscripciones para todos los cursos del Ciclo Lectivo {new Date().getFullYear()} se realizan personalmente en
            Sede correspondiente con la documentación completa en los turnos indicados.
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2E8F0] bg-[#F7F9FC] px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#0F2D59] px-5 py-2 text-xs sm:text-sm font-bold text-white hover:bg-[#00183b]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
