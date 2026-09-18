export interface CourseModule {
  numero: number;
  nombre: string;
  descripcion: string;
  horas: number;
}

export interface Course {
  id: string;
  codigo?: string;
  titulo: string;
  categoria: string;
  gratuito: string;
  estado: 'Inscripciones Abiertas' | 'Cupos Limitados' | 'Próximamente' | 'En Cursada';
  ciclo: string;
  certificacion?: string;
  fotoLaboratorio: string;
  pieFoto: string;
  competencias?: string;
  descripcion: string;
  perfilEgreso?: string;
  plazosInscripcion?: string;
  horariosTurno: string;
  turno: 'Mañana' | 'Tarde' | 'Vespertino';
  duracion: string;
  sede: string;
  aula: string;
  requisitos: string[];
  documentacion?: string[];
  planEstudio: CourseModule[];
  destacado?: boolean;
}

export type NavigationTab = 'cursos' | 'requisitos' | 'faq' | 'institucional' | 'contacto';

export interface SheetSyncState {
  isSyncing: boolean;
  lastUpdated: string | null;
  sourceUrl: string;
  isCustomUrl: boolean;
  error: string | null;
  rowCount: number;
}
