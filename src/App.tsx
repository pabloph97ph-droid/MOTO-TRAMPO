// src/App.tsx
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DigitalCardShowcase } from './components/DigitalCardShowcase';
import { PositioningSection } from './components/PositioningSection';
import { ProximitySection } from './components/ProximitySection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { EnterpriseSection } from './components/EnterpriseSection';
import { QuizWizard } from './components/QuizWizard';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { TechLightningIntro } from './components/TechLightningIntro';
import { QuizAnswers, Lead } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [quizInitialAnswers, setQuizInitialAnswers] = useState<Partial<QuizAnswers>>({});
  const quizSectionRef = useRef<HTMLDivElement>(null);
  const cardSectionRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = (prefillAnswers?: Partial<QuizAnswers>) => {
    if (prefillAnswers) {
      setQuizInitialAnswers(prefillAnswers);
    }
    if (quizSectionRef.current) {
      quizSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCardShowcase = () => {
    if (cardSectionRef.current) {
      cardSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLeadCreated = (lead: Lead) => {
    console.log('Lead registrado com sucesso na Rota Segura:', lead);
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* 2-Stage High-Tech Lightning Intro Overlay */}
      {showIntro && (
        <TechLightningIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Top Sticky Header */}
      <Header
        isAdminOpen={isAdminOpen}
        onOpenAdmin={() => setIsAdminOpen(prev => !prev)}
        onStartQuiz={() => scrollToQuiz()}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero / Primeira Tela */}
        <Hero
          onStartQuiz={() => scrollToQuiz()}
          onLearnMore={scrollToCardShowcase}
        />

        {/* 2. Cartão Oficial Digital (Frente & Verso da foto) */}
        <div ref={cardSectionRef}>
          <DigitalCardShowcase onStartQuiz={() => scrollToQuiz()} />
        </div>

        {/* 3. Bloco de Posicionamento */}
        <PositioningSection onStartQuiz={() => scrollToQuiz()} />

        {/* 4. Explicação sobre Proximidade */}
        <ProximitySection />

        {/* 5. Diferenciais Estruturados */}
        <DifferentialsSection />

        {/* 6. Bloco para Empresas */}
        <EnterpriseSection
          onStartEnterpriseQuiz={() =>
            scrollToQuiz({
              tipoCliente: 'Empresa',
              necessidade: 'Estou procurando um parceiro logístico',
              interesseContrato: 'Sim, quero conhecer'
            })
          }
        />

        {/* 7. Quiz / Diagnóstico & Captação de Leads */}
        <section
          id="quiz-section"
          ref={quizSectionRef}
          className="py-16 sm:py-24 bg-[#070B14] border-b border-slate-800/80 relative"
        >
          {/* Header of Quiz Section */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Diagnóstico Rápido</span>
            </span>

            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white">
              Vamos entender sua necessidade em menos de 2 minutos.
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Responda algumas perguntas rápidas para receber um direcionamento sob medida direto no WhatsApp da Rota Segura.
            </p>
          </div>

          {/* Interactive Quiz Component */}
          <QuizWizard
            initialAnswers={quizInitialAnswers}
            onLeadCreated={handleLeadCreated}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onStartQuiz={() => scrollToQuiz()}
      />

      {/* Floating Bottom Bar on Mobile */}
      <FloatingMobileBar
        onStartQuiz={() => scrollToQuiz()}
        isVisible={!isAdminOpen && !showIntro}
      />

      {/* Admin Dashboard Overlay */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
