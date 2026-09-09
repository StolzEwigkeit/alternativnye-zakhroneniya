import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Methods from '@/components/Methods';
import Comparison from '@/components/Comparison';
import History from '@/components/History';
import Legal from '@/components/Legal';
import Faq from '@/components/Faq';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import useVisitTracker from '@/hooks/useVisitTracker';

const SECTIONS = [
  { id: 'sposoby', title: 'Способы' },
  { id: 'sravnenie', title: 'Сравнение' },
  { id: 'istoriya', title: 'История' },
  { id: 'zakon', title: 'Закон' },
  { id: 'faq', title: 'Вопросы' },
  { id: 'blog', title: 'Блог' },
];

const Index = () => {
  useVisitTracker(SECTIONS);

  return (
    <div className="min-h-screen bg-background spine">
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Methods />
        <Comparison />
        <History />
        <Legal />
        <Faq />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
