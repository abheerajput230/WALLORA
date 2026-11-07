export type PosterSize = 'A4' | 'A3' | '12 × 18' | '18 × 24';

export interface SizeOption {
  label: PosterSize;
  dimensions: string;
  unframedPrice: number;
  framedPrice: number;
  originalUnframedPrice: number;
  originalFramedPrice: number;
  competitorPriceUnframed?: number;
  competitorPriceFramed?: number;
  bestFor?: string;
  badge?: string;
}

export interface FrameOption {
  label: string;
  colorCode: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  tags: string[];
  image: string;
  additionalImages?: string[];
  description: string;
  paperQuality: string;
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: PosterSize;
  isFramed: boolean;
  selectedFrameColor?: string;
  unitPrice: number;
  totalPrice: number;
}

export const SIZE_PRICING: Record<PosterSize, SizeOption> = {
  'A4': {
    label: 'A4',
    dimensions: '9 × 12 in (21 × 29.7 cm)',
    unframedPrice: 30,
    framedPrice: 349,
    originalUnframedPrice: 99,
    originalFramedPrice: 699,
    competitorPriceUnframed: 149,
    competitorPriceFramed: 499,
    bestFor: 'Study desks, bedroom collage walls & multi-poster packs',
    badge: 'Super Value',
  },
  'A3': {
    label: 'A3',
    dimensions: '11.7 × 16.5 in (29.7 × 42 cm)',
    unframedPrice: 99,
    framedPrice: 549,
    originalUnframedPrice: 249,
    originalFramedPrice: 999,
    competitorPriceUnframed: 249,
    competitorPriceFramed: 799,
    bestFor: 'Bedroom art, anime & gaming setups, studio rooms',
    badge: 'Anime & Pop Culture',
  },
  '12 × 18': {
    label: '12 × 18',
    dimensions: '12 × 18 in (30.5 × 45.7 cm)',
    unframedPrice: 149,
    framedPrice: 699,
    originalUnframedPrice: 349,
    originalFramedPrice: 1299,
    competitorPriceUnframed: 299,
    competitorPriceFramed: 999,
    bestFor: 'Gaming dens, living room accent walls & iconic movie prints',
    badge: '★ #1 Best Seller in India',
  },
  '18 × 24': {
    label: '18 × 24',
    dimensions: '18 × 24 in (45.7 × 61 cm)',
    unframedPrice: 299,
    framedPrice: 1199,
    originalUnframedPrice: 699,
    originalFramedPrice: 2199,
    competitorPriceUnframed: 499,
    competitorPriceFramed: 1799,
    bestFor: 'Master living room centerpiece, main hallway & office lobby',
    badge: 'Grand Statement',
  },
};

export const SIZES_LIST: PosterSize[] = ['A4', 'A3', '12 × 18', '18 × 24'];

export const FRAME_OPTIONS: FrameOption[] = [
  { label: 'Matte Black', colorCode: '#111111', description: 'Deep satin black synthetic wood moulding' },
  { label: 'Natural Oak Wood', colorCode: '#8B5E3C', description: 'Warm organic Scandinavian grain finish' },
  { label: 'Studio White', colorCode: '#FFFFFF', description: 'Clean architectural crisp white profile' },
  { label: 'Champagne Gold', colorCode: '#C8A355', description: 'Brushed luxury metallic accent frame' },
];

export const CATEGORIES_LIST = [
  'Movie & Cinema',
  'Marvel & DC',
  'Anime & Manga',
  'Gaming & Cyberpunk',
  'Sports & Legends',
  'Cars & Supercars',
  'Bikes & Superbikes',
  'Gym & Motivational',
  'Spiritual & Devotional',
  'Aesthetic & Minimalist',
  'Music & Pop Culture',
] as const;

export type CategoryName = typeof CATEGORIES_LIST[number];

