import { ChangeEvent, useEffect, useState } from 'react';
import { Plus, RotateCcw, Trash2, Upload, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  PortfolioCategory,
  PortfolioProject,
  SERVICES_LIST,
} from '../data/studioData';
import {
  readImageFileAsDataUrl,
  StudioMediaState,
} from '../utils/mediaStorage';
import { ResilientImage } from './ResilientImage';

interface StudioMediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultHeroImage: string;
  mediaState: StudioMediaState;
  onUpdateMediaState: (next: StudioMediaState) => void;
}

const CATEGORIES_ONLY = PORTFOLIO_CATEGORIES.filter(
  (c): c is PortfolioCategory => c !== 'All Works'
);

export function StudioMediaManager({
  isOpen,
  onClose,
  defaultHeroImage,
  mediaState,
  onUpdateMediaState,
}: StudioMediaManagerProps) {
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Add project form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PortfolioCategory>(CATEGORIES_ONLY[0]);
  const [newClient, setNewClient] = useState('');
  const [newFormat, setNewFormat] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageData, setNewImageData] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const notify = (msg: string) => {
    setStatusMessage(msg);
    window.setTimeout(() => setStatusMessage(''), 2600);
  };

  const handleHeroUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      onUpdateMediaState({
        ...mediaState,
        heroImage: dataUrl,
      });
      notify('Hero image updated.');
    } catch {
      notify('Could not read the selected image file.');
    } finally {
      e.target.value = '';
    }
  };

  const handleResetHero = () => {
    onUpdateMediaState({
      ...mediaState,
      heroImage: undefined,
    });
    notify('Hero image restored to studio default.');
  };

  const handleProjectImageUpload = async (
    projectId: string,
    isCustom: boolean,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      if (isCustom) {
        onUpdateMediaState({
          ...mediaState,
          customProjects: mediaState.customProjects.map((p) =>
            p.id === projectId ? { ...p, image: dataUrl } : p
          ),
        });
      } else {
        onUpdateMediaState({
          ...mediaState,
          projectOverrides: {
            ...mediaState.projectOverrides,
            [projectId]: {
              ...mediaState.projectOverrides[projectId],
              image: dataUrl,
            },
          },
        });
      }
      notify('Project image updated.');
    } catch {
      notify('Could not read the selected image file.');
    } finally {
      e.target.value = '';
    }
  };

  const handleProjectFieldChange = (
    projectId: string,
    isCustom: boolean,
    field: 'title' | 'client',
    value: string
  ) => {
    if (isCustom) {
      onUpdateMediaState({
        ...mediaState,
        customProjects: mediaState.customProjects.map((p) =>
          p.id === projectId ? { ...p, [field]: value } : p
        ),
      });
    } else {
      onUpdateMediaState({
        ...mediaState,
        projectOverrides: {
          ...mediaState.projectOverrides,
          [projectId]: {
            ...mediaState.projectOverrides[projectId],
            [field]: value,
          },
        },
      });
    }
  };

  const handleResetProject = (projectId: string) => {
    const nextOverrides = { ...mediaState.projectOverrides };
    delete nextOverrides[projectId];
    onUpdateMediaState({
      ...mediaState,
      projectOverrides: nextOverrides,
    });
    notify('Project restored to default.');
  };

  const handleDeleteCustomProject = (projectId: string) => {
    onUpdateMediaState({
      ...mediaState,
      customProjects: mediaState.customProjects.filter((p) => p.id !== projectId),
    });
    notify('Custom project removed.');
  };

  const handleNewProjectImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      setNewImageData(dataUrl);
    } catch {
      notify('Could not read the selected image file.');
    } finally {
      e.target.value = '';
    }
  };

  const handleCreateCustomProject = () => {
    if (!newTitle.trim() || !newImageData) {
      notify('Please add both a project title and an image.');
      return;
    }

    const matchedService =
      SERVICES_LIST.find((s) => s.portfolioCategory === newCategory)?.title ||
      SERVICES_LIST[0].title;

    const newProject: PortfolioProject = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      serviceMatch: matchedService,
      client: newClient.trim() || 'Pixel Nest Client',
      year: String(new Date().getFullYear()),
      format: newFormat.trim() || 'Studio Production',
      image: newImageData,
      aspectClass: 'aspect-[4/3]',
      featuredOnHome: false,
      description:
        newDescription.trim() ||
        'Custom creative showcase uploaded via Pixel Nest Studio Media Manager.',
      deliverables: ['Creative Direction', 'Final Master Delivery'],
    };

    onUpdateMediaState({
      ...mediaState,
      customProjects: [newProject, ...mediaState.customProjects],
    });

    setNewTitle('');
    setNewClient('');
    setNewFormat('');
    setNewDescription('');
    setNewImageData('');
    setShowAddForm(false);
    notify('New project added to Our Works.');
  };

  const handleResetAll = () => {
    onUpdateMediaState({
      heroImage: undefined,
      projectOverrides: {},
      customProjects: [],
    });
    notify('All studio images restored to defaults.');
  };

  const currentHero = mediaState.heroImage || defaultHeroImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="media-manager-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#091B5C]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-manager-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[88vh] bg-[#FAF6EE] text-[#0D1E54] rounded-2xl shadow-2xl border border-[#0D1E54]/15 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#0D1E54]/10 flex items-center justify-between gap-4 bg-white">
              <div>
                <h2
                  id="media-manager-title"
                  className="font-display text-xl sm:text-2xl font-bold text-[#0D1E54]"
                >
                  Studio Media Manager
                </h2>
                <p className="text-xs sm:text-sm text-[#0D1E54]/65 mt-0.5">
                  Upload your own photos to replace the Hero or Portfolio images, or add new works. Changes save automatically in this browser.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close media manager"
                className="w-10 h-10 rounded-xl border border-[#0D1E54]/15 flex items-center justify-center text-[#0D1E54] hover:bg-[#1438B8] hover:text-[#FAF6EE] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feedback Banner */}
            {statusMessage && (
              <div className="px-6 py-2.5 bg-[#1438B8] text-[#FAF6EE] text-xs sm:text-sm font-medium">
                {statusMessage}
              </div>
            )}

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Hero Image Slot */}
              <section className="bg-white rounded-2xl p-5 border border-[#0D1E54]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-28 h-18 rounded-xl overflow-hidden bg-[#091B5C] shrink-0 border border-[#0D1E54]/10">
                      <ResilientImage
                        src={currentHero}
                        alt="Hero showcase preview"
                        title="Hero Showcase"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#1438B8]">
                        Home Hero Visual
                      </span>
                      <h3 className="font-display text-base font-bold text-[#0D1E54]">
                        Main Studio Hero Banner
                      </h3>
                      <p className="text-xs text-[#0D1E54]/60 mt-0.5">
                        Recommended 16:9 landscape photo (JPG, PNG, or WebP).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {mediaState.heroImage && (
                      <button
                        type="button"
                        onClick={handleResetHero}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#0D1E54]/75 border border-[#0D1E54]/15 hover:border-[#1438B8] rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    )}
                    <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Hero Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </section>

              {/* Add New Portfolio Item Section */}
              <section>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0D1E54]">
                      Portfolio Works ({mediaState.customProjects.length + PORTFOLIO_PROJECTS.length})
                    </h3>
                    <p className="text-xs text-[#0D1E54]/65">
                      Replace any project image or edit its title and client name directly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddForm((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FAF6EE] bg-[#091B5C] hover:bg-[#1438B8] rounded-xl transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddForm ? 'Cancel' : 'Add New Work'}</span>
                  </button>
                </div>

                {showAddForm && (
                  <div className="mb-6 bg-white rounded-2xl p-5 border border-[#1438B8]/30 space-y-4">
                    <h4 className="font-display text-base font-bold text-[#0D1E54]">
                      Add Custom Portfolio Project
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#0D1E54]/75 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Horizon EV Launch Poster"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 focus:outline-none focus:border-[#1438B8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#0D1E54]/75 mb-1">
                          Category
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) =>
                            setNewCategory(e.target.value as PortfolioCategory)
                          }
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 focus:outline-none focus:border-[#1438B8]"
                        >
                          {CATEGORIES_ONLY.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#0D1E54]/75 mb-1">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={newClient}
                          onChange={(e) => setNewClient(e.target.value)}
                          placeholder="e.g. Horizon Mobility"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 focus:outline-none focus:border-[#1438B8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#0D1E54]/75 mb-1">
                          Format
                        </label>
                        <input
                          type="text"
                          value={newFormat}
                          onChange={(e) => setNewFormat(e.target.value)}
                          placeholder="e.g. 4K Reel & Print"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 focus:outline-none focus:border-[#1438B8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#0D1E54]/75 mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Brief note about the project..."
                        className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 focus:outline-none focus:border-[#1438B8]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1438B8] bg-[#DBEAFE] hover:bg-[#1438B8] hover:text-[#FAF6EE] rounded-xl cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{newImageData ? 'Change Selected Image' : 'Choose Image File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleNewProjectImageUpload}
                            className="sr-only"
                          />
                        </label>
                        {newImageData && (
                          <span className="text-xs font-medium text-[#1438B8]">
                            Image ready
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleCreateCustomProject}
                        className="px-5 py-2.5 text-xs font-semibold text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors"
                      >
                        Save Project to Portfolio
                      </button>
                    </div>
                  </div>
                )}

                {/* Existing + Custom Projects List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ...mediaState.customProjects.map((p) => ({
                      project: p,
                      isCustom: true,
                    })),
                    ...PORTFOLIO_PROJECTS.map((p) => ({
                      project: {
                        ...p,
                        ...mediaState.projectOverrides[p.id],
                      },
                      isCustom: false,
                    })),
                  ].map(({ project, isCustom }) => {
                    const hasOverride =
                      !isCustom && Boolean(mediaState.projectOverrides[project.id]);

                    return (
                      <div
                        key={project.id}
                        className="bg-white rounded-xl p-4 border border-[#0D1E54]/10 flex gap-4 items-start"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#091B5C] shrink-0 border border-[#0D1E54]/10">
                          <ResilientImage
                            src={project.image}
                            alt={project.title}
                            title={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="text-[11px] font-medium text-[#1438B8] truncate">
                            {project.category}
                          </div>

                          <input
                            type="text"
                            value={project.title}
                            aria-label={`Title for ${project.title}`}
                            onChange={(e) =>
                              handleProjectFieldChange(
                                project.id,
                                isCustom,
                                'title',
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 text-xs font-semibold text-[#0D1E54] bg-[#FAF6EE] border border-[#0D1E54]/12 rounded-lg focus:outline-none focus:border-[#1438B8]"
                          />

                          <input
                            type="text"
                            value={project.client}
                            aria-label={`Client for ${project.title}`}
                            onChange={(e) =>
                              handleProjectFieldChange(
                                project.id,
                                isCustom,
                                'client',
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1 text-[11px] text-[#0D1E54]/80 bg-[#FAF6EE] border border-[#0D1E54]/12 rounded-lg focus:outline-none focus:border-[#1438B8]"
                          />

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-lg cursor-pointer transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Replace Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleProjectImageUpload(project.id, isCustom, e)
                                }
                                className="sr-only"
                              />
                            </label>

                            {hasOverride && (
                              <button
                                type="button"
                                onClick={() => handleResetProject(project.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-[#0D1E54]/70 border border-[#0D1E54]/15 hover:border-[#1438B8] rounded-lg transition-colors"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Reset</span>
                              </button>
                            )}

                            {isCustom && (
                              <button
                                type="button"
                                onClick={() => handleDeleteCustomProject(project.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-[#991B1B] border border-[#DC2626]/25 hover:bg-[#FEF2F2] rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-[#0D1E54]/10 bg-white flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#0D1E54]/75 hover:text-[#1438B8] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore All Studio Defaults</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
