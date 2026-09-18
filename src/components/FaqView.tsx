import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Award } from 'lucide-react';

export const FaqView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Los cursos tienen algún costo o cuota mensual?',
      a: 'No, todos nuestros cursos y talleres son 100% públicos y gratuitos. No se cobra matrícula ni cuotas mensuales. En algunos talleres específicos, los estudiantes únicamente aportan los materiales descartables o consumibles que usan para sus propias prácticas.',
    },
    {
      q: '¿El certificado que entregan es oficial?',
      a: 'Sí. Al completar y aprobar el curso recibís una certificación oficial emitida por el Centro de Formación Profesional N° 651 y avalada por el Ministerio de Educación del Chubut.',
    },
    {
      q: '¿Puedo anotarme si no terminé el secundario?',
      a: '¡Sí! Para algunos cursos el único requisito de estudio es tener la primaria completa. Solo algunas capacitaciones técnicas más avanzadas piden secundario o haber hecho un curso previo del mismo rubro. Te invitamos a revisar la ficha del curso que te interese para ver si pide algo específico.',
    },
    {
      q: '¿Cómo consigo un cupo para cursar?',
      a: 'Los lugares se asignan por orden de llegada con la documentación completa en la sede donde se dicta el curso durante los días que abrimos las inscripciones. Como los talleres tienen cupos limitados para que todos puedan practicar cómodos y seguros con las herramientas, te recomendamos acercarte en los primeros días habilitados.',
    },
    {
      q: '¿Qué necesito para aprobar el curso?',
      a: 'Nuestros cursos son principalmente prácticos en taller, por lo que se requiere un mínimo del 85% de asistencia a las clases y aprobar los trabajos prácticos y evaluaciones con una nota de 7 o más.',
    },
    {
      q: '¿Tengo que llevar mis propias herramientas?',
      a: 'No, el Centro cuenta con las maquinarias, computadoras, bancos de trabajo y herramientas necesarias para que aprendas el oficio. Vos solo debés traer tus elementos básicos de seguridad (como calzado adecuado o antiparras, según el taller) y los materiales de práctica personal que indique el instructor.',
    },
 ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2D59]">
          Preguntas Frecuentes
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#44474F]">
          Encontrá respuestas a las consultas más habituales sobre los cursos y talleres, certificaciones y
          modalidad de cursada en el CFP N° 651 de Puerto Madryn.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="font-heading text-sm sm:text-base font-bold text-[#0F2D59] pr-4">
                  {faq.q}
                </span>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F9FC] text-[#0F2D59] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#0F2D59] text-white' : ''
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-[#F1F5F9] bg-[#F7F9FC] p-5 sm:p-6 text-xs sm:text-sm text-[#44474F] leading-relaxed animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
