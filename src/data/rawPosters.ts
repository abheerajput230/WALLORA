export interface RawPoster {
  id: string;
  filename: string;
  title: string;
  imageSrc: string;
  category: string;
  folder: string;
}

// Vite recursive asset glob: imports all images from raw_posters and ANY subfolder!
// (e.g. raw_posters/sports/..., raw_posters/anime/..., raw_posters/cars/..., etc.)
const rawImageModules = import.meta.glob<string>(
  [
    '../assets/raw_posters/*.{jfif,jpeg,jpg,png,webp,avif,svg}',
    '../assets/raw_posters/**/*.{jfif,jpeg,jpg,png,webp,avif,svg}',
  ],
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

// Format folder names into clean human-readable categories
export const formatCategoryName = (folder: string): string => {
  if (!folder) return 'General';
  const clean = folder.trim();
  const lower = clean.toLowerCase();

  // Smart friendly display names for all poster folders
  if (lower === 'gods' || lower === 'god' || lower === 'devotional') return 'Gods & Devotional';
  if (lower === 'sports' || lower === 'sport') return 'Sports';
  if (lower === 'cars' || lower === 'car') return 'Cars & Garage';
  if (lower === 'bikes' || lower === 'bike') return 'Bikes';
  if (lower === 'anime') return 'Anime';
  if (lower === 'marvel' || lower === 'avengers') return 'Marvel';
  if (lower === 'dc' || lower === 'batman') return 'DC Universe';
  if (lower === 'movie poster' || lower === 'movies' || lower === 'cinema') return 'Movies & Cinema';
  if (lower === 'cartoon' || lower === 'cartoons') return 'Cartoon & Toons';
  if (lower === 'india graphic' || lower === 'indian' || lower === 'desi') return 'India Graphic';
  if (lower === 'gym' || lower === 'fitness') return 'Gym & Fitness';
  if (lower === 'music' || lower === 'bands') return 'Music & Artists';
  if (lower === 'gaming' || lower === 'games') return 'Gaming';
  if (lower === 'quotes' || lower === 'typography') return 'Quotes & Typography';
  if (lower === 'vintage aesthetic' || lower === 'vintage' || lower === 'retro') return 'Vintage & Retro';
  if (lower === 'nature and travel' || lower === 'travel') return 'Nature & Travel';
  if (lower === 'others' || lower === 'other') return 'Aesthetic & Misc';

  // Capitalize every word nicely for any new folder created by user:
  // e.g. "gym motivation" -> "Gym Motivation", "aesthetic vibes" -> "Aesthetic Vibes"
  return clean
    .split(/[\s-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Fallback keyword classification for images sitting directly in the root folder
const detectCategoryFromKeywords = (filename: string, title: string): string => {
  const fn = filename.toLowerCase();
  const t = title.toLowerCase();

  if (
    fn.includes('porsche') ||
    fn.includes('defender') ||
    fn.includes('bmw') ||
    fn.includes('mercedes') ||
    fn.includes('rolls') ||
    fn.includes('aston') ||
    fn.includes('supra') ||
    fn.includes('car') ||
    t.includes('porsche') ||
    t.includes('bmw')
  ) {
    return 'Cars & Garage';
  }

  if (
    fn.includes('panigale') ||
    fn.includes('ducati') ||
    fn.includes('s1000rr') ||
    fn.includes('yamaha') ||
    fn.includes('gt 650') ||
    fn.includes('penigale') ||
    fn.includes('bike')
  ) {
    return 'Bikes';
  }

  if (
    fn.includes('krishna') ||
    fn.includes('mahadev') ||
    fn.includes('hanuman') ||
    fn.includes('vishnu') ||
    fn.includes('shyam') ||
    fn.includes('khatu') ||
    fn.includes('ram')
  ) {
    return 'Gods & Devotional';
  }

  if (
    fn.includes('itachi') ||
    fn.includes('solo') ||
    fn.includes('sukuna') ||
    fn.includes('kakashi') ||
    fn.includes('shinchan') ||
    fn.includes('anime')
  ) {
    return 'Anime';
  }

  if (
    fn.includes('virat') ||
    fn.includes('football') ||
    fn.includes('messi') ||
    fn.includes('cr7') ||
    fn.includes('neymar') ||
    fn.includes('sport') ||
    fn.includes('brave') ||
    fn.includes('quit')
  ) {
    return 'Sports';
  }

  if (
    fn.includes('spidy') ||
    fn.includes('venom') ||
    fn.includes('avenger') ||
    fn.includes('iron') ||
    fn.includes('hul') ||
    fn.includes('vakanda') ||
    fn.includes('batman') ||
    fn.includes('superman') ||
    t.includes('spider') ||
    t.includes('iron man')
  ) {
    return 'Superheroes';
  }

  return 'Movie & Cartoon';
};

// Retrieve all raw posters with dynamic folder & category detection
export const getRawPosters = (): RawPoster[] => {
  const posters: RawPoster[] = [];
  const seenIds = new Set<string>();

  for (const path in rawImageModules) {
    const imageSrc = rawImageModules[path];
    if (!imageSrc || typeof imageSrc !== 'string') continue;

    // Normalize slashes
    const normalized = path.replace(/\\/g, '/');

    // Extract relative subpath inside /raw_posters/
    const marker = '/raw_posters/';
    const markerIdx = normalized.lastIndexOf(marker);
    const relative = markerIdx !== -1 ? normalized.slice(markerIdx + marker.length) : normalized;

    const segments = relative.split('/');
    const filenameWithExt = segments.pop() || '';
    const folderName = segments.length > 0 ? segments[0].trim() : '';

    // Prevent duplicate entries if caught by multiple patterns
    const uniqueId = `raw-${folderName ? `${folderName}-` : ''}${filenameWithExt}`;
    if (seenIds.has(uniqueId)) continue;
    seenIds.add(uniqueId);

    // Clean up filename to readable title
    const nameWithoutExt = filenameWithExt
      .replace(/\.(jfif|jpeg|jpg|png|webp|avif|svg)+$/i, '')
      .replace(/\.(jfif|jpeg|jpg|png|webp|avif|svg)+$/i, '');

    let cleanTitle = nameWithoutExt
      .replace(/^[#_]+/, '')
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanTitle || cleanTitle.length < 2) {
      cleanTitle = 'Poster Art';
    } else {
      cleanTitle = cleanTitle.slice(0, 36);
    }

    // Dynamic category resolution:
    // If the image is inside a folder, that folder name determines the category!
    // Otherwise fallback to keyword detection for root files.
    const category = folderName
      ? formatCategoryName(folderName)
      : detectCategoryFromKeywords(filenameWithExt, cleanTitle);

    posters.push({
      id: uniqueId,
      filename: filenameWithExt,
      title: cleanTitle,
      imageSrc,
      category,
      folder: folderName,
    });
  }

  return posters;
};

// Dynamically extract all unique categories currently existing across folders
export const getRawCategories = (): string[] => {
  const all = getRawPosters();
  const categorySet = new Set<string>();

  for (const p of all) {
    if (p.category) {
      categorySet.add(p.category);
    }
  }

  const sorted = Array.from(categorySet).sort();
  return ['All', ...sorted];
};

// Return randomly shuffled subset of N posters
export const getRandomRawPosters = (count: number = 24): RawPoster[] => {
  const all = getRawPosters();
  if (all.length === 0) return [];

  // Fisher-Yates shuffle
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Filter posters dynamically by category (folder or keyword)
export const getThemedRawPosters = (category: string): RawPoster[] => {
  const all = getRawPosters();
  if (!category || category === 'All') return all;

  const catLower = category.toLowerCase().trim();

  // 1. Direct match on poster.category or poster.folder
  const matches = all.filter(p => {
    const pCat = p.category.toLowerCase();
    const pFold = p.folder.toLowerCase();

    if (pFold && (pFold === catLower || catLower.includes(pFold) || pFold.includes(catLower))) {
      return true;
    }
    if (pCat === catLower || pCat.includes(catLower) || catLower.includes(pCat)) {
      return true;
    }
    return false;
  });

  if (matches.length > 0) {
    return matches;
  }

  // 2. Fallback to keyword search across filenames and titles
  const keywordMatches = all.filter(p => {
    const fn = p.filename.toLowerCase();
    const t = p.title.toLowerCase();
    return fn.includes(catLower) || t.includes(catLower);
  });

  return keywordMatches.length > 0 ? keywordMatches : all;
};

// Find single raw poster matching keywords
export const findRawPoster = (keywords: string[]): RawPoster | undefined => {
  const all = getRawPosters();
  for (const kw of keywords) {
    const k = kw.toLowerCase();
    const found = all.find(
      p => p.filename.toLowerCase().includes(k) || p.title.toLowerCase().includes(k)
    );
    if (found) return found;
  }
  return all[0];
};

// Convert all raw posters into full Product format for store catalog
export const getRawProducts = () => {
  const rawList = getRawPosters();
  return rawList.map((rp, i) => ({
    id: rp.id,
    title: rp.title,
    slug: rp.id,
    category: rp.category,
    subcategory: rp.folder ? rp.folder.charAt(0).toUpperCase() + rp.folder.slice(1) : 'Art Print',
    tags: ['Raw Poster', rp.category, '300 GSM', 'Archival', rp.folder],
    image: rp.imageSrc,
    description: `High-definition 300 GSM Archival Velvet Paper Poster: ${rp.title}. Printed with non-fade pigment inks and razor-sharp detailing. Available in A4, A3, 12×18, and 18×24 sizes (Framed or Unframed).`,
    paperQuality: '300 GSM Heavyweight Archival Velvet Paper',
    rating: 4.8 + ((i % 3) * 0.1),
    reviews: 65 + (i % 80),
    isBestSeller: i % 4 === 0,
    isNew: i % 3 === 0,
    featured: i % 5 === 0,
  }));
};
