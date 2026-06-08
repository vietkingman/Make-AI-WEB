import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { LanguageProvider } from '@/lib/language';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import Download from '@/pages/Download';
import Features from '@/pages/Features';
import Gameplay from '@/pages/Gameplay';
import Home from '@/pages/Home';
import Leaderboard from '@/pages/Leaderboard';
import Rewards from '@/pages/Rewards';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/gameplay', element: <Gameplay /> },
  { path: '/features', element: <Features /> },
  { path: '/leaderboard', element: <Leaderboard /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:slug', element: <BlogPost /> },
  { path: '/download', element: <Download /> },
  { path: '/rewards', element: <Rewards /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppShell() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col selection:bg-brand-blue/30 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Routes location={location}>
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>
  );
}
