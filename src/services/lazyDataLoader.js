/**
 * Lazy Data Loader
 * ─────────────────────────────────────────────────────────
 * Dynamically imports mock data only when needed to reduce
 * initial bundle size and improve load time
 *
 * Usage:
 *   const data = await lazyLoadData('tournaments');
 *   const blogs = await lazyLoadData('blogs');
 */

const dataModules = {
    tournaments: () => import('@/shared/data/tournamentData'),
    blogs: () => import('@/shared/data/blogData'),
    games: () => import('@/shared/data/gamesData'),
    community: () => import('@/shared/data/communityData'),
    profile: () => import('@/shared/data/profileData'),
    skills: () => import('@/shared/data/profileSkillData'),
    skillTaxonomy: () => import('@/shared/data/skillTaxonomy'),
    notifications: () => import('@/shared/data/notificationsData'),
    messages: () => import('@/shared/data/messagesData'),
    images: () => import('@/shared/data/images'),
};

// Cache loaded modules
const cache = {};

/**
 * Lazy load data module by name
 * @param {string} moduleName - Name of the data module
 * @param {string} exportName - (Optional) Specific export to retrieve
 * @returns {Promise<any>} - The loaded data or module
 */
export async function lazyLoadData(moduleName, exportName = null) {
    if (!dataModules[moduleName]) {
        throw new Error(`Unknown data module: ${moduleName}`);
    }

    // Return from cache if available
    if (cache[moduleName]) {
        return exportName ? cache[moduleName][exportName] : cache[moduleName];
    }

    // Load module dynamically
    const module = await dataModules[moduleName]();
    cache[moduleName] = module;

    return exportName ? module[exportName] : module;
}

/**
 * Preload data modules (call during app initialization if needed)
 * @param {string[]} moduleNames - Array of module names to preload
 */
export async function preloadData(moduleNames = []) {
    const loadPromises = moduleNames.map(name => lazyLoadData(name).catch(err => {
        console.warn(`Failed to preload ${name}:`, err);
    }));
    await Promise.all(loadPromises);
}

export default lazyLoadData;
