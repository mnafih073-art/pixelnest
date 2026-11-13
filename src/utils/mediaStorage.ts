import { PortfolioProject } from '../data/studioData';

const DB_NAME = 'pixel_nest_studio_media';
const DB_VERSION = 1;
const STORE_NAME = 'overrides';
const STATE_KEY = 'studio_media_state';

export interface StudioMediaState {
  heroImage?: string;
  projectOverrides: Record<string, Partial<PortfolioProject>>;
  customProjects: PortfolioProject[];
}

const DEFAULT_STATE: StudioMediaState = {
  projectOverrides: {},
  customProjects: [],
};

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB is unavailable'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
  });
}

export async function loadStudioMediaState(): Promise<StudioMediaState> {
  try {
    const db = await openDatabase();
    return await new Promise<StudioMediaState>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STATE_KEY);
      req.onsuccess = () => {
        const result = req.result as StudioMediaState | undefined;
        resolve(
          result
            ? {
                heroImage: result.heroImage,
                projectOverrides: result.projectOverrides || {},
                customProjects: result.customProjects || [],
              }
            : DEFAULT_STATE
        );
      };
      req.onerror = () => resolve(DEFAULT_STATE);
    });
  } catch {
    return DEFAULT_STATE;
  }
}

export async function saveStudioMediaState(state: StudioMediaState): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(state, STATE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore storage errors in private/restricted browsing modes
  }
}

export function readImageFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Could not read file as data URL'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('File read error'));
    reader.readAsDataURL(file);
  });
}
