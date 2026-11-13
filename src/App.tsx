import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProjectLightbox } from './components/ProjectLightbox';
import { StudioLoader } from './components/StudioLoader';
import { StudioMediaManager } from './components/StudioMediaManager';
import {
  PageId,
  PORTFOLIO_PROJECTS,
  PortfolioCategory,
  PortfolioFilter,
  PortfolioProject,
  SERVICES_LIST,
} from './data/studioData';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { OurWorksPage } from './pages/OurWorksPage';
import { ServicesPage } from './pages/ServicesPage';
import {
  loadStudioMediaState,
  saveStudioMediaState,
  StudioMediaState,
} from './utils/mediaStorage';

const DEFAULT_HERO_IMAGE = '/assets/aistudio/image_f9722c69.png';

function getPageFromHash(): PageId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'services' || hash === 'works' || hash === 'contact' || hash === 'home') {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [activePortfolioCategory, setActivePortfolioCategory] =
    useState<PortfolioFilter>('All Works');
  const [preselectedService, setPreselectedService] = useState<string>(
    SERVICES_LIST[0].title
  );
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(
    null
  );
  const [mediaManagerOpen, setMediaManagerOpen] = useState(false);
  const [mediaState, setMediaState] = useState<StudioMediaState>({
    projectOverrides: {},
    customProjects: [],
  });

  useEffect(() => {
    let mounted = true;
    loadStudioMediaState().then((loaded) => {
      if (mounted) {
        setMediaState(loaded);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateMediaState = useCallback((next: StudioMediaState) => {
    setMediaState(next);
    void saveStudioMediaState(next);
  }, []);

  const activeHeroImage = mediaState.heroImage || DEFAULT_HERO_IMAGE;

  const activeProjects = useMemo<PortfolioProject[]>(() => {
    const updatedDefaults = PORTFOLIO_PROJECTS.map((project) => ({
      ...project,
      ...mediaState.projectOverrides[project.id],
    }));
    return [...mediaState.customProjects, ...updatedDefaults];
  }, [mediaState]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEnquireService = useCallback(
    (serviceTitle: string) => {
      setPreselectedService(serviceTitle);
      setLightboxProject(null);
      navigateTo('contact');
    },
    [navigateTo]
  );

  const handleViewCategoryWork = useCallback(
    (category: PortfolioCategory) => {
      setActivePortfolioCategory(category);
      navigateTo('works');
    },
    [navigateTo]
  );

  const visibleLightboxPool =
    currentPage === 'works' && activePortfolioCategory !== 'All Works'
      ? activeProjects.filter((p) => p.category === activePortfolioCategory)
      : activeProjects;

  const handlePrevProject = useCallback(() => {
    if (!lightboxProject || visibleLightboxPool.length <= 1) return;
    const idx = visibleLightboxPool.findIndex((p) => p.id === lightboxProject.id);
    const prevIdx = (idx - 1 + visibleLightboxPool.length) % visibleLightboxPool.length;
    setLightboxProject(visibleLightboxPool[prevIdx]);
  }, [lightboxProject, visibleLightboxPool]);

  const handleNextProject = useCallback(() => {
    if (!lightboxProject || visibleLightboxPool.length <= 1) return;
    const idx = visibleLightboxPool.findIndex((p) => p.id === lightboxProject.id);
    const nextIdx = (idx + 1) % visibleLightboxPool.length;
    setLightboxProject(visibleLightboxPool[nextIdx]);
  }, [lightboxProject, visibleLightboxPool]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#0D1E54]">
        <StudioLoader />

        <Navbar currentPage={currentPage} onNavigate={navigateTo} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && (
                <HomePage
                  heroImage={activeHeroImage}
                  projects={activeProjects}
                  onNavigate={navigateTo}
                  onOpenProject={setLightboxProject}
                  onEnquireService={handleEnquireService}
                />
              )}

              {currentPage === 'services' && (
                <ServicesPage
                  onEnquireService={handleEnquireService}
                  onViewCategoryWork={handleViewCategoryWork}
                />
              )}

              {currentPage === 'works' && (
                <OurWorksPage
                  projects={activeProjects}
                  activeCategory={activePortfolioCategory}
                  onSelectCategory={setActivePortfolioCategory}
                  onOpenProject={setLightboxProject}
                  onStartProject={() => navigateTo('contact')}
                  onOpenMediaManager={() => setMediaManagerOpen(true)}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage preselectedService={preselectedService} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          onNavigate={navigateTo}
          onOpenMediaManager={() => setMediaManagerOpen(true)}
        />

        <ProjectLightbox
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          onEnquire={handleEnquireService}
          hasMultiple={visibleLightboxPool.length > 1}
        />

        <StudioMediaManager
          isOpen={mediaManagerOpen}
          onClose={() => setMediaManagerOpen(false)}
          defaultHeroImage={DEFAULT_HERO_IMAGE}
          mediaState={mediaState}
          onUpdateMediaState={handleUpdateMediaState}
        />
      </div>
    </MotionConfig>
  );
}
