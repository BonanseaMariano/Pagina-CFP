import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { CFP_FACADE_IMAGE } from '../data/cfpFacadeImage';
import {
  X,
  Laptop,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Clock,
  FolderCheck,
  BookOpen,
  MapPin,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Building,
  FileText,
} from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenContact: () => void;
}

const TABS: { id: 'plan' | 'requisitos' | 'documentacion' | 'horarios'; label: string; icon: React.ElementType }[] = [
  { id: 'plan', label: 'Plan de Estudio', icon: BookOpen },
  { id: 'requisitos', label: 'Requisitos', icon: CheckCircle2 },
  { id: 'documentacion', label: 'Documentación', icon: FolderCheck },
  { id: 'horarios', label: 'Días, Horarios y Sede', icon: Clock },
];

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'requisitos' | 'documentacion' | 'horarios'>('plan');
  const [copied, setCopied] = useState(false);

  // Touch swipe state for cycling between tabs
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const currentTabIndex = Math.max(0, TABS.findIndex((t) => t.id === activeTab));
  const CurrentIcon = TABS[currentTabIndex].icon;

  const handlePrevTab = () => {
    const prevIndex = (currentTabIndex - 1 + TABS.length) % TABS.length;
    setActiveTab(TABS[prevIndex].id);
  };

  const handleNextTab = () => {
    const nextIndex = (currentTabIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Trigger only if horizontal swipe exceeds 45px and is predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNextTab();
      } else {
        handlePrevTab();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  useEffect(() => {
    // Reset tab to plan de estudio when course changes
    setActiveTab('plan');
    // Lock background scroll when modal is open
    if (course) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [course]);

  if (!course) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${course.titulo} - CFP N° 651`,
        text: `Consultá el curso gratuito de ${course.titulo} en el CFP N° 651 Puerto Madryn.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#00183b]/60 backdrop-blur-xs p-2.5 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-200 flex justify-center items-start"
    >
      <div className="relative my-4 sm:my-6 w-full max-w-6xl rounded-2xl bg-white shadow-2xl border border-[#E2E8F0] overflow-hidden">
        {/* Header with Badges and Close Button */}
        <div className="border-b border-[#E2E8F0] bg-[#F7F9FC] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Top Badges Row matching Image 2 */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#008CA8]/30 bg-[#E6F4F7] px-3 py-1 text-xs font-semibold text-[#008CA8]">
                <Laptop className="h-3.5 w-3.5" />
                <span>{course.categoria}</span>
              </div>

              {/* Enrollment Status Badge */}
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  course.estado === 'Inscripciones Abiertas'
                    ? 'bg-[#DEF7EC] text-[#03543F]'
                    : course.estado === 'Cupos Limitados'
                    ? 'bg-[#FDF2E9] text-[#C8232C]'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    course.estado === 'Inscripciones Abiertas'
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-[#C8232C]'
                  }`}
                />
                <span>
                  {course.estado} • {course.ciclo}
                </span>
              </div>

              {/* Official Chubut Ministry Seal Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF0F7] px-3 py-1 text-xs font-semibold text-[#0F2D59]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0F2D59]" />
                <span className="hidden sm:inline">{course.certificacion}</span>
                <span className="sm:hidden">Certificación Oficial Chubut</span>
              </div>
            </div>

            {/* Action Buttons & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                title="Compartir enlace del curso"
                className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-[#0F2D59] transition-colors"
                aria-label="Compartir"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={handlePrint}
                title="Imprimir ficha del curso"
                className="hidden sm:inline-flex rounded-lg p-2 text-slate-500 hover:bg-white hover:text-[#0F2D59] transition-colors"
                aria-label="Imprimir ficha"
              >
                <Printer className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-[#B71322] transition-colors ml-1"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {copied && (
            <div className="mt-2 text-right text-xs font-medium text-emerald-600 animate-in fade-in">
              ✓ ¡Enlace copiado al portapapeles!
            </div>
          )}

          {/* Course Main Title & Subtitle */}
          <div className="mt-3 sm:mt-4">
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#0F2D59]">
              {course.titulo}
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#44474F]">
              {course.categoria} <span className="text-[#747780]">•</span> {course.gratuito}
            </p>
            {course.descripcion && (
              <p className="mt-2.5 text-xs sm:text-sm text-[#334155] leading-relaxed max-w-4xl">
                {course.descripcion}
              </p>
            )}
          </div>

          {/* Tabs Bar & Consultar Vacante */}
          <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-between gap-3 border-t border-[#E2E8F0] pt-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
              <button
                onClick={() => setActiveTab('plan')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'plan'
                    ? 'bg-[#0F2D59] text-white shadow-xs'
                    : 'text-[#44474F] hover:bg-white hover:text-[#0F2D59]'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Plan de Estudio</span>
              </button>

              <button
                onClick={() => setActiveTab('requisitos')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'requisitos'
                    ? 'bg-[#0F2D59] text-white shadow-xs'
                    : 'text-[#44474F] hover:bg-white hover:text-[#0F2D59]'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Requisitos</span>
              </button>

              <button
                onClick={() => setActiveTab('documentacion')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'documentacion'
                    ? 'bg-[#0F2D59] text-white shadow-xs'
                    : 'text-[#44474F] hover:bg-white hover:text-[#0F2D59]'
                }`}
              >
                <FolderCheck className="h-4 w-4" />
                <span>Documentación</span>
              </button>

              <button
                onClick={() => setActiveTab('horarios')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'horarios'
                    ? 'bg-[#0F2D59] text-white shadow-xs'
                    : 'text-[#44474F] hover:bg-white hover:text-[#0F2D59]'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Días, Horarios y Sede</span>
              </button>
            </div>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8232C] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#A61A22] transition-colors active:scale-98 lg:ml-auto"
            >
              <MapPin className="h-4 w-4" />
              <span>Consultar Vacante</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
            {/* Dynamic Tab Content (Left column on desktop, order-2 on mobile) */}
            <div
              className="lg:col-span-7 flex flex-col gap-5 order-2 lg:order-1 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Active Tab Header with Navigation Arrows & Swipe Controls */}
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handlePrevTab}
                    aria-label={`Ver anterior: ${TABS[(currentTabIndex - 1 + TABS.length) % TABS.length].label}`}
                    title={`Anterior: ${TABS[(currentTabIndex - 1 + TABS.length) % TABS.length].label}`}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F2D59] hover:bg-[#008CA8] hover:text-white hover:border-[#008CA8] active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex flex-col items-center text-center min-w-0 px-2">
                    <div className="flex items-center justify-center gap-2 text-[#0F2D59]">
                      <CurrentIcon className="h-5 w-5 text-[#008CA8] shrink-0" />
                      <h2 className="font-heading text-sm sm:text-base lg:text-lg font-bold truncate">
                        {TABS[currentTabIndex].label}
                      </h2>
                    </div>

                    {/* Interactive dots for direct selection & swipe visual cues */}
                    <div className="flex items-center gap-2 mt-1.5">
                      {TABS.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          aria-label={`Ir a ${tab.label}`}
                          className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                            activeTab === tab.id
                              ? 'w-6 bg-[#008CA8]'
                              : 'w-2 bg-[#CBD5E1] hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 lg:hidden mt-1 font-medium">
                      Tocá las flechas o deslizá hacia los lados
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextTab}
                    aria-label={`Ver siguiente: ${TABS[(currentTabIndex + 1) % TABS.length].label}`}
                    title={`Siguiente: ${TABS[(currentTabIndex + 1) % TABS.length].label}`}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F2D59] hover:bg-[#008CA8] hover:text-white hover:border-[#008CA8] active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {activeTab === 'plan' && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-3">
                    {course.planEstudio && course.planEstudio.length > 0 ? (
                      course.planEstudio.map((mod) => (
                        <div
                          key={mod.numero}
                          className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 sm:p-4 transition-all hover:border-[#008CA8]/50"
                        >
                          <h4 className="font-heading text-sm sm:text-base font-bold text-[#0F2D59]">
                            {mod.nombre}
                          </h4>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F7F9FC] p-6 text-center text-[#44474F]">
                        <p className="text-sm">
                          El programa detallado y contenidos curriculares están disponibles para consulta directa en Sede Rosales 695.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Certificación al finalizar (culminación del curso) */}
                  {course.certificacion && (
                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-4 shadow-2xs">
                      <div className="flex items-center gap-2 text-[#0F2D59] mb-1">
                        <ShieldCheck className="h-4 w-4 text-[#008CA8]" />
                        <h3 className="font-heading text-sm font-bold">
                          Certificación Otorgada al Finalizar
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#44474F] leading-relaxed">
                        {course.certificacion}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'requisitos' && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-2.5">
                    {course.requisitos && course.requisitos.length > 0 ? (
                      course.requisitos.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6F4F7] text-[#008CA8]">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#1E293B]">{req}</span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F7F9FC] p-5 text-center text-[#44474F] text-xs sm:text-sm">
                        Sin requisitos previos específicos indicados para este curso.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'documentacion' && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-2.5">
                    {course.documentacion && course.documentacion.length > 0 ? (
                      course.documentacion.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0F2D59]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#1E293B]">{doc}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0F2D59]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#1E293B]">Fotocopia de DNI (anverso y reverso)</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0F2D59]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#1E293B]">Certificado de escolaridad primaria o secundaria según corresponda</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0F2D59]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#1E293B]">1 Foto carnet 4x4 para legajo estudiantil</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Aclaración Importante:</span> La entrega de la documentación debe realizarse de forma presencial en la sede de cursada para confirmar la vacante definitiva.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'horarios' && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#44474F]">
                    Información de cursada presencial conforme al régimen académico del Ministerio
                    de Educación del Chubut.
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-4">
                      <span className="text-xs font-semibold text-[#008CA8] uppercase tracking-wider">
                        Días y Franja Horaria
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#0F2D59]">
                        {course.horariosTurno}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-4">
                      <span className="text-xs font-semibold text-[#008CA8] uppercase tracking-wider">
                        Carga Horaria Total
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#0F2D59]">{course.duracion}</p>
                    </div>

                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-4">
                      <span className="text-xs font-semibold text-[#008CA8] uppercase tracking-wider">
                        Espacio Físico Asignado
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#0F2D59]">{course.aula}</p>
                    </div>

                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F7F9FC] p-4">
                      <span className="text-xs font-semibold text-[#008CA8] uppercase tracking-wider">
                        Ubicación Institucional
                      </span>
                      <p className="mt-1 text-sm font-bold text-[#0F2D59]">{course.sede}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E2E8F0] p-4 bg-white flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-[#0F2D59]">
                        ¿Cómo llegar a la Sede Central?
                      </h4>
                      <p className="text-xs text-slate-500">Rosales 695, Puerto Madryn, Chubut</p>
                    </div>
                    <button
                      onClick={onOpenContact}
                      className="rounded-lg bg-[#0F2D59] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#00183b] transition-colors"
                    >
                      Ver en Mapa y Contacto
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column on Desktop: Photo & Workshop Representation */}
            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-6">
              <div className="group relative overflow-hidden rounded-xl bg-slate-900 shadow-sm border border-[#E2E8F0]">
                <img
                  src={course.fotoLaboratorio || CFP_FACADE_IMAGE}
                  alt={course.titulo}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== CFP_FACADE_IMAGE) {
                      target.src = CFP_FACADE_IMAGE;
                    }
                  }}
                  className="h-56 sm:h-72 lg:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Bottom Caption Pill matching Image 2 */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#191C1E]/80 backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white shadow-md border border-white/10">
                    <Building className="h-4 w-4 text-[#6ED4F2]" />
                    <span>{course.pieFoto}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
