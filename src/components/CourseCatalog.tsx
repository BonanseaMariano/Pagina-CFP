import React from 'react';
import { Course } from '../types';
import { CourseCard } from './CourseCard';
import { Search, BookOpen, Loader2 } from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  searchQuery: string;
  selectedCategory: string;
  selectedTurno: string;
  onClearFilters: () => void;
  isLoading?: boolean;
  onGoToRequirements?: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  onSelectCourse,
  searchQuery,
  selectedCategory,
  selectedTurno,
  onClearFilters,
  isLoading = false,
  onGoToRequirements,
}) => {
  const filteredCourses = courses.filter((course) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = course.titulo.toLowerCase().includes(q);
      const matchCategory = course.categoria.toLowerCase().includes(q);
      const matchDesc = (course.descripcion || '').toLowerCase().includes(q) || (course.perfilEgreso || '').toLowerCase().includes(q);
      const matchAula = course.aula.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchDesc && !matchAula) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'Todos' && course.categoria !== selectedCategory) {
      return false;
    }

    // Turno filter
    if (selectedTurno !== 'Todos' && course.turno !== selectedTurno) {
      return false;
    }

    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header with results count and filter indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0F2D59]">
            Catálogo de Cursos
          </h2>
          <p className="text-xs sm:text-sm text-[#44474F]">
            {isLoading
              ? 'Cargando oferta académica oficial...'
              : courses.length > 0
              ? `Mostrando ${filteredCourses.length} de ${courses.length} cursos y talleres disponibles para el Ciclo Lectivo ${new Date().getFullYear()}`
              : `Oferta académica del Ciclo Lectivo ${new Date().getFullYear()}`}
          </p>
        </div>

        {(searchQuery || selectedCategory !== 'Todos' || selectedTurno !== 'Todos') && (
          <button
            onClick={onClearFilters}
            className="rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0F2D59] hover:bg-[#F2F4F7] transition-colors"
          >
            Restablecer filtros
          </button>
        )}
      </div>

      {/* Loading state */}
      {isLoading && courses.length === 0 ? (
        <div className="rounded-2xl border border-[#CBD5E1] bg-white p-12 text-center space-y-4 shadow-2xs">
          <Loader2 className="mx-auto h-8 w-8 text-[#008CA8] animate-spin" />
          <p className="text-sm font-semibold text-[#0F2D59]">Cargando cursos desde la planilla oficial...</p>
        </div>
      ) : courses.length === 0 ? (
        /* Empty Catalog State (No courses loaded from the sheet) */
        <div className="rounded-2xl border border-[#CBD5E1] bg-white p-10 sm:p-14 text-center space-y-4 shadow-2xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F9FC] text-[#0F2D59]">
            <BookOpen className="h-7 w-7 text-[#008CA8]" />
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F2D59]">
            No hay cursos publicados en este momento
          </h3>
          <p className="text-xs sm:text-sm text-[#44474F] max-w-md mx-auto leading-relaxed">
            La oferta formativa se actualiza en tiempo real según las convocatorias y aperturas oficiales del CFP N° 651 en Puerto Madryn.
          </p>
        </div>
      ) : filteredCourses.length === 0 ? (
        /* Filtered Empty State */
        <div className="rounded-2xl border border-[#CBD5E1] bg-white p-10 sm:p-14 text-center space-y-4 shadow-2xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F9FC] text-[#747780]">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#0F2D59]">
            No se encontraron cursos con los filtros seleccionados
          </h3>
          <p className="text-xs sm:text-sm text-[#44474F] max-w-md mx-auto">
            Probá buscando con otro término, seleccionando "Todos" en las áreas temáticas o
            consultando por Secretaría Académica.
          </p>
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F2D59] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#00183b] transition-colors shadow-xs"
          >
            <span>Ver toda la oferta formativa</span>
          </button>
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
            />
          ))}
        </div>
      )}

      {/* Information Banner below grid */}
      <div className="rounded-2xl border border-[#CBD5E1] bg-gradient-to-r from-[#00183b] to-[#0F2D59] p-6 text-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#6ED4F2]">
            Información Institucional
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold">
            ¿Querés saber cómo es el trámite de inscripción?
          </h3>
          <p className="text-xs sm:text-sm text-[#ADC7FC] max-w-2xl">
            La presentación de documentación es presencial. Conocé todos los requisitos y pasos para garantizar tu lugar.
          </p>
        </div>
        <button
          onClick={() => {
            if (onGoToRequirements) {
              onGoToRequirements();
            } else {
              const first = filteredCourses[0] || courses[0];
              if (first) onSelectCourse(first);
            }
          }}
          className="shrink-0 rounded-xl bg-[#C8232C] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#A61A22] transition-colors"
        >
          Ver Guía de Inscripción
        </button>
      </div>
    </div>
  );
};
