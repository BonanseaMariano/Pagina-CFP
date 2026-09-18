/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Course, NavigationTab } from './types';
import { DEFAULT_COURSES } from './data/defaultCourses';
import { sheetsService } from './services/sheetsService';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseModal } from './components/CourseModal';
import { RequirementsView } from './components/RequirementsView';
import { FaqView } from './components/FaqView';
import { InstitutionalView } from './components/InstitutionalView';
import { ContactModal } from './components/ContactModal';
import { SheetConfigModal } from './components/SheetConfigModal';
import { Footer } from './components/Footer';

export default function App() {
  const [courses, setCourses] = useState<Course[]>(() => {
    const cached = sheetsService.getCachedCourses();
    return cached && cached.length > 0 ? cached : DEFAULT_COURSES;
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    const cached = sheetsService.getCachedCourses();
    return !(cached && cached.length > 0) && DEFAULT_COURSES.length === 0;
  });

  const [isSheetConfigOpen, setIsSheetConfigOpen] = useState<boolean>(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('cursos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedTurno, setSelectedTurno] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Carga y sincronización con Google Sheets (silenciosa)
  const handleSyncData = useCallback(async (isInitial = false) => {
    if (isInitial && courses.length === 0) {
      setIsLoading(true);
    }
    try {
      const result = await sheetsService.fetchLiveCourses();
      if (result.courses && result.courses.length > 0) {
        setCourses((prevCourses) => {
          // Solo actualizar el estado de React si los datos realmente cambiaron
          const prevStr = JSON.stringify(prevCourses);
          const nextStr = JSON.stringify(result.courses);
          if (prevStr !== nextStr) {
            return result.courses;
          }
          return prevCourses;
        });

        // Si hay un curso abierto en el modal, actualizar sus datos si hubo cambios
        setSelectedCourse((prev) => {
          if (!prev) return null;
          const fresh = result.courses.find((c) => c.id === prev.id || c.titulo === prev.titulo);
          return fresh || prev;
        });
      }
    } catch {
      // Fallo silencioso de conexión en background para no interrumpir al usuario
    } finally {
      setIsLoading(false);
    }
  }, [courses.length]);

  // Cargar datos al montar la página y verificar cambios de fondo cada 2 minutos
  useEffect(() => {
    handleSyncData(true);

    const interval = setInterval(() => {
      handleSyncData(false);
    }, 120000);

    return () => clearInterval(interval);
  }, [handleSyncData]);

  // Detectar acceso al endpoint administrativo (/admin, /gestion, #admin, ?admin=true)
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        path.includes('/admin') ||
        path.includes('/gestion') ||
        hash === '#admin' ||
        hash === '#gestion' ||
        search.includes('admin=true')
      ) {
        setIsSheetConfigOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsSheetConfigOpen(false);
    // Limpiar hash o query sin recargar la página si entró por ahí
    if (window.location.hash === '#admin' || window.location.hash === '#gestion') {
      window.history.replaceState(null, '', window.location.pathname);
    } else if (window.location.pathname.includes('/admin') || window.location.pathname.includes('/gestion')) {
      window.history.replaceState(null, '', '/');
    }
  };

  // Extraer categorías dinámicamente de los cursos
  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.categoria))).filter(Boolean);
    return ['Todos', ...unique];
  }, [courses]);

  const handleClearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedTurno('Todos');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-[#1E293B]">
      {/* Barra de navegación superior institucional */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => setIsContactOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (currentTab !== 'cursos') setCurrentTab('cursos');
        }}
      />

      {/* Vistas Principales */}
      <main className="flex-1">
        {currentTab === 'cursos' && (
          <>
            <HeroBanner
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedTurno={selectedTurno}
              onSelectTurno={setSelectedTurno}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <CourseCatalog
              courses={courses}
              onSelectCourse={(course) => setSelectedCourse(course)}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedTurno={selectedTurno}
              onClearFilters={handleClearFilters}
              isLoading={isLoading}
              onGoToRequirements={() => {
                setCurrentTab('requisitos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {currentTab === 'requisitos' && (
          <RequirementsView
            onOpenContact={() => setIsContactOpen(true)}
            onGoToCourses={() => setCurrentTab('cursos')}
          />
        )}

        {currentTab === 'faq' && <FaqView />}

        {currentTab === 'institucional' && <InstitutionalView />}
      </main>

      {/* Pie de página */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modal de Detalle de Curso */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modal de Contacto y Sede */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Modal de Configuración / Estado de Google Sheets */}
      <SheetConfigModal
        isOpen={isSheetConfigOpen}
        onClose={handleCloseAdmin}
        onSync={handleSyncData}
        coursesCount={courses.length}
      />
    </div>
  );
}
