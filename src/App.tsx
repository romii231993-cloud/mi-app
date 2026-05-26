/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Utensils, 
  Users, 
  Zap, 
  ShieldCheck, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart, 
  BookOpen, 
  Coffee, 
  Sun, 
  Moon, 
  Leaf, 
  Apple, 
  Calendar,
  Gift,
  Brain,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { cn } from './lib/utils';

declare global {
  interface Window {
    fbq: any;
  }
}

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'lg',
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const variants = {
    primary: 'bg-brand-green hover:bg-brand-dark text-white shadow-lg shadow-brand-green/20',
    secondary: 'bg-brand-orange hover:bg-orange-600 text-white shadow-lg shadow-brand-orange/20',
    outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green-light'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
    xl: 'px-10 py-5 text-xl font-extrabold uppercase tracking-wider'
  };

  return (
    <button 
      className={cn(
        'rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Section = ({ 
  children, 
  className, 
  id,
  containerClassName 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
  containerClassName?: string;
  key?: React.Key;
}) => (
  <section id={id} className={cn('py-16 md:py-24 px-4 overflow-hidden', className)}>
    <div className={cn('max-w-6xl mx-auto', containerClassName)}>
      {children}
    </div>
  </section>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string; key?: React.Key }) => (
  <div className={cn('bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300', className)}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-green transition-colors"
      >
        <span className="text-lg font-bold pr-8">{question}</span>
        {isOpen ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 23,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      {[
        { label: 'Días', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Seg', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-brand-dark text-white w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-inner">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-2 text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-green/30">
      {/* 1. Headline & 2. Subtitle */}
      <header className="pt-20 pb-12 px-4 bg-gradient-to-b from-brand-green-light/50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-brand-green">
              Organiza las comidas de toda tu familia sin estrés con recetas saludables, rápidas y fáciles de preparar.
            </h1>
            <p className="text-xl md:text-2xl text-slate-900 font-bold max-w-4xl mx-auto leading-relaxed">
              Accede a un sistema práctico con más de 750 recetas organizadas para ahorrar tiempo, dejar de improvisar y alimentar mejor a tu familia todos los días.
            </p>

            {/* Ebook Mockup Visual Package */}
            <div className="relative h-[250px] xs:h-[280px] sm:h-[350px] md:h-[400px] w-full max-w-xl mx-auto mt-12 mb-8 flex items-center justify-center overflow-visible select-none px-4">
              {/* Soft glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/10 to-amber-500/10 blur-[60px] md:blur-[80px] rounded-full pointer-events-none -z-10 w-[80%] h-[80%] mx-auto my-auto" />

              {/* Pack badge */}
              <div className="absolute top-[5%] right-0 sm:right-[15%] md:right-[5%] bg-amber-400 text-slate-900 border-2 border-slate-900 font-black text-[10px] md:text-xs px-2.5 py-1.5 rounded-xl shadow-lg z-40 rotate-[15deg] uppercase flex flex-col items-center tracking-wider shrink-0 leading-tight">
                <span className="text-[8px] md:text-[9px] opacity-80">SISTEMA</span>
                <span>COMPLETO</span>
              </div>

              {/* Book 1 (Left - Desayunos) */}
              <div className="absolute left-1/2 -ml-[115px] xs:-ml-[135px] sm:-ml-[180px] md:-ml-[220px] bottom-2 md:bottom-4 z-10 w-[78px] xs:w-[92px] sm:w-[125px] md:w-[155px] h-auto rounded-r-md shadow-lg border border-slate-200/50 transform-gpu origin-bottom -rotate-12 translate-y-2 hover:-translate-y-4 hover:rotate-0 transition-all duration-300">
                <div className="relative overflow-hidden rounded-r-md">
                  <img 
                    src="https://i.imgur.com/PO8gJCm.png" 
                    alt="Manual de Desayunos" 
                    className="w-full h-auto object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Book spine shadow overlay */}
                  <div className="absolute top-0 left-0 w-2 md:w-3 h-full bg-gradient-to-r from-black/25 via-white/5 to-transparent" />
                </div>
              </div>

              {/* Book 2 (Center Left - Almuerzos) */}
              <div className="absolute left-1/2 -ml-[60px] xs:-ml-[70px] sm:-ml-[95px] md:-ml-[115px] bottom-1 z-20 w-[82px] xs:w-[98px] sm:w-[135px] md:w-[165px] h-auto rounded-r-md shadow-xl border border-slate-200/50 transform-gpu origin-bottom -rotate-6 translate-y-1 hover:-translate-y-4 hover:rotate-0 transition-all duration-300">
                <div className="relative overflow-hidden rounded-r-md">
                  <img 
                    src="https://i.imgur.com/HiO8hd4.png" 
                    alt="Almuerzos Balanceados" 
                    className="w-full h-auto object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Book spine shadow overlay */}
                  <div className="absolute top-0 left-0 w-2 md:w-3 h-full bg-gradient-to-r from-black/25 via-white/5 to-transparent" />
                </div>
              </div>

              {/* Book 3 (Center Right - Cenas) */}
              <div className="absolute left-1/2 ml-[22px] xs:ml-[26px] sm:ml-[35px] md:ml-[45px] bottom-1.5 z-20 w-[82px] xs:w-[98px] sm:w-[135px] md:w-[165px] h-auto rounded-r-md shadow-xl border border-slate-200/50 transform-gpu origin-bottom rotate-6 translate-y-1 hover:-translate-y-4 hover:rotate-0 transition-all duration-300">
                <div className="relative overflow-hidden rounded-r-md">
                  <img 
                    src="https://i.imgur.com/Pbcaslj.png" 
                    alt="Cenas Sin Complicaciones" 
                    className="w-full h-auto object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Book spine shadow overlay */}
                  <div className="absolute top-0 left-0 w-2 md:w-3 h-full bg-gradient-to-r from-black/25 via-white/5 to-transparent" />
                </div>
              </div>

              {/* Book 4 (Hero Center - Biblia Principal) */}
              <div className="absolute left-1/2 -ml-[45px] xs:-ml-[52px] sm:-ml-[70px] md:-ml-[85px] bottom-0 z-30 w-[92px] xs:w-[108px] sm:w-[145px] md:w-[175px] h-auto rounded-r-md shadow-2xl border-y border-r border-slate-200/50 transform-gpu origin-bottom -rotate-2 hover:-translate-y-5 hover:rotate-0 transition-all duration-300">
                <div className="relative overflow-hidden rounded-r-md">
                  <img 
                    src="https://i.imgur.com/yMPVzhg.jpeg" 
                    alt="La Biblia de la Cocina Saludable Familiar" 
                    className="w-full h-auto object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {/* 750+ Recetas floating tag on the hero book */}
                  <div className="absolute top-1 right-1 bg-brand-orange text-white text-[7px] md:text-[9px] font-black px-1.5 py-0.5 rounded shadow z-40 transform rotate-12">
                    750+ RECETAS
                  </div>
                  {/* Book spine shadow overlay */}
                  <div className="absolute top-0 left-0 w-2 md:w-3.5 h-full bg-gradient-to-r from-black/30 via-white/10 to-transparent" />
                </div>
              </div>
            </div>

            {/* Main CTA Button & Trust Badges */}
            <div className="mt-10 flex flex-col items-center justify-center">
              <a 
                href="https://pay.hotmart.com/A104943855R" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-block select-none"
                onClick={() => {
                  if (window.fbq) window.fbq('track', 'InitiateCheckout', { content_name: 'Sistema Alimentación Familiar', value: 9.79, currency: 'USD' });
                }}
              >
                <button 
                  className={cn(
                    "w-full sm:w-auto px-10 py-5 text-lg md:text-xl font-extrabold uppercase tracking-wider rounded-full text-white",
                    "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600",
                    "shadow-xl shadow-rose-500/30 active:scale-95 transition-all duration-300",
                    "flex items-center justify-center gap-3 cursor-pointer group"
                  )}
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  QUIERO ORGANIZAR MIS COMIDAS HOY
                </button>
              </a>
              <p className="mt-4 text-xs md:text-sm font-semibold text-slate-500 tracking-wide">
                Acceso inmediato • Más de 750 recetas • Garantía de 30 días
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 3. Intro/Story */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8 text-center">¿Te suena familiar esta escena?</h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            <p>
              Son las 6:30 PM. Llegas del trabajo agotada, los niños tienen hambre y gritan "¿qué hay de cena?", abres el refrigerador y... <strong className="text-slate-900">no tienes ni idea qué cocinar.</strong>
            </p>
            <p>
              Terminas pidiendo pizza otra vez, sintiéndote culpable porque sabes que tu familia merece algo mejor.
            </p>
            <div className="bg-slate-50 p-8 rounded-2xl border-l-4 border-brand-orange my-12">
              <p className="text-2xl font-bold text-slate-900 mb-2">
                Si has vivido esto, no estás sola.
              </p>
              <p className="text-xl">
                <strong className="text-brand-orange">El 89% de las madres trabajadoras</strong> luchan diariamente con la misma pregunta: <span className="italic">"¿Cómo alimento sanamente a mi familia sin volverme loca en el intento?"</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. UVP */}
      <Section className="bg-brand-green-light/30">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-6">Presentamos el Sistema de Alimentación Familiar Saludable:</h2>
          <p className="text-xl text-slate-600">
            El único método que combina <strong className="text-brand-green">750+ recetas probadas</strong> con un <strong className="text-brand-green">sistema de planificación semanal</strong> que elimina para siempre la pregunta "¿qué cocino hoy?"
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { text: "Sin culpas por dar comida poco saludable", icon: <CheckCircle2 className="text-brand-green" /> },
            { text: "Sin estrés por no saber qué preparar", icon: <CheckCircle2 className="text-brand-green" /> },
            { text: "Sin berrinches porque a los niños les encantarán", icon: <CheckCircle2 className="text-brand-green" /> },
            { text: "Sin gastar fortunas en ingredientes raros", icon: <CheckCircle2 className="text-brand-green" /> }
          ].map((item, i) => (
            <Card key={i} className="flex flex-col items-center text-center gap-4 border-brand-green/20 bg-white/80 backdrop-blur">
              <div className="p-3 bg-brand-green-light rounded-full">
                {item.icon}
              </div>
              <p className="font-bold text-lg">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ¿Cómo funciona el sistema? */}
      <Section className="bg-gradient-to-b from-white to-pink-50/20 border-b border-slate-100 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange uppercase tracking-widest text-xs font-black bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-4 inline-block">
            Paso a Paso
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2 mb-4 leading-tight">
            ¿Cómo funciona el sistema?
          </h2>
          <p className="text-lg text-slate-600">
            Un método diseñado para encajar en el día a día de una mamá ocupada, sin complicaciones ni teorías difíciles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {[
            {
              step: "01",
              title: "Elegí recetas organizadas",
              desc: "Desayunos, almuerzos, cenas y snacks fáciles para cada momento del día.",
              icon: <Utensils className="w-8 h-8 text-rose-500" />,
              color: "bg-rose-50 border-rose-100 text-rose-600",
              numberColor: "text-rose-100",
              glow: "shadow-rose-100/50"
            },
            {
              step: "02",
              title: "Planificá tu semana en minutos",
              desc: "Usá el sistema para dejar de improvisar comidas todos los días.",
              icon: <Calendar className="w-8 h-8 text-orange-500" />,
              color: "bg-orange-50 border-orange-100 text-orange-600",
              numberColor: "text-orange-100",
              glow: "shadow-orange-100/50"
            },
            {
              step: "03",
              title: "Ahorrá tiempo y reducÍ el estrés",
              desc: "Tené comidas saludables listas para toda la familia sin complicarte.",
              icon: <Clock className="w-8 h-8 text-emerald-500" />,
              color: "bg-emerald-50 border-emerald-100 text-emerald-600",
              numberColor: "text-emerald-100",
              glow: "shadow-emerald-100/50"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={cn(
                "relative bg-white rounded-3xl p-8 border border-slate-100/80 shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center",
                item.glow
              )}
            >
              {/* Huge background number */}
              <div className={cn("absolute top-4 right-6 font-black text-6xl select-none pointer-events-none opacity-40 font-mono tracking-tight", item.numberColor)}>
                {item.step}
              </div>

              {/* Icon Container */}
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border shadow-inner", item.color)}>
                {item.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. Bullets de Beneficios */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8 text-center">Con este sistema conseguirás:</h2>
          <ul className="space-y-6">
            {[
              { title: "Menús planificados en 30 min", desc: "Nunca más te preguntarás ¿qué cocino hoy?", icon: <Calendar className="w-8 h-8 text-brand-green" /> },
              { title: "Comidas que TODA la familia disfrutará", desc: "Incluso los niños más exigentes amarán estas recetas.", icon: <Users className="w-8 h-8 text-brand-green" /> },
              { title: "Recetas de 15-30 minutos máximo", desc: "Perfectas para el ritmo de vida de las madres ocupadas.", icon: <Clock className="w-8 h-8 text-brand-green" /> },
              { title: "Nutrición balanceada automática", desc: "Sin tener que calcular nada, nosotros lo hicimos por ti.", icon: <Leaf className="w-8 h-8 text-brand-green" /> },
              { title: "Ahorro real en el supermercado", desc: "Listas de compras optimizadas para evitar desperdicios.", icon: <Zap className="w-8 h-8 text-brand-green" /> },
              { title: "Cero estrés mental", desc: "El sistema decide por ti qué cocinar cada día.", icon: <Brain className="w-8 h-8 text-brand-green" /> }
            ].map((item, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 6. Prueba Social */}
      <Section className="bg-slate-900 text-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-4">Ya han confiado en nosotros:</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8">
            <div className="text-center max-w-xs">
              <p className="text-4xl md:text-5xl font-black text-brand-green">+300</p>
              <p className="text-slate-400 uppercase tracking-widest text-sm font-bold mt-2 leading-tight">Familias ya están usando este sistema para organizar sus comidas sin estrés</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-brand-green">4.7/5</p>
              <div className="flex justify-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />)}
              </div>
              <p className="text-slate-400 uppercase tracking-widest text-sm font-bold mt-2">Satisfacción</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-brand-green">+80</p>
              <p className="text-slate-400 uppercase tracking-widest text-sm font-bold mt-2">Testimonios</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { 
              text: "Gracias a estas recetas, mis hijos ahora me piden brócoli en lugar de papas fritas. ¡No lo podía creer!", 
              author: "María González", 
              role: "Madre de 3 niños",
              img: "https://i.imgur.com/h1DzofW.png"
            },
            { 
              text: "En 2 meses he ahorrado más de $200 en comida chatarra. Las recetas son deliciosas y súper fáciles.", 
              author: "Carmen Rodríguez", 
              role: "Mamá trabajadora",
              img: "https://i.imgur.com/LEVGZai.png"
            },
            { 
              text: "Antes era un estrés pensar qué cocinar todos los días y mis hijos rechazaban todo. Con este sistema me organicé y ahora comen mucho mejor sin pelear.", 
              author: "Laura", 
              role: "Mamá de 2",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
            },
            { 
              text: "Trabajo todo el día y no tenía tiempo para planificar comidas. Esto me simplificó muchísimo la vida, ya no improviso más y todo es más rápido.", 
              author: "Sofía", 
              role: "Madre ocupada",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            }
          ].map((item, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700 text-white p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />)}
              </div>
              <p className="text-xl italic mb-8 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.author} className="w-12 h-12 rounded-full border-2 border-brand-green" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold">{item.author}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7. Garantía */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto bg-brand-green-light/50 rounded-[2rem] p-8 md:p-16 text-center border-2 border-dashed border-brand-green relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="w-48 h-48 text-brand-green" />
          </div>
          <ShieldCheck className="w-20 h-20 text-brand-green mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl mb-6">GARANTÍA DE SATISFACCIÓN TOTAL - 30 DÍAS</h2>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            Si después de implementar nuestro sistema no ves una mejora radical en la alimentación de tu familia, te devolvemos cada centavo. Sin preguntas.
          </p>
          <p className="text-2xl font-black text-brand-dark">
            Así de seguros estamos de que esto funcionará para ti.
          </p>
        </div>
      </Section>

      {/* 8. Para quién NO es */}
      <Section className="bg-gradient-to-b from-slate-50 to-white/20">
        <div className="max-w-3xl mx-auto bg-rose-50/40 border border-rose-100/60 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-rose-100/10">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center text-center sm:text-left">
            <XCircle className="w-12 h-12 text-rose-500 shrink-0" />
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
              IMPORTANTE: Este sistema <span className="text-rose-600">NO es para ti</span> si:
            </h2>
          </div>
          <ul className="space-y-4 mb-10">
            {[
              "Esperas que los cambios sean mágicos sin implementar las recetas.",
              "No tienes 15 o 30 minutos a la semana para mirar las guías y planificar tu menú.",
              "Buscas recetas de alta cocina de autor con ingredientes costosos o difíciles de conseguir.",
              "No tienes el deseo sincero de probar cosas nuevas para regalarle tranquilidad a tu familia."
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-rose-100/20 shadow-sm transition-transform hover:-translate-x-1 duration-200">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                <span className="text-base md:text-lg font-semibold text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-amber-100/50 border border-amber-200/60 p-5 rounded-2xl text-center">
            <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed">
              👉 Si buscas resultados reales, ahorrar cientos de horas de cocina y alimentar a tus hijos sin peleas con un método simple... <strong className="text-brand-orange">Sigue leyendo.</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* 9. Entregables Principales */}
      <Section id="entregables">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl mb-4">📚 LO QUE RECIBES HOY:</h2>
          <p className="text-xl text-slate-500">Un ecosistema completo diseñado para tu éxito</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "La Biblia de la Cocina Saludable Familiar", 
              desc: "750+ recetas categorizadas por desayunos, almuerzos, cenas y snacks. Incluye tiempos y tips para niños.", 
              image: "https://i.imgur.com/yMPVzhg.jpeg",
              color: "bg-emerald-500"
            },
            { 
              title: "Mañanas Nutritivas: Manual de Desayunos", 
              desc: "135 recetas de desayunos que se preparan en menos de 15 minutos. ¡Energía pura para el día!", 
              image: "https://i.imgur.com/PO8gJCm.png",
              color: "bg-amber-500"
            },
            { 
              title: "Mediodías Perfectos: Almuerzos Balanceados", 
              desc: "226 recetas para almuerzos nutritivos. Incluye opciones para llevar al trabajo y fin de semana.", 
              image: "https://i.imgur.com/HiO8hd4.png",
              color: "bg-blue-500"
            },
            { 
              title: "Noches Ligeras: Cenas Sin Complicaciones", 
              desc: "60 recetas de cenas ligeras pero satisfactorias. Perfectas para terminar el día sin pesadez.", 
              image: "https://i.imgur.com/Pbcaslj.png",
              color: "bg-indigo-500"
            },
            { 
              title: "Poder Verde: Batidos y Smoothies", 
              desc: "100 recetas de batidos energizantes. ¡La manera más fácil de consumir vitaminas!", 
              icon: <Leaf className="w-10 h-10" />,
              color: "bg-green-500"
            },
            { 
              title: "Picoteos Inteligentes", 
              desc: "40 opciones de snacks saludables. Desde barritas caseras hasta dips nutritivos.", 
              icon: <Apple className="w-10 h-10" />,
              color: "bg-orange-500"
            }
          ].map((item, i) => (
            <Card key={i} className="flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 overflow-hidden p-0">
              {item.image ? (
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ) : (
                <div className="p-6 pb-0">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", item.color)}>
                    {item.icon}
                  </div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-4 group-hover:text-brand-green transition-colors">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </Card>
          ))}
          <Card className="md:col-span-2 lg:col-span-3 bg-brand-dark text-white flex flex-col md:flex-row items-center gap-8 p-10">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shrink-0">
              <Calendar className="w-12 h-12 text-brand-green" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">El Organizador Semanal de Peso Ideal</h3>
              <p className="text-slate-300 text-lg">Sistema de planificación paso a paso para organizar tus menús semanales en solo 30 minutos cada domingo. ¡El cerebro de tu cocina!</p>
            </div>
          </Card>
        </div>
      </Section>

      {/* 10. Bonos Exclusivos */}
      <Section className="bg-brand-green-light/20 relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-bounce">
            <Gift className="w-4 h-4" /> SOLO POR TIEMPO LIMITADO
          </div>
          <h2 className="text-4xl md:text-6xl mb-4">🎁 BONOS ESPECIALES</h2>
          <p className="text-xl text-slate-600">Llévate todo esto GRATIS si actúas ahora</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Mini Chef Saludable", 
              value: "$29 USD", 
              desc: "55 meriendas que tus hijos amarán. Diseñadas para paladares exigentes.",
              icon: <Utensils className="w-8 h-8" />
            },
            { 
              title: "Mamá Zen: Bienestar Sin Tiempo", 
              value: "$19 USD", 
              desc: "Guía de autocuidado. 15 técnicas de relajación y smoothies energizantes.",
              icon: <Zap className="w-8 h-8" />
            },
            { 
              title: "Barras Caseras de Energía Natural", 
              value: "$15 USD", 
              desc: "11 recetas de barras energéticas caseras. Ahorra dinero y come natural.",
              icon: <Apple className="w-8 h-8" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border-4 border-amber-400 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-amber-400 text-white px-6 py-2 font-black rounded-bl-2xl">
                GRATIS
              </div>
              <div className="text-amber-500 mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 font-bold mb-4">Valor: {item.value}</p>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 11. Ancla de Valor */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8 text-center">💰 ANÁLISIS DE VALOR REAL:</h2>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 space-y-4">
              {[
                { name: "Biblia de Cocina Saludable", price: "$25 USD" },
                { name: "Manual de Desayunos", price: "$7 USD" },
                { name: "Guía de Almuerzos", price: "$10 USD" },
                { name: "Recetas de Cenas", price: "$5 USD" },
                { name: "Batidos y Smoothies", price: "$5 USD" },
                { name: "Snacks Saludables", price: "$5 USD" },
                { name: "Organizador Semanal", price: "$5 USD" },
                { name: "Bonos adicionales", price: "$5 USD", highlight: true }
              ].map((item, i) => (
                <div key={i} className={cn("flex justify-between items-center py-2 border-b border-slate-50 last:border-0", item.highlight && "text-brand-orange font-bold")}>
                  <span>{item.name}</span>
                  <span className="font-mono">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 text-white p-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <span className="text-2xl font-bold block">VALOR TOTAL:</span>
                <span className="text-brand-orange font-bold">¡Ahorras más del 85% hoy!</span>
              </div>
              <span className="text-4xl font-black text-brand-orange">$67 USD</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 12. CTA #1 */}
      <Section className="bg-brand-green py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl mb-4">🔥 OFERTA ESPECIAL DE LANZAMIENTO:</h2>
          <p className="text-2xl mb-12 opacity-90">TODO EL SISTEMA COMPLETO POR SOLO:</p>
          
          <div className="mb-12">
            <span className="text-8xl md:text-9xl font-black block mb-2">$9.79 USD</span>
            <span className="text-2xl line-through opacity-50">$67.00 USD</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 text-left max-w-2xl mx-auto">
            {[
              "750+ Recetas Saludables",
              "7 Guías Especializadas",
              "3 Bonos Exclusivos",
              "Sistema de Planificación",
              "30 Días de Garantía"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                {item}
              </div>
            ))}
          </div>

          <div className="mb-12 max-w-lg mx-auto bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />)}
            </div>
            <p className="text-lg italic mb-6">"Gastaba mucho en comida hecha porque no sabía qué preparar. Ahora tengo opciones fáciles y ahorro un montón. Además, a mis hijos les gusta."</p>
            <div className="flex items-center justify-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
                alt="Mariana" 
                className="w-10 h-10 rounded-full border-2 border-brand-orange"
                referrerPolicy="no-referrer"
              />
              <p className="font-bold">Mariana</p>
            </div>
          </div>

          <a 
            href="https://pay.hotmart.com/A104943855R" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full md:w-auto mx-auto"
            onClick={() => {
              if (window.fbq) window.fbq('track', 'InitiateCheckout', { content_name: 'Sistema Alimentación Familiar', value: 9.79, currency: 'USD' });
            }}
          >
            <Button variant="secondary" size="xl" className="w-full group">
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              SÍ, QUIERO ALIMENTAR MEJOR A MI FAMILIA
            </Button>
          </a>
          
          <p className="mt-8 text-lg font-medium opacity-80">
            💡 Pago único - Acceso inmediato - Sin mensualidades
          </p>
        </div>
      </Section>

      {/* 13. FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-12 text-center">❓ PREGUNTAS FRECUENTES:</h2>
          <div className="space-y-2">
            {[
              { 
                q: "¿Las recetas son realmente fáciles de hacer?", 
                a: "Sí, todas las recetas están diseñadas para completarse en 30 minutos o menos, con ingredientes que encuentras en cualquier supermercado común." 
              },
              { 
                q: "¿Qué pasa si mis hijos son muy exigentes?", 
                a: "El sistema incluye técnicas probadas para hacer que los niños prueben nuevos alimentos, además del bono 'Mini Chef Saludable' con 55 recetas diseñadas especialmente para paladares infantiles." 
              },
              { 
                q: "¿Necesito ingredientes especiales o caros?", 
                a: "No. Todas las recetas usan ingredientes accesibles y económicos que encuentras en cualquier tienda de barrio o supermercado." 
              },
              { 
                q: "¿Cómo recibo el material?", 
                a: "Inmediatamente después de tu compra recibes acceso a una plataforma digital donde puedes descargar todo el contenido en formato PDF de alta calidad." 
              },
              { 
                q: "¿Hay algún costo adicional?", 
                a: "No. Es un pago único de $9.79 y tienes acceso de por vida a todo el contenido y futuras actualizaciones." 
              }
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* 14. Urgencia/Escasez */}
      <Section className="bg-brand-orange/10 border-y border-brand-orange/20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl mb-8 text-brand-dark">⚠️ IMPORTANTE - OFERTA POR TIEMPO LIMITADO:</h2>
          <p className="text-xl mb-8 font-bold text-slate-700">Esta oferta especial termina en:</p>
          <Countdown />
          <div className="mt-12 space-y-4">
            <p className="text-xl">Después de este tiempo, el precio volverá a su valor normal de <strong className="text-red-600">$67 USD</strong>.</p>
            <div className="inline-block bg-white px-6 py-3 rounded-full shadow-sm border border-brand-orange/30">
              <p className="text-brand-orange font-black">🔥 Solo quedan 147 copias disponibles de esta oferta</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 15. CTA #2 */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-8 leading-tight">
            No dejes que el estrés de "¿qué cocino hoy?" siga robándote la paz mental.
          </h2>
          <div className="space-y-4 mb-12">
            <p className="text-2xl text-slate-600">Tu familia merece comidas saludables y deliciosas.</p>
            <p className="text-2xl font-black text-brand-green">Tú mereces tranquilidad y tiempo libre.</p>
          </div>
          <a 
            href="https://pay.hotmart.com/A104943855R" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full md:w-auto mx-auto"
            onClick={() => {
              if (window.fbq) window.fbq('track', 'InitiateCheckout', { content_name: 'Sistema Alimentación Familiar', value: 9.79, currency: 'USD' });
            }}
          >
            <Button variant="primary" size="xl" className="w-full">
              QUIERO MI SISTEMA COMPLETO AHORA
            </Button>
          </a>
          <div className="mt-8 flex items-center justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-bold">Acceso inmediato</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 16. Deep Dive */}
      <Section className="bg-slate-900 text-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://i.imgur.com/SFrPmtU.png" 
              alt="Resultado del sistema" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl mb-8">🔍 LA CIENCIA DETRÁS DEL SISTEMA:</h2>
            <h3 className="text-2xl font-bold text-brand-green mb-6">¿Por qué funciona este método cuando otros fallan?</h3>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                La mayoría de las madres fracasan no por falta de voluntad, sino por <strong className="text-white">fatiga de decisión</strong>. Nuestro cerebro toma más de 35,000 decisiones al día, y al llegar la noche, simplemente no tenemos energía mental para decidir qué cocinar.
              </p>
              <p className="text-xl font-bold text-white">Nuestro Sistema elimina esa carga mental:</p>
              <ul className="space-y-4">
                {[
                  { text: "Pre-decide por ti qué cocinar cada día", icon: <Brain className="text-brand-green" /> },
                  { text: "Organiza automáticamente las listas de compras", icon: <CheckCircle2 className="text-brand-green" /> },
                  { text: "Simplifica la preparación con pasos claros", icon: <Zap className="text-brand-green" /> },
                  { text: "Considera los gustos de todos en la familia", icon: <Users className="text-brand-green" /> }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <div className="shrink-0">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
                <p className="text-brand-green font-bold text-2xl mb-2">Resultado:</p>
                <p className="text-xl">Comes mejor, gastas menos tiempo y reduces el estrés diario en un <span className="text-brand-orange font-black">80%</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 17. CTA Final + Close */}
      <Section className="bg-gradient-to-b from-white to-brand-green-light/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl mb-12">🌟 TU DECISIÓN DE HOY CAMBIA EL FUTURO DE TU FAMILIA</h2>
          
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border-t-8 border-brand-green relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-green text-white px-8 py-2 rounded-full font-black text-sm tracking-widest uppercase shadow-lg">
              ÚLTIMAS 24 HORAS
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Imagínate dentro de 30 días:</h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
              {[
                "Despiertas sabiendo qué vas a cocinar",
                "Tus hijos piden 'más verduras'",
                "Ahorras 2+ horas semanales",
                "Familia más sana y energética",
                "Más tiempo para ti misma"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <p className="text-slate-400 text-xl line-through mb-2">$67.00 USD</p>
              <p className="text-7xl md:text-8xl font-black text-brand-dark mb-2">Solo $9.79 USD</p>
              <p className="text-brand-orange font-bold text-xl">¡Ahorras más del 85% hoy!</p>
            </div>

            <a 
              href="https://pay.hotmart.com/A104943855R" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
              onClick={() => {
                if (window.fbq) window.fbq('track', 'InitiateCheckout', { content_name: 'Sistema Alimentación Familiar', value: 9.79, currency: 'USD' });
              }}
            >
              <Button variant="secondary" size="xl" className="w-full group">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                ACCESO INMEDIATO - CLIC AQUÍ
              </Button>
            </a>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-slate-100">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-brand-green" />
                <span className="text-xs font-bold text-slate-500 uppercase">Garantía 30 días</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Smartphone className="w-8 h-8 text-brand-green" />
                <span className="text-xs font-bold text-slate-500 uppercase">Multi-dispositivo</span>
              </div>
              <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
                <Zap className="w-8 h-8 text-brand-green" />
                <span className="text-xs font-bold text-slate-500 uppercase">Actualizaciones de por vida</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100">
        <p>© {new Date().getFullYear()} Sistema de Alimentación Familiar Saludable. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-brand-green">Términos y Condiciones</a>
          <a href="#" className="hover:text-brand-green">Política de Privacidad</a>
          <a href="#" className="hover:text-brand-green">Contacto</a>
        </div>
      </footer>
    </div>
  );
}
