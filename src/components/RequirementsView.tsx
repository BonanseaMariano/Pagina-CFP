import React from 'react';
import { CheckCircle2, UserCheck } from 'lucide-react';

interface RequirementsViewProps {
  onOpenContact: () => void;
  onGoToCourses: () => void;
}

export const RequirementsView: React.FC<RequirementsViewProps> = ({ onOpenContact, onGoToCourses }) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2D59]">
          Requisitos de Ingreso y Matriculación
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#44474F] max-w-3xl">
          El Centro de Formación Profesional N° 651 es una institución pública y gratuita. Toda
          postulación requiere la entrega presencial de la documentación en la Sede
          Central para la validación de vacante.
        </p>
      </div>

      {/* 3 Steps Process */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2D59] text-white font-heading font-bold text-lg mb-4">
            1
          </div>
          <h3 className="font-heading text-lg font-bold text-[#0F2D59]">Elegir el Curso</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#44474F] leading-relaxed">
            Revisá la oferta formativa disponible, horarios de cursada y requerimientos específicos de
            cada curso.
          </p>
          <button
            onClick={onGoToCourses}
            className="mt-4 text-xs font-bold text-[#008CA8] hover:underline inline-flex items-center gap-1"
          >
            Ver catálogo de cursos →
          </button>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008CA8] text-white font-heading font-bold text-lg mb-4">
            2
          </div>
          <h3 className="font-heading text-lg font-bold text-[#0F2D59]">Reunir Documentación</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#44474F] leading-relaxed">
            Prepará fotocopia de DNI, certificado de estudios previos, 1 foto carnet 4x4 y el resto de documentacion solicitada por el curso de tu interes.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B71322] text-white font-heading font-bold text-lg mb-4">
            3
          </div>
          <h3 className="font-heading text-lg font-bold text-[#0F2D59]">Presentación en Sede</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#44474F] leading-relaxed">
            Acercate a Secretaría Académica en Rosales 695 en las fechas y horarios de atención
            establecidos donde podras informarte más sobre el curso y presentar la documentación para tu inscripción.
          </p>
        </div>
      </div>

      {/* Requisitos Generales de Ingreso */}
      <div className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-2xs">
        <div>
          <div className="flex items-center gap-3 text-[#0F2D59] mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F4F7] text-[#008CA8]">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#008CA8]">
                Cursada
              </span>
              <h2 className="font-heading text-lg sm:text-xl font-bold">
                Requisitos Generales
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#44474F] leading-relaxed mb-4">
            Condiciones académicas y de edad necesarias para completar los cursos:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-3.5">
              <CheckCircle2 className="h-5 w-5 text-[#008CA8] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-[#0F2D59]">
                  Edad Mínima: 18 Años Cumplidos
                </h4>
                <p className="text-xs text-[#44474F] mt-0.5">
                  Al momento de comenzar el ciclo lectivo. Jóvenes de 16 y 17 años únicamente con autorización tutelar expresa y constancia de escolaridad en curso.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-3.5">
              <CheckCircle2 className="h-5 w-5 text-[#008CA8] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-[#0F2D59]">
                  Nivel Educativo Previo
                </h4>
                <p className="text-xs text-[#44474F] mt-0.5">
                  Estudios primarios o secundarios completos segun el cursos; y módulo correlativo aprobado para especialidades técnicas avanzadas si aplica*.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-3.5">
              <CheckCircle2 className="h-5 w-5 text-[#008CA8] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-[#0F2D59]">
                  Compromiso de Asistencia y Prácticas
                </h4>
                <p className="text-xs text-[#44474F] mt-0.5">
                  Cumplimiento del 85% de asistencia presencial a los talleres y cumplimiento del reglamento académico.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-3.5">
              <CheckCircle2 className="h-5 w-5 text-[#008CA8] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-[#0F2D59]">
                  Instancias Evaluativas y Prácticas
                </h4>
                <p className="text-xs text-[#44474F] mt-0.5">
                  Aprobación de las instancias evaluativas y trabajos prácticos con una calificación mínima de 7 (siete) o más para la acreditación y certificación.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
          * Cada curso o especialidad en el catálogo detalla si exige algún requisito técnico correlativo previo.
        </div>
      </div>

      {/* Venue and Office Hours Card */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7F9FC] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading text-lg font-bold text-[#0F2D59]">
            ¿Tenés dudas?
          </h3>
          <p className="text-xs sm:text-sm text-[#44474F] mt-1">
            Secretaría Académica atiende en Sede Central Rosales 695, Puerto Madryn.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="shrink-0 rounded-xl bg-[#0F2D59] px-6 py-3 text-sm font-bold text-white hover:bg-[#00183b] transition-colors shadow-xs"
        >
          Ver Horarios y Mapa de Sede
        </button>
      </div>
    </div>
  );
};
