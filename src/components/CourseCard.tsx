import React from 'react';
import { Course } from '../types';
import { CFP_FACADE_IMAGE } from '../data/cfpFacadeImage';
import { Clock, MapPin, Award, ChevronRight, Laptop, Wrench, Zap, Flame, Utensils, Car } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('inform') || cat.includes('tecno') || cat.includes('comput'))
      return <Laptop className="h-3.5 w-3.5" />;
    if (cat.includes('elec')) return <Zap className="h-3.5 w-3.5" />;
    if (cat.includes('sold') || cat.includes('metal')) return <Flame className="h-3.5 w-3.5" />;
    if (cat.includes('gastro') || cat.includes('cocina') || cat.includes('pastel'))
      return <Utensils className="h-3.5 w-3.5" />;
    if (cat.includes('auto') || cat.includes('mecan')) return <Car className="h-3.5 w-3.5" />;
    return <Wrench className="h-3.5 w-3.5" />;
  };

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-[#0F2D59] shadow-xs">
            {getCategoryIcon(course.categoria)}
            <span>{course.categoria}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold shadow-xs ${
              course.estado === 'Inscripciones Abiertas'
                ? 'bg-[#DEF7EC] text-[#03543F]'
                : course.estado === 'Cupos Limitados'
                ? 'bg-[#FDF2E9] text-[#C8232C]'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {course.estado}
          </div>
        </div>

        {/* Bottom image overlay with Shift / Turno */}
        <div className="absolute bottom-3 left-3 flex items-center text-white text-xs font-medium">
          <span className="rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
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
          {course.certificacion && (
            <div className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-[#0F2D59] shrink-0" />
              <span className="truncate text-[11px]">{course.certificacion}</span>
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
