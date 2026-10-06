import React from 'react';
import {
  Laptop,
  Zap,
  Flame,
  Utensils,
  Car,
  TreePine,
  Wheat,
  Wrench,
  LucideIcon,
} from 'lucide-react';

/**
 * Mapeo de íconos por categoría de cursos y talleres.
 * 
 * Si una categoría no está en este listado, devuelve `null` (sin ícono por defecto),
 * permitiendo agregar nuevos íconos específicos cuando sea necesario.
 */
export const getCategoryIconComponent = (category: string): LucideIcon | null => {
  if (!category) return null;

  const cat = category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 1. Industria de la Madera / Carpintería
  if (cat.includes('madera') || cat.includes('carpint') || cat.includes('ebanist') || cat.includes('forest')) {
    return TreePine;
  }

  // 2. Industria Alimentaria
  if (cat.includes('aliment') || cat.includes('agroalim') || cat.includes('nutri')) {
    return Wheat;
  }

  // 3. Informática, Tecnología y Redes
  if (cat.includes('inform') || cat.includes('tecno') || cat.includes('comput') || cat.includes('sistem') || cat.includes('program')) {
    return Laptop;
  }

  // 4. Electricidad y Energías
  if (cat.includes('elec') || cat.includes('energ')) {
    return Zap;
  }

  // 5. Soldadura y Metalmecánica
  if (cat.includes('sold') || cat.includes('metal')) {
    return Flame;
  }

  // 6. Gastronomía, Cocina y Pastelería
  if (cat.includes('gastro') || cat.includes('cocina') || cat.includes('pastel') || cat.includes('repost')) {
    return Utensils;
  }

  // 7. Automotor y Mecánica
  if (cat.includes('auto') || cat.includes('mecan')) {
    return Car;
  }

  // 8. Construcciones Civiles
  if (cat.includes('construc') || cat.includes('civil') || cat.includes('obra')) {
    return Wrench;
  }

  // Categoría no reconocida: sin ícono por defecto (para asignar a futuro)
  return null;
};

/**
 * Retorna el elemento JSX del ícono correspondiente o null si no está registrado.
 */
export const getCategoryIcon = (category: string, className = 'h-3.5 w-3.5'): React.ReactNode => {
  const IconComponent = getCategoryIconComponent(category);
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};
