import { Course } from '../types';
import { DEFAULT_COURSES } from '../data/defaultCourses';
import { CFP_FACADE_IMAGE } from '../data/cfpFacadeImage';

const STORAGE_KEY_CUSTOM_SHEET_URL = 'cfp651_custom_sheet_url';
const STORAGE_KEY_LAST_COURSES = 'cfp651_live_courses_v3';
const STORAGE_KEY_LAST_SYNC_TIME = 'cfp651_last_sync_time';

// Transforma URLs de Google Drive o imágenes compartidas a enlace directo embebible en <img>
export function formatImageUrl(url: string): string {
  if (!url || !url.trim()) {
    // Foto real de la fachada de Sede Central Rosales 695 / CFP 651
    return CFP_FACADE_IMAGE;
  }

  const clean = url.trim();

  // Enlaces de Google Drive tipo:
  // https://drive.google.com/file/d/1A2B3C4D.../view?usp=sharing
  // https://drive.google.com/open?id=1A2B3C4D...
  // https://drive.google.com/uc?id=1A2B3C4D...
  const driveFileMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveFileMatch[1]}&sz=w1200`;
  }

  const driveIdParamMatch = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (clean.includes('drive.google.com') && driveIdParamMatch && driveIdParamMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveIdParamMatch[1]}&sz=w1200`;
  }

  // Si pegaron únicamente el ID alfanumérico de archivo de Drive
  if (/^[a-zA-Z0-9_-]{28,}$/.test(clean)) {
    return `https://drive.google.com/thumbnail?id=${clean}&sz=w1200`;
  }

  // Si es un enlace de Dropbox
  if (clean.includes('dropbox.com') && clean.includes('dl=0')) {
    return clean.replace('dl=0', 'raw=1');
  }

  return clean;
}

export const DEFAULT_SHEET_SOURCE =
  ((import.meta as unknown as { env?: Record<string, string> })?.env?.VITE_GOOGLE_SHEET_URL) || '';

// Extract sheet ID or return usable CSV export URL
export function formatSheetCsvUrl(rawUrl: string): string {
  if (!rawUrl || !rawUrl.trim()) return '';

  const clean = rawUrl.trim();

  // If it's already a direct CSV URL
  if (clean.includes('output=csv') || clean.endsWith('.csv')) {
    return clean;
  }

  // If it's a published Google Sheet (docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml)
  if (clean.includes('/pubhtml')) {
    return clean.replace('/pubhtml', '/pub?output=csv');
  }

  // Standard Google Sheets edit URL: https://docs.google.com/spreadsheets/d/{ID}/edit...
  const match = clean.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    // Check if there's a gid (sheet tab)
    const gidMatch = clean.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}`;
  }

  // If user only pasted sheet ID (alphanumeric with - and _)
  if (/^[a-zA-Z0-9-_]{20,}$/.test(clean)) {
    return `https://docs.google.com/spreadsheets/d/${clean}/gviz/tq?tqx=out:csv`;
  }

  return clean;
}

// Robust CSV parser handling quotes and commas
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip next quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

// Convert CSV rows into Course objects
export function convertRowsToCourses(rows: string[][]): Course[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) =>
    h
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_]/g, '')
      .trim()
  );

  const getCol = (row: string[], ...aliases: string[]): string => {
    for (const alias of aliases) {
      const idx = headers.indexOf(alias);
      if (idx !== -1 && row[idx] !== undefined) {
        return row[idx].trim();
      }
    }
    return '';
  };

  const courses: Course[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const titulo = getCol(row, 'titulo', 'title', 'nombre', 'curso', 'nombrecurso');
    if (!titulo) continue; // Skip empty rows

    const id =
      titulo
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const rawEstado = getCol(row, 'estado', 'status', 'inscripciones').toLowerCase();
    let estado: Course['estado'] = 'Inscripciones Abiertas';
    if (rawEstado.includes('cupo') || rawEstado.includes('limitad')) {
      estado = 'Cupos Limitados';
    } else if (rawEstado.includes('proximamente') || rawEstado.includes('espera') || rawEstado.includes('pronto')) {
      estado = 'Próximamente';
    } else if (rawEstado.includes('cursad') || rawEstado.includes('cerrad') || rawEstado.includes('finaliz')) {
      estado = 'En Cursada';
    }

    const rawTurno = getCol(row, 'turno', 'horario_turno').toLowerCase();
    let turno: Course['turno'] = 'Vespertino';
    if (rawTurno.includes('man') || rawTurno.includes('mñn') || rawTurno.includes('mañ')) {
      turno = 'Mañana';
    } else if (rawTurno.includes('tar')) {
      turno = 'Tarde';
    } else {
      turno = 'Vespertino';
    }

    const rawRequisitos = getCol(row, 'requisitos', 'requisitosingreso', 'requisito');
    const requisitos = rawRequisitos
      ? rawRequisitos.split(/[;|•\n]/).map((s) => s.trim()).filter(Boolean)
      : [
          'Mayor de 18 años cumplidos (o 16 con autorización tutelar)',
          'Estudios primarios o secundarios según la especialidad técnica',
        ];

    const rawDocumentacion = getCol(row, 'documentacion', 'documento', 'documentos', 'papeles');
    const documentacion = rawDocumentacion
      ? rawDocumentacion.split(/[;|•\n]/).map((s) => s.trim()).filter(Boolean)
      : [
          'Fotocopia de DNI (anverso y reverso)',
          'Certificado de escolaridad autenticado',
          '1 Foto carnet 4x4 para legajo estudiantil',
        ];

    const rawPlan = getCol(row, 'planestudio', 'plan_estudio', 'modulos', 'programa');
    const planEstudio = rawPlan
      ? rawPlan.split(/[;|•\n]/).map((item, idx) => ({
          numero: idx + 1,
          nombre: item.trim(),
          descripcion: 'Contenidos teóricos y prácticas formativas en sede.',
          horas: 60,
        }))
      : [];

    const rawFoto =
      getCol(row, 'fotolaboratorio', 'foto_laboratorio', 'foto', 'imagen', 'img', 'foto_url', 'drive', 'drive_url');
    const foto = formatImageUrl(rawFoto);

    const certificacion = getCol(row, 'certificacion', 'titulo_otorgado', 'certificado', 'titulo');

    courses.push({
      id,
      titulo,
      categoria: getCol(row, 'categoria', 'rubro', 'sector') || 'Formación Profesional',
      gratuito: getCol(row, 'gratuito', 'arancel') || 'Gratuito y Público',
      estado,
      ciclo: getCol(row, 'ciclo', 'periodo', 'año') || `Ciclo ${new Date().getFullYear()}`,
      certificacion: certificacion || undefined,
      fotoLaboratorio: foto,
      pieFoto:
        getCol(row, 'piefoto', 'pie_foto', 'epigrafe', 'lugar') ||
        'Sede Central Rosales 695 • Talleres Formativos',
      descripcion:
        getCol(row, 'descripcion', 'detalle', 'resumen', 'perfilegreso', 'perfil_egreso', 'salidalaboral', 'perfil') ||
        'Formación orientada al desarrollo de capacidades técnicas y operativas para el desempeño laboral en la región.',
      perfilEgreso:
        getCol(row, 'perfilegreso', 'perfil_egreso', 'salidalaboral', 'descripcion', 'perfil'),
      horariosTurno:
        getCol(row, 'horariosturno', 'horarios_turno', 'horario', 'dias_horarios') ||
        `Lunes a Jueves • Turno ${turno}. Rosales 695.`,
      turno,
      duracion: getCol(row, 'duracion', 'cargahoraria', 'horas') || 'Anual',
      sede: getCol(row, 'sede', 'direccion') || 'Sede Central Rosales 695, Puerto Madryn',
      aula: getCol(row, 'aula', 'espacio') || 'Aula Taller Central',
      requisitos,
      documentacion,
      planEstudio,
      destacado: getCol(row, 'destacado', 'prioridad').toLowerCase() === 'si' || i <= 3,
    });
  }

  return courses;
}

