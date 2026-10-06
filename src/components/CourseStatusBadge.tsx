import React from 'react';
import { CourseStatus } from '../types';

interface CourseStatusBadgeProps {
  status: CourseStatus | string;
  ciclo?: string;
  variant?: 'card' | 'modal';
  className?: string;
}

export interface StatusStyleConfig {
  label: CourseStatus;
  cardBadge: string;
  modalBadge: string;
  dot: string;
  dotPulse: boolean;
}

export const getStatusConfig = (rawStatus: string): StatusStyleConfig => {
  const s = (rawStatus || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (s.includes('proxim') || s.includes('pronto') || s.includes('espera')) {
    return {
      label: 'Próximamente',
      cardBadge: 'bg-[#FEF3C7] text-[#92400E] border border-amber-300/80 shadow-xs',
      modalBadge: 'bg-[#FEF3C7] text-[#92400E] border border-amber-300/80',
      dot: 'bg-amber-500',
      dotPulse: false,
    };
  }

  if (s.includes('cursan') || s.includes('cursad')) {
    return {
      label: 'Cursando',
      cardBadge: 'bg-[#E0F2FE] text-[#0369A1] border border-sky-300/80 shadow-xs',
      modalBadge: 'bg-[#E0F2FE] text-[#0369A1] border border-sky-300/80',
      dot: 'bg-sky-500',
      dotPulse: true,
    };
  }

  if (s.includes('finaliz') || s.includes('terminad') || s.includes('concluid') || s.includes('cerrad')) {
    return {
      label: 'Finalizado',
      cardBadge: 'bg-slate-100 text-slate-700 border border-slate-300/80 shadow-xs',
      modalBadge: 'bg-slate-100 text-slate-700 border border-slate-300/80',
      dot: 'bg-slate-400',
      dotPulse: false,
    };
  }

  // Default: 'Inscripciones Abiertas'
  return {
    label: 'Inscripciones Abiertas',
    cardBadge: 'bg-[#DEF7EC] text-[#03543F] border border-emerald-300/80 shadow-xs',
    modalBadge: 'bg-[#DEF7EC] text-[#03543F] border border-emerald-300/80',
    dot: 'bg-emerald-500',
    dotPulse: true,
  };
};

export const CourseStatusBadge: React.FC<CourseStatusBadgeProps> = ({
  status,
  ciclo,
  variant = 'card',
  className = '',
}) => {
  const config = getStatusConfig(status);

  if (variant === 'modal') {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.modalBadge} ${className}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${config.dot} ${config.dotPulse ? 'animate-pulse' : ''}`}
        />
        <span>
          {config.label}
          {ciclo ? ` • ${ciclo}` : ''}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${config.cardBadge} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot} ${config.dotPulse ? 'animate-pulse' : ''}`}
      />
      <span>{config.label}</span>
    </div>
  );
};
