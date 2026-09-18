import React from 'react';
import { CfpLogo } from './CfpLogo';
import { CFP_FACADE_IMAGE } from '../data/cfpFacadeImage';
import { Building2, Award, Users, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CFP_SOCIAL_LINKS, FacebookIcon, InstagramIcon } from './SocialLinks';

export const InstitutionalView: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-6">
        <div className="flex items-center gap-4 mb-4">
          <CfpLogo size={64} />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008CA8]">
              Institucional
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2D59]">
              Centro de Formación Profesional Nº 651
            </h1>
            <p className="text-xs sm:text-sm text-[#44474F]">
              Puerto Madryn, Provincia del Chubut • República Argentina
            </p>
          </div>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0F2D59]">
            Compromiso con el Trabajo, la Industria y la Comunidad
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#44474F]">
            El Centro de Formación Profesional Nº 651 constituye uno de los pilares de la educación
            técnica no formal en Puerto Madryn. Nuestra misión fundamental es brindar herramientas
            técnicas, prácticas y humanas a jóvenes y adultos para facilitar su inserción laboral de
            calidad en los sectores productivos estratégicos de la región.
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#44474F]">
            Con más de tres décadas de trayectoria, el CFP 651 capacita operarios calificados en
            articulación directa con el Parque Industrial, las empresas del sector pesquero,
            metalmecánico, portuario, gastronómico y la administración de servicios.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#CBD5E1] bg-white shadow-xs">
          <img
            src={CFP_FACADE_IMAGE}
            alt="Fachada del CFP 651 en Sede Rosales 695"
            referrerPolicy="no-referrer"
            className="h-64 w-full object-cover"
          />
          <div className="p-4 bg-[#F7F9FC]">
            <p className="text-xs font-semibold text-[#0F2D59]">
              Sede Central Rosales 695 • Puerto Madryn
            </p>
            <p className="text-[11px] text-[#747780]">
              Centro de Formación Profesional Nº 651 • Cursos y talleres formativos.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Pillars */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF0F7] text-[#0F2D59] mb-4">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-[#0F2D59]">Certificación Homologada</h3>
          <p className="mt-2 text-xs text-[#44474F] leading-relaxed">
            Planes de estudio avalados por el Ministerio de Educación del Chubut y registrados a nivel
            nacional.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F4F7] text-[#008CA8] mb-4">
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-[#0F2D59]">Formación práctica orientada al empleo</h3>
          <p className="mt-2 text-xs text-[#44474F] leading-relaxed">
            Propuestas formativas diseñadas con fuerte carga horaria práctica y resolución de situaciones laborales reales, pensadas para desarrollar las habilidades técnicas que demandan los diferentes sectores socioproductivos.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFDAD7] text-[#B71322] mb-4">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-[#0F2D59]">Gratuidad</h3>
          <p className="mt-2 text-xs text-[#44474F] leading-relaxed">
            Educación pública de calidad orientada a la igualdad de oportunidades y al desarrollo
            humano comarcal.
          </p>
        </div>
      </div>

      {/* Authorities & Regulation */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7F9FC] p-6 sm:p-8">
        <h3 className="font-heading text-lg font-bold text-[#0F2D59] mb-3">
          Marco Institucional y Autoridades
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-[#44474F]">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#008CA8]" />
            <span><strong>Dependencia:</strong> Dirección General de Educación Técnica y Formación Profesional</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#008CA8]" />
            <span><strong>Jurisdicción:</strong> Ministerio de Educación de la Provincia del Chubut</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#008CA8]" />
            <span><strong>Región Educativa:</strong> Región II - Puerto Madryn</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#008CA8]" />
            <span><strong>Sede Central:</strong> Rosales 695, Puerto Madryn, Chubut</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#008CA8]" />
            <span><strong>Anexo Barrio Roca:</strong> Comodoro Martín Rivadavia 750, Puerto Madryn, Chubut</span>
          </li>
        </ul>
      </div>

      {/* Official Social Media Channels */}
      <div className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008CA8]">
              Canales Digitales
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F2D59]">
              Redes Sociales del CFP Nº 651
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#44474F] leading-relaxed max-w-xl">
              Mantenete informado sobre convocatorias de cursos, novedades institucionales y fechas clave del ciclo lectivo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CFP_SOCIAL_LINKS.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#1565C0] active:scale-98 transition-all"
            >
              <FacebookIcon className="h-5 w-5" />
              <span>Facebook</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
            <a
              href={CFP_SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:opacity-95 active:scale-98 transition-all"
            >
              <InstagramIcon className="h-5 w-5" />
              <span>Instagram</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