export const CATEGORY_DETAILS: Record<CategoryName, { count: string; image: string; tag: string; description: string }> = {
  'Movie & Cinema': {
    count: '40+ Designs',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&auto=format&fit=crop&q=80',
    tag: 'Cinema Icons',
    description: 'Iconic movie posters, cult cinematic masterworks, and visionary filmmaker artwork.',
  },
  'Marvel & DC': {
    count: '35+ Designs',
    image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=700&auto=format&fit=crop&q=80',
    tag: 'Superheroes',
    description: 'Earth’s mightiest heroes and dark vigilantes in striking graphic poster art.',
  },
  'Anime & Manga': {
    count: '50+ Designs',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80',
    tag: 'Japanese Pop Art',
    description: 'Shonen battle legends, nostalgic Studio Ghibli vibes, and modern manga panels.',
  },
  'Gaming & Cyberpunk': {
    count: '30+ Designs',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=80',
    tag: 'Retro & Neon',
    description: 'Cyberpunk neon aesthetics, AAA game tributes, and pixel nostalgia art.',
  },
  'Sports & Legends': {
    count: '25+ Designs',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=700&auto=format&fit=crop&q=80',
    tag: 'Athletes & GOATs',
    description: 'Tributes to football icons, basketball royalty, and champions of world sport.',
  },
  'Cars & Supercars': {
    count: '28+ Designs',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&auto=format&fit=crop&q=80',
    tag: 'Horsepower & Drift',
    description: 'Precision engineering, retro Porsche 911s, Italian exotics, and JDM drift legends.',
  },
  'Bikes & Superbikes': {
    count: '20+ Designs',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=80',
    tag: 'Two-Wheeled Thrills',
    description: 'Ducati superbikes, cafe racers, custom choppers, and adrenaline track prints.',
  },
  'Gym & Motivational': {
    count: '35+ Designs',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80',
    tag: 'Discipline & Hustle',
    description: 'Bold typography and inspiring grit visuals to conquer daily goals.',
  },
  'Spiritual & Devotional': {
    count: '25+ Designs',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=700&auto=format&fit=crop&q=80',
    tag: 'Divine & Peace',
    description: 'Sacred Hindu deities, serene Buddha art, and transcendent spiritual designs.',
  },
  'Aesthetic & Minimalist': {
    count: '45+ Designs',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=80',
    tag: 'Bauhaus & Modern',
    description: 'Minimalist line art, Scandinavian abstracts, neutral warm palettes and geometry.',
  },
  'Music & Pop Culture': {
    count: '30+ Designs',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80',
    tag: 'Vinyl & Rock',
    description: 'Legendary rock bands, hip-hop icons, retro album art, and musical tributes.',
  },
};

