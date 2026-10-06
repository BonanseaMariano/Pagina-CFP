import React from 'react';
import { Course } from '../types';
import { CourseStatusBadge } from './CourseStatusBadge';
import { CFP_FACADE_IMAGE } from '../data/cfpFacadeImage';
import { Clock, MapPin, Award, ChevronRight } from 'lucide-react';
import { getCategoryIcon } from '../utils/categoryIcons';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const categoryIcon = getCategoryIcon(course.categoria);

  const certs =
    course.certificaciones && course.certificaciones.length > 0
      ? course.certificaciones
      : course.certificacion
      ? course.certificacion.split(/[;|•\n]/).map((s) => s.trim()).filter(Boolean)
      : [];

  return (
    <div
      onClick={() => onSelect(course)}
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#008CA8] hover:shadow-lg cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
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
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10 max-w-[calc(100%-1.5rem)] xl:max-w-[calc(100%-11.5rem)]">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-[#0F2D59] shadow-xs max-w-full">
            {categoryIcon}
            <span className="truncate">{course.categoria}</span>
          </div>
        </div>

        {/* Status Badge: Bottom-right on mobile/tablet/laptop, top-right on wide desktop (xl+) */}
        <div className="absolute bottom-3 right-3 z-10 xl:bottom-auto xl:top-3 xl:right-3">
          <CourseStatusBadge status={course.estado} variant="card" />
        </div>

        {/* Bottom image overlay with Shift / Turno */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center text-white text-xs font-medium">
          <span className="rounded-md bg-black/70 px-2 py-0.5 backdrop-blur-xs shadow-2xs">
            Turno {course.turno}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
          <span className="font-semibold text-[#008CA8]">{course.categoria}</span>
          <span className="font-medium text-slate-400">{course.duracion}</span>
        </div>

        <h3 className="font-heading text-lg font-bold leading-snug text-[#0F2D59] group-hover:text-[#008CA8] transition-colors">
          {course.titulo}
        </h3>

        <p className="mt-2 text-xs text-[#44474F] line-clamp-2 leading-relaxed">
          {course.descripcion || course.perfilEgreso}
        </p>

        {/* Metadata Details */}
        <div className="mt-4 pt-4 border-t border-[#F1F5F9] space-y-2 text-xs text-[#44474F]">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#008CA8] shrink-0" />
            <span className="truncate">{course.horariosTurno}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#B71322] shrink-0" />
            <span className="truncate">{course.aula} ({course.sede.split(',')[0]})</span>
          </div>
          {certs.length > 0 && (
            <div className="space-y-1.5 pt-0.5">
              {certs.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700" title={cert}>
                  <Award className="h-3.5 w-3.5 text-[#008CA8] shrink-0" />
                  <span className="truncate text-[11px] font-medium text-[#1E293B]">{cert}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-[#F1F5F9] bg-[#F7F9FC] px-5 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#0F2D59]">
          Mas Información
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0F2D59] shadow-2xs group-hover:bg-[#0F2D59] group-hover:text-white transition-colors">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
