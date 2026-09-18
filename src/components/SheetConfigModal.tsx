import React, { useState } from 'react';
import { sheetsService, OFFICIAL_CFP_SHEET_URL } from '../services/sheetsService';
import { X, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink, KeyRound, Globe, Copy, Check } from 'lucide-react';

interface SheetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSync: () => Promise<void>;
  coursesCount: number;
}

export const SheetConfigModal: React.FC<SheetConfigModalProps> = ({
  isOpen,
  onClose,
  onSync,
  coursesCount,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [url, setUrl] = useState(() => sheetsService.getStoredSheetUrl());
  const [isSaving, setIsSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Obtener la contraseña configurada en la variable de entorno .env (VITE_ADMIN_PASSWORD)
    const configuredPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin').trim();
    const entered = password.trim();

    if (entered && entered === configuredPassword) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. Acceso restringido a administradores.');
    }
  };

  const handleSaveAndSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTestResult(null);

    try {
      const cleanUrl = url.trim();
      sheetsService.setStoredSheetUrl(cleanUrl);
      const result = await sheetsService.fetchLiveCourses(cleanUrl);

      if (result.error) {
        setTestResult({
          success: false,
          message: result.error,
        });
      } else {
        setTestResult({
          success: true,
          message: `¡Planilla sincronizada correctamente! Se detectaron ${result.courses.length} cursos.`,
          count: result.courses.length,
        });
        await onSync();
      }
    } catch (err: unknown) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Error al conectar con la planilla.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    sheetsService.resetToDefault();
    setUrl(sheetsService.getStoredSheetUrl());
    setTestResult(null);
    setIsSaving(true);
    try {
      await onSync();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
    setTestResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-[#CBD5E1] p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2D59]/10 text-[#0F2D59]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#0F2D59]">
                Panel de Administración
              </h3>
              <p className="text-xs text-[#44474F]">
                Gestión de sincronización de cursos CFP N° 651
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <form onSubmit={handleLogin} className="space-y-4 py-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#0F2D59]">
                <KeyRound className="h-4 w-4 text-[#008CA8]" />
                <span>Autenticación requerida</span>
              </div>
              <p>
                Ingrese la clave de administración establecida en el sistema para gestionar la planilla y forzar la sincronización.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2D59] mb-1.5">
                Contraseña de administrador:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresar contraseña..."
                autoFocus
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0F2D59] outline-none focus:border-[#008CA8] focus:ring-1 focus:ring-[#008CA8]"
              />
            </div>

            {authError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#0F2D59] px-4 py-2 text-xs font-bold text-white hover:bg-[#00183b] transition-colors"
              >
                Ingresar
              </button>
            </div>
          </form>
        ) : (
          /* Authenticated Admin Panel */
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Estado de la oferta:</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  {coursesCount} {coursesCount === 1 ? 'curso activo' : 'cursos activos'}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Planilla vinculada con el catálogo. Al presionar "Sincronizar ahora" se forzará la lectura de las últimas filas y cambios guardados en Google Sheets.
              </p>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <span className="font-semibold text-slate-700 block">Columnas identificadas:</span>
                <p>• <span className="font-mono text-slate-700 font-semibold">requisitos</span>: condiciones previas, edad mínima o escolaridad requerida.</p>
                <p>• <span className="font-mono text-slate-700 font-semibold">documentacion</span>: constancias y papeles físicos a presentar en sede.</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveAndSync} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F2D59] mb-1.5">
                  Enlace de Google Sheets:
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit?usp=sharing"
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#0F2D59] outline-none focus:border-[#008CA8] focus:ring-1 focus:ring-[#008CA8]"
                />
              </div>

              {testResult && (
                <div
                  className={`rounded-xl p-3.5 text-xs flex items-start gap-2.5 ${
                    testResult.success
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border border-red-200 bg-red-50 text-red-900'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold">{testResult.success ? 'Conexión Exitosa' : 'Error de Conexión'}</p>
                    <p className="leading-relaxed">{testResult.message}</p>
                  </div>
                </div>
              )}

              {/* Explicación de alcance global vs local */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 text-xs text-blue-950 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#0F2D59]">
                  <Globe className="h-4 w-4 text-[#008CA8]" />
                  <span>Alcance para todos los dispositivos y usuarios:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Cualquier persona que visite la web desde cualquier teléfono o computadora cargará <strong>automáticamente la planilla oficial del CFP 651</strong>. Al editar cursos o agregar filas directamente en el documento de Google Sheets, los cambios se reflejan para todos los visitantes sin necesidad de tocar nada más.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const directUrl = `${window.location.origin}${window.location.pathname}?sheet=${encodeURIComponent(url)}`;
                      navigator.clipboard.writeText(directUrl);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2500);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#0F2D59] hover:bg-blue-50 transition-colors shadow-2xs"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                    <span>{copiedLink ? '¡Enlace copiado!' : 'Copiar enlace con esta planilla'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const jsonContent = JSON.stringify({ sheetUrl: url }, null, 2);
                      navigator.clipboard.writeText(jsonContent);
                      setCopiedJson(true);
                      setTimeout(() => setCopiedJson(false), 2500);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#0F2D59] hover:bg-blue-50 transition-colors shadow-2xs"
                  >
                    {copiedJson ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                    <span>{copiedJson ? '¡config.json copiado!' : 'Copiar para config.json'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
                >
                  Restablecer a planilla oficial predeterminada
                </button>

                <div className="flex items-center gap-2">
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Abrir en Sheets
                    </a>
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F2D59] px-4 py-2 text-xs font-bold text-white hover:bg-[#00183b] transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                    <span>{isSaving ? 'Sincronizando...' : 'Sincronizar ahora'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