export const products: Product[] = [
  // 1. Movie & Cinema
  {
    id: 'm1',
    title: 'The Dark Knight: Gotham Shadows',
    slug: 'the-dark-knight-gotham-shadows',
    category: 'Movie & Cinema',
    subcategory: 'Christopher Nolan',
    tags: ['Batman', 'Cinema', 'Joker', 'Gotham', 'Cult Classic'],
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80',
    description: 'A dark, brooding tribute to Christopher Nolan’s cinematic masterpiece. Ultra-rich black tones on 300 GSM Archival Matte Paper with anti-glare finish.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 184,
    isBestSeller: true,
    featured: true,
  },
  {
    id: 'm2',
    title: 'Interstellar: Gargantua Singularity',
    slug: 'interstellar-gargantua-singularity',
    category: 'Movie & Cinema',
    subcategory: 'Sci-Fi Classics',
    tags: ['Interstellar', 'Space', 'Black Hole', 'Nolan', 'Sci-Fi'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    description: 'Witness the gravitational lensing of Gargantua. An awe-inspiring space odyssey print rendered in cosmic high-fidelity pigments.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 210,
    isBestSeller: true,
  },
  {
    id: 'm3',
    title: 'Pulp Fiction: Dancing Shadows',
    slug: 'pulp-fiction-dancing-shadows',
    category: 'Movie & Cinema',
    subcategory: 'Cult Classics',
    tags: ['Tarantino', 'Vintage', 'Cult', 'Cinema', 'Retro'],
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&auto=format&fit=crop&q=80',
    description: 'Vincent Vega and Mia Wallace in their iconic Jack Rabbit Slims twist contest. Retro palette and sharp 1990s aesthetic.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.8,
    reviews: 95,
  },

  // 2. Marvel & DC
  {
    id: 's1',
    title: 'Iron Man Mark VII: Arc Reactor Blue',
    slug: 'iron-man-mark-vii-arc-reactor-blue',
    category: 'Marvel & DC',
    subcategory: 'Avengers',
    tags: ['Marvel', 'Tony Stark', 'Avengers', 'Armor'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    description: 'Detailed blueprint and heroic portrait of Tony Stark’s iconic Mark VII armor with deep metallic crimson and glowing arc tones.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.9,
    reviews: 142,
    isBestSeller: true,
  },
  {
    id: 's2',
    title: 'Spider-Man: Queens Horizon',
    slug: 'spider-man-queens-horizon',
    category: 'Marvel & DC',
    subcategory: 'Spider-Verse',
    tags: ['Spider-Man', 'Miles Morales', 'New York', 'Marvel'],
    image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
    description: 'Perched atop the Chrysler Building overlooking the neon pulse of Manhattan. Vivid comic book contrast on heavy cardstock.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.8,
    reviews: 119,
    isNew: true,
  },
  {
    id: 's3',
    title: 'Batman: The Caped Crusader Silhouette',
    slug: 'batman-the-caped-crusader-silhouette',
    category: 'Marvel & DC',
    subcategory: 'DC Comics',
    tags: ['Batman', 'DC', 'Dark Knight', 'Gotham', 'Minimalist'],
    image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&auto=format&fit=crop&q=80',
    description: 'Minimalist high-contrast graphic representation of Gotham’s protector under rain-slicked gargoyles.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.7,
    reviews: 88,
  },

  // 3. Anime & Manga
  {
    id: 'a1',
    title: 'One Piece: Gear 5 Sun God Nika',
    slug: 'one-piece-gear-5-sun-god-nika',
    category: 'Anime & Manga',
    subcategory: 'Shonen Legends',
    tags: ['Luffy', 'Gear 5', 'One Piece', 'Anime', 'Manga'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    description: 'The warrior of liberation awakens in dazzling white smoke and joyful freedom. One of the most iconic manga moments in history.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 5.0,
    reviews: 320,
    isBestSeller: true,
    featured: true,
  },
  {
    id: 'a2',
    title: 'Naruto & Sasuke: Valley of the End',
    slug: 'naruto-and-sasuke-valley-of-the-end',
    category: 'Anime & Manga',
    subcategory: 'Naruto Shippuden',
    tags: ['Naruto', 'Sasuke', 'Chidori', 'Rasengan', 'Anime'],
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    description: 'The final fateful clash between Rasengan and Chidori at the Valley of the End. Pure emotional anime nostalgia.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 245,
  },
  {
    id: 'a3',
    title: 'Attack on Titan: The Colossal Stare',
    slug: 'attack-on-titan-colossal-stare',
    category: 'Anime & Manga',
    subcategory: 'Dark Fantasy',
    tags: ['Eren', 'Titan', 'AOT', 'Anime', 'Wall Maria'],
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    description: 'On that day, mankind received a grim reminder. Striking dystopian artwork featuring Wall Maria.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.8,
    reviews: 176,
    isNew: true,
  },

  // 4. Gaming & Cyberpunk
  {
    id: 'g1',
    title: 'Cyberpunk 2077: Night City Neon',
    slug: 'cyberpunk-2077-night-city-neon',
    category: 'Gaming & Cyberpunk',
    subcategory: 'Futuristic RPG',
    tags: ['Cyberpunk', 'Neon', 'Gaming', 'Night City', 'Sci-Fi'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    description: 'Vibrant neon purple, magenta, and cyan hues illuminating the rain-drenched streets of Night City.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.9,
    reviews: 165,
    isBestSeller: true,
  },
  {
    id: 'g2',
    title: 'The Legend of Zelda: Silent Princess Bloom',
    slug: 'legend-of-zelda-silent-princess',
    category: 'Gaming & Cyberpunk',
    subcategory: 'Action Adventure',
    tags: ['Zelda', 'Link', 'Hyrule', 'Nintendo', 'Gaming'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    description: 'Tranquil scenery of Hyrule with the legendary Master Sword resting among Silent Princess flowers.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 'g3',
    title: 'Retro Arcade: Insert Coin 1984',
    slug: 'retro-arcade-insert-coin-1984',
    category: 'Gaming & Cyberpunk',
    subcategory: 'Retro Gaming',
    tags: ['Arcade', '80s', 'Pixel', 'Synthwave', 'Retro'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    description: 'Glowing CRT scanlines and nostalgic synthwave retro cabinet aesthetics for your gaming room.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.7,
    reviews: 74,
    isNew: true,
  },

  // 5. Sports & Legends
  {
    id: 'sp1',
    title: 'Leo Messi: World Champion 2022',
    slug: 'leo-messi-world-champion-2022',
    category: 'Sports & Legends',
    subcategory: 'Football Icons',
    tags: ['Messi', 'Football', 'World Cup', 'Argentina', 'GOAT'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    description: 'The golden moment of sporting immortality. Lionel Messi lifting the World Cup trophy in Qatar.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 5.0,
    reviews: 290,
    isBestSeller: true,
    featured: true,
  },
  {
    id: 'sp2',
    title: 'Cristiano Ronaldo: The Siiiuuu Silhouette',
    slug: 'cristiano-ronaldo-the-siiiuuu-silhouette',
    category: 'Sports & Legends',
    subcategory: 'Football Icons',
    tags: ['CR7', 'Ronaldo', 'Real Madrid', 'Football', 'Legend'],
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=80',
    description: 'The most iconic celebration in football history captured in high-contrast stadium floodlight brilliance.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 230,
  },
  {
    id: 'sp3',
    title: 'Kobe Bryant: Mamba Mentality 24',
    slug: 'kobe-bryant-mamba-mentality',
    category: 'Sports & Legends',
    subcategory: 'Basketball',
    tags: ['Kobe', 'Lakers', 'Basketball', 'NBA', 'Mamba'],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
    description: 'Relentless passion and timeless legacy of Kobe Bryant. Pure purple & gold intensity.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 148,
  },

  // 6. Cars & Supercars
  {
    id: 'c1',
    title: 'Porsche 911 Turbo: Stuttgart Heritage',
    slug: 'porsche-911-turbo-stuttgart-heritage',
    category: 'Cars & Supercars',
    subcategory: 'German Classics',
    tags: ['Porsche', '911', 'Turbo', 'Supercars', 'Vintage'],
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
    description: 'The timeless silhouette of the air-cooled Porsche 911 Turbo parked in dramatic architectural lighting.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.9,
    reviews: 182,
    isBestSeller: true,
  },
  {
    id: 'c2',
    title: 'Nissan Skyline GT-R R34: Midnight Purple',
    slug: 'nissan-skyline-gtr-r34-midnight-purple',
    category: 'Cars & Supercars',
    subcategory: 'JDM Legends',
    tags: ['JDM', 'Skyline', 'GTR', 'R34', 'Drift', 'Japan'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
    description: 'Godzilla on Tokyo’s Shuto Expressway. Deep midnight purple hues and aggressive aero lines.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 'c3',
    title: 'Ferrari F40: Rosso Corsa Icon',
    slug: 'ferrari-f40-rosso-corsa-icon',
    category: 'Cars & Supercars',
    subcategory: 'Italian Exotics',
    tags: ['Ferrari', 'F40', 'Supercar', 'Italian', 'Rosso Corsa'],
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
    description: 'Enzo Ferrari’s final masterpiece with twin turbos and exposed carbon weave in legendary Rosso Corsa red.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.9,
    reviews: 120,
    isNew: true,
  },

  // 7. Bikes & Superbikes
  {
    id: 'b1',
    title: 'Ducati Panigale V4R: Bologna Red',
    slug: 'ducati-panigale-v4r-bologna-red',
    category: 'Bikes & Superbikes',
    subcategory: 'Superbikes',
    tags: ['Ducati', 'Superbike', 'Racing', 'MotoGP', 'Motorcycle'],
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
    description: 'Pure Italian racing pedigree. Aerodynamic carbon wings and roaring 221 horsepower Desmosedici engine.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.8,
    reviews: 98,
    isBestSeller: true,
  },
  {
    id: 'b2',
    title: 'Harley-Davidson: Iron 888 Dark Custom',
    slug: 'harley-davidson-iron-dark-custom',
    category: 'Bikes & Superbikes',
    subcategory: 'Cruisers',
    tags: ['Harley', 'Bobber', 'Cruiser', 'Custom', 'Motorcycle'],
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
    description: 'Raw blacked-out V-Twin rumbling down empty highway tarmac at golden hour.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 'b3',
    title: 'Cafe Racer: Vintage British Single',
    slug: 'cafe-racer-vintage-british-single',
    category: 'Bikes & Superbikes',
    subcategory: 'Retro Classics',
    tags: ['Cafe Racer', 'Retro', 'Vintage', 'Custom', 'Classic'],
    image: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&auto=format&fit=crop&q=80',
    description: 'Handcrafted leather seat, polished aluminum tank, and clip-on handlebars for the discerning gentleman rider.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.8,
    reviews: 64,
    isNew: true,
  },

  // 8. Gym & Motivational
  {
    id: 'gm1',
    title: 'Discipline Over Motivation: Heavy Iron',
    slug: 'discipline-over-motivation-heavy-iron',
    category: 'Gym & Motivational',
    subcategory: 'Mindset',
    tags: ['Gym', 'Fitness', 'Discipline', 'Motivation', 'Bodybuilding'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    description: 'Bold typography with distressed raw chalk textures. The ultimate reminder for your home gym or workout space.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 215,
    isBestSeller: true,
    featured: true,
  },
  {
    id: 'gm2',
    title: 'Arnold Schwarzenegger: Golden Era Venice',
    slug: 'arnold-schwarzenegger-golden-era-venice',
    category: 'Gym & Motivational',
    subcategory: 'Legends',
    tags: ['Arnold', 'Mr Olympia', 'Gold Gym', 'Fitness', 'Vintage'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    description: 'Classic monochrome portrait of Arnold Schwarzenegger pumping iron at Gold’s Gym Venice Beach in the 1970s.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 188,
  },
  {
    id: 'gm3',
    title: 'Memento Mori & Amor Fati: Stoic Compass',
    slug: 'memento-mori-amor-fati-stoic-compass',
    category: 'Gym & Motivational',
    subcategory: 'Stoicism',
    tags: ['Stoic', 'Philosophy', 'Marcus Aurelius', 'Minimalist'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    description: 'Marcus Aurelius & Seneca teachings captured in refined luxury serif typography and geometric hourglass design.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.8,
    reviews: 92,
  },

  // 9. Spiritual & Devotional
  {
    id: 'spg1',
    title: 'Lord Shiva: The Cosmic Adiyogi Meditation',
    slug: 'lord-shiva-cosmic-adiyogi-meditation',
    category: 'Spiritual & Devotional',
    subcategory: 'Vedic Deities',
    tags: ['Shiva', 'Mahadev', 'Bholenath', 'Spiritual', 'Meditation'],
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&auto=format&fit=crop&q=80',
    description: 'Tranquil yet fierce representation of Lord Shiva in deep Himalayan cosmic dhyana. Rich indigo & saffron tones.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 5.0,
    reviews: 310,
    isBestSeller: true,
    featured: true,
  },
  {
    id: 'spg2',
    title: 'Lord Krishna: Vrindavan Flute Harmony',
    slug: 'lord-krishna-vrindavan-flute-harmony',
    category: 'Spiritual & Devotional',
    subcategory: 'Divine Art',
    tags: ['Krishna', 'Radha Krishna', 'Divine', 'Peacock', 'Spiritual'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    description: 'Ethereal artwork depicting Shri Krishna playing the divine flute surrounded by gentle peacocks and Yamuna waves.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.9,
    reviews: 195,
  },
  {
    id: 'spg3',
    title: 'Zen Buddha: Golden Lotus Enlightenment',
    slug: 'zen-buddha-golden-lotus-enlightenment',
    category: 'Spiritual & Devotional',
    subcategory: 'Peace & Zen',
    tags: ['Buddha', 'Zen', 'Peace', 'Lotus', 'Spiritual'],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80',
    description: 'Warm gold foil aesthetic with serene meditative Buddha seated on sacred lotus petals.',
    paperQuality: '300 GSM Archival Velvet Matte Paper',
    rating: 4.8,
    reviews: 115,
  },

  // 10. Aesthetic & Minimalist
  {
    id: 'ae1',
    title: 'Bauhaus 1923: Geometric Abstract Exhibition',
    slug: 'bauhaus-1923-geometric-abstract',
    category: 'Aesthetic & Minimalist',
    subcategory: 'Modern Bauhaus',
    tags: ['Bauhaus', 'Minimalist', 'Abstract', 'Modern', 'Gallery'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
    description: 'Iconic Weimar exhibition design with harmonious primary geometry, clean circles, and warm cream parchment tone.',
    paperQuality: '300 GSM Fine Art Cotton Textured Paper',
    rating: 4.9,
    reviews: 178,
    isBestSeller: true,
  },
  {
    id: 'ae2',
    title: 'Kyoto Botanical: Zen Ginkgo Leaf Pair',
    slug: 'kyoto-botanical-zen-ginkgo-leaf',
    category: 'Aesthetic & Minimalist',
    subcategory: 'Japandi & Nature',
    tags: ['Japandi', 'Botanical', 'Zen', 'Leaves', 'Minimalist'],
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop&q=80',
    description: 'Subtle earthy ochre and sand textures portraying Japanese ginkgo biloba leaves. Calming aesthetic for bedrooms.',
    paperQuality: '300 GSM Fine Art Cotton Textured Paper',
    rating: 4.8,
    reviews: 134,
  },
  {
    id: 'ae3',
    title: 'Midnight Sun & Wave: Scandinavian Horizon',
    slug: 'midnight-sun-and-wave-scandinavian',
    category: 'Aesthetic & Minimalist',
    subcategory: 'Nordic Art',
    tags: ['Nordic', 'Scandi', 'Minimalist', 'Sun', 'Ocean'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    description: 'Fluid wave arches meeting a terracotta sun against warm off-white linen background.',
    paperQuality: '300 GSM Fine Art Cotton Textured Paper',
    rating: 4.7,
    reviews: 86,
    isNew: true,
  },

  // 11. Music & Pop Culture
  {
    id: 'mu1',
    title: 'Abbey Road: The Beatles 1969 Crosswalk',
    slug: 'the-beatles-abbey-road-1969',
    category: 'Music & Pop Culture',
    subcategory: 'Rock Royalty',
    tags: ['Beatles', 'Rock', 'Music', 'Abbey Road', 'Vinyl'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    description: 'The most famous zebra crosswalk in music history. London 1969 album art tribute printed in stunning vintage grain.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.9,
    reviews: 142,
    isBestSeller: true,
  },
  {
    id: 'mu2',
    title: 'Vinyl Reverie: Retro Turntable & Waveforms',
    slug: 'vinyl-reverie-retro-turntable',
    category: 'Music & Pop Culture',
    subcategory: 'Audiophile & Jazz',
    tags: ['Vinyl', 'Record Player', 'Jazz', 'Music', 'HiFi'],
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
    description: 'Analog warmth in visual form. Macro needle drop on micro-grooved vinyl record.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.8,
    reviews: 104,
  },
  {
    id: 'mu3',
    title: 'Pink Floyd: Dark Side Prism Spectrum',
    slug: 'pink-floyd-dark-side-prism-spectrum',
    category: 'Music & Pop Culture',
    subcategory: 'Psychedelic Rock',
    tags: ['Pink Floyd', 'Prism', 'Rainbow', 'Rock', 'Music'],
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    description: 'The legendary triangular prism dispersing white light into the full rainbow spectrum against deep space black.',
    paperQuality: '300 GSM Heavyweight Matte Finish',
    rating: 4.9,
    reviews: 189,
    isNew: true,
  },
];

// Helper calculations based on the user's explicit pricing table
export const calculatePrice = (size: PosterSize, isFramed: boolean): number => {
  const cfg = SIZE_PRICING[size] || SIZE_PRICING['A4'];
  return isFramed ? cfg.framedPrice : cfg.unframedPrice;
};

export const calculateOriginalPrice = (size: PosterSize, isFramed: boolean): number => {
  const cfg = SIZE_PRICING[size] || SIZE_PRICING['A4'];
  return isFramed ? cfg.originalFramedPrice : cfg.originalUnframedPrice;
};

// WhatsApp Integration Helpers
export const STORE_WHATSAPP_NUMBER = '919876543210'; // Shop WhatsApp Number (with country code 91)
export const FREE_SHIPPING_THRESHOLD = 699;
export const STANDARD_SHIPPING_COST = 50;

export const generateProductWhatsAppUrl = (
  product: Product,
  size: PosterSize,
  isFramed: boolean,
  frameColor: string = 'Matte Black',
  quantity: number = 1
): string => {
  const unitPrice = calculatePrice(size, isFramed);
  const totalPrice = unitPrice * quantity;
  const framingText = isFramed ? `Framed (${frameColor})` : 'Without Frame (Rolled Print)';

  const message = [
    `*POSTER_ARENA - Order Enquiry* 🖼️`,
    `----------------------------------------`,
    `• *Poster:* ${product.title}`,
    `• *Category:* ${product.category}`,
    `• *Size:* ${size} (${SIZE_PRICING[size].dimensions})`,
    `• *Option:* ${framingText}`,
    `• *Quantity:* ${quantity}`,
    `• *Total Price:* ₹${totalPrice}`,
    `• *Product Link:* ${window.location.origin}/product/${product.id}`,
    `----------------------------------------`,
    `Hi! I would like to place an order / enquire about delivery time for this poster. Please confirm!`,
  ].join('\n');

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const generateCartWhatsAppUrl = (
  items: CartItem[],
  customerInfo?: { name?: string; phone?: string; address?: string; city?: string; pincode?: string }
): string => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const grandTotal = subtotal + shipping;

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.title}*\n   Size: ${item.selectedSize} | ${item.isFramed ? `Framed (${item.selectedFrameColor || 'Black'})` : 'Without Frame'}\n   Qty: ${item.quantity} × ₹${item.unitPrice} = ₹${item.totalPrice}`
    )
    .join('\n\n');

  const customerDetails = customerInfo && customerInfo.name
    ? `\n*Customer Delivery Info:*\n• Name: ${customerInfo.name}\n• Phone: ${customerInfo.phone || 'N/A'}\n• Address: ${customerInfo.address || ''}, ${customerInfo.city || ''} - ${customerInfo.pincode || ''}\n`
    : '';

  const message = [
    `*POSTER_ARENA - Cart Order Enquiry* 🛒`,
    `----------------------------------------`,
    itemsList,
    `----------------------------------------`,
    `• *Subtotal:* ₹${subtotal}`,
    `• *Shipping:* ${shipping === 0 ? 'FREE Express Delivery 🚚' : `₹${shipping}`}`,
    `• *Grand Total:* ₹${grandTotal}`,
    customerDetails,
    `----------------------------------------`,
    `Hello POSTER_ARENA team! I would like to confirm this order. Please share payment / dispatch details. Thank you!`,
  ].join('\n');

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