// Service to fetch and manage live courses
export const sheetsService = {
  getStoredSheetUrl(): string {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const params = new URLSearchParams(window.location.search);
        const sheetParam = params.get('sheet') || params.get('spreadsheet');
        if (sheetParam) {
          localStorage.setItem(STORAGE_KEY_CUSTOM_SHEET_URL, sheetParam);
          return sheetParam;
        }
      }
    } catch {
      // ignore
    }
    const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_SHEET_URL);
    if (stored && stored.trim()) {
      return stored.trim();
    }
    return DEFAULT_SHEET_SOURCE || '';
  },

  setStoredSheetUrl(url: string) {
    if (url.trim()) {
      localStorage.setItem(STORAGE_KEY_CUSTOM_SHEET_URL, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_CUSTOM_SHEET_URL);
    }
  },

  getLastSyncTime(): string | null {
    return localStorage.getItem(STORAGE_KEY_LAST_SYNC_TIME);
  },

  getCachedCourses(): Course[] | null {
    try {
      // Limpiar caché anterior si existía para no arrastrar cursos placeholder
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('cfp651_cached_courses');
        const cached = localStorage.getItem(STORAGE_KEY_LAST_COURSES);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch {
      // ignore JSON parse errors
    }
    return null;
  },

  async fetchLiveCourses(customUrl?: string): Promise<{ courses: Course[]; error: string | null; isDefault: boolean }> {
    const targetUrl = customUrl !== undefined ? customUrl : this.getStoredSheetUrl();

    if (!targetUrl || !targetUrl.trim()) {
      const cached = this.getCachedCourses();
      return {
        courses: cached && cached.length > 0 ? cached : DEFAULT_COURSES,
        error: null,
        isDefault: true,
      };
    }

    const csvUrl = formatSheetCsvUrl(targetUrl);

    try {
      // Fetch the CSV directly
      const response = await fetch(csvUrl, {
        headers: {
          Accept: 'text/csv, text/plain, */*',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al conectar con la hoja (Código HTTP ${response.status}). Asegúrate de que el documento esté compartido como "Cualquier persona con el enlace puede ver" o "Publicado en la web".`);
      }

      const csvText = await response.text();
      const rows = parseCSV(csvText);

      if (rows.length < 2) {
        throw new Error('La hoja de cálculo no contiene filas de datos válidas (solo encabezados o vacía).');
      }

      const parsedCourses = convertRowsToCourses(rows);

      if (parsedCourses.length === 0) {
        throw new Error('No se detectaron cursos válidos. Verifica que las columnas incluyan "titulo" o "curso".');
      }

      // Save to cache
      const now = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_LAST_COURSES, JSON.stringify(parsedCourses));
      localStorage.setItem(STORAGE_KEY_LAST_SYNC_TIME, now);

      return {
        courses: parsedCourses,
        error: null,
        isDefault: false,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido al sincronizar hoja de cálculo.';
      const fallback = this.getCachedCourses() || [];
      return {
        courses: fallback,
        error: message,
        isDefault: false,
      };
    }
  },

  resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_SHEET_URL);
    localStorage.removeItem(STORAGE_KEY_LAST_COURSES);
    localStorage.removeItem(STORAGE_KEY_LAST_SYNC_TIME);
  },
};
