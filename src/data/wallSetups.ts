import { getRawPosters, getThemedRawPosters, findRawPoster, RawPoster } from './rawPosters';

export interface WallSetupPack {
  id: string;
  title: string;
  piecesText: string;
  price: number;
  originalPrice: number;
  pieces: number;
  dimensions: string;
  badge?: string;
  category: string;
  image: string;
  heroImage: string;
  surroundingImages: string[];
  mockupLayout?: 'hero-pack' | 'split-3' | 'split-4' | 'split-5';
  wallColor?: string;
  deskType?: 'desk' | 'shelf' | 'none';
  description: string;
  mixDetails: string;
  sampleTitles: string[];
}

export interface WallLayoutPreset {
  id: string;
  name: string;
  postersCount: number;
  dimensions: string;
  price: number;
  originalPrice: number;
  savings: number;
  badge?: string;
  schematicType: 'mosaic' | 'hero' | 'showcase' | 'trio-xl';
  description: string;
}

export interface SplitFormat {
  id: string;
  name: string;
  promoBadge?: string;
  description: string;
  panels: number;
}

// 1. FORMAT SELECTORS (Matching User Image 3)
export const SPLIT_FORMATS: SplitFormat[] = [
  {
    id: 'single',
    name: 'Single posters',
    promoBadge: 'BUY 5 GET 5 FREE',
    description: 'Individual 300 GSM Archival Prints in A5, A4, A3, 13×19',
    panels: 1,
  },
  {
    id: 'split-3',
    name: '3-Piece split',
    promoBadge: 'BUY 1 GET 2 FREE',
    description: '1 continuous design split seamlessly across 3 horizontal prints',
    panels: 3,
  },
  {
    id: 'split-4',
    name: '4-Piece split',
    promoBadge: '2×2 SQUARE GRID',
    description: 'Quad split poster forming a massive modern centerpiece',
    panels: 4,
  },
  {
    id: 'split-5',
    name: '5-Piece split',
    promoBadge: 'PANORAMIC ROW',
    description: '5 vertical panels arranged horizontally above your desk',
    panels: 5,
  },
  {
    id: 'split-8',
    name: '8-Piece split',
    promoBadge: 'COLOSSAL WALL',
    description: '4×2 full room wall takeover print set',
    panels: 8,
  },
];

// 2. WALL LAYOUT PRESETS (Matching User Image 5)
export const WALL_LAYOUT_PRESETS: WallLayoutPreset[] = [
  {
    id: 'mosaic-wall',
    name: 'Mosaic Wall',
    postersCount: 19,
    dimensions: '6.1 × 4.3 ft',
    price: 849,
    originalPrice: 1799,
    savings: 950,
    badge: 'SAVE ₹950',
    schematicType: 'mosaic',
    description: 'Large central 3-piece centerpiece surrounded by 16 vertical prints framing your study desk.',
  },
  {
    id: 'hero-wall',
    name: 'Hero Wall',
    postersCount: 20,
    dimensions: '4.5 × 4.8 ft',
    price: 849,
    originalPrice: 1499,
    savings: 650,
    badge: 'SAVE ₹650',
    schematicType: 'hero',
    description: '1 prominent giant vertical Hero print in the center surrounded symmetrically by 19 satellite prints.',
  },
  {
    id: 'showcase-wall',
    name: 'Showcase Wall',
    postersCount: 20,
    dimensions: '5.5 × 3 ft',
    price: 899,
    originalPrice: 1599,
    savings: 700,
    badge: 'SAVE ₹700',
    schematicType: 'showcase',
    description: 'Massive 6-piece central graphic split surrounded by 14 companion prints.',
  },
  {
    id: 'trio-xl-wall',
    name: 'Trio XL Wall',
    postersCount: 40,
    dimensions: '7.6 × 4.8 ft',
    price: 1299,
    originalPrice: 2200,
    savings: 901,
    badge: '★ BEST VALUE',
    schematicType: 'trio-xl',
    description: '3 giant vertical central prints flanked and framed by 37 surrounding mini-prints.',
  },
];

// 3. CURATED WALL SETUP PACKS - Powered 100% by local raw posters
export const getCuratedWallSetups = (): WallSetupPack[] => {
  const allRaw = getRawPosters();
  const defaultPoster = allRaw[0]?.imageSrc || '';

  // Helpers to pick real raw images
  const pick = (keywords: string[]): string =>
    findRawPoster(keywords)?.imageSrc || defaultPoster;

  const pickSurrounding = (cat: string, count: number = 8): string[] => {
    const list = getThemedRawPosters(cat);
    return list.slice(0, count).map(p => p.imageSrc);
  };

  return [
    // 1. Marvel Legends (from Screenshot 1)
    {
      id: 'captain-america-iron-man-marvel',
      title: 'Captain America Iron Man Marvel Legends Wall Setup Pack 20 Piece A3 A4 A5 Mix Collection',
      piecesText: '20 Piece A3 A4 A5 Mix Collection',
      price: 549,
      originalPrice: 799,
      pieces: 20,
      dimensions: '5.2 × 4.0 ft',
      badge: 'Trending',
      category: 'Superheroes',
      image: pick(['avenger', 'spidy', 'iron']),
      heroImage: pick(['avenger', 'spidy', 'iron']),
      surroundingImages: pickSurrounding('superheroes', 8),
      mockupLayout: 'hero-pack',
      wallColor: '#E6E9E6',
      deskType: 'desk',
      description: 'Cap & Iron Man dual hero centerpieces surrounded by Thor, Loki, Black Panther, and comic panel prints.',
      mixDetails: '4x A3 (11.7×16.5"), 8x A4 (8.3×11.7"), 8x A5 (5.8×8.3")',
      sampleTitles: ['Avengers Infinity Legends', 'Iron Man Mark 85', 'Spiderman 2099', 'Wakanda Forever', 'Thor God of Thunder'],
    },

    // 2. Ram Sita Eternal Companionship (from Screenshot 1)
    {
      id: 'ram-sita-eternal-companionship',
      title: 'Ram Sita Eternal Companionship Wall Setup Ramayanam 20 Piece A3 A4 A5 Mix Pack',
      piecesText: 'Ramayanam 20 Piece A3 A4 A5 Mix Pack',
      price: 649,
      originalPrice: 799,
      pieces: 20,
      dimensions: '5.4 × 4.2 ft',
      badge: 'Divine Heritage',
      category: 'Devotional',
      image: pick(['krishna', 'ram', 'mahadev']),
      heroImage: pick(['krishna', 'ram', 'mahadev']),
      surroundingImages: pickSurrounding('devotional', 8),
      mockupLayout: 'hero-pack',
      wallColor: '#F3ECE1',
      deskType: 'desk',
      description: 'Magnificent central Ram Sita divine portrayal surrounded by Hanuman Ji, Mahadev, Krishna, and sacred mantras.',
      mixDetails: '1x Large Centerpiece (16×24"), 4x A3, 8x A4, 7x A5',
      sampleTitles: ['Ram Sita Eternal Companionship', 'Lord Hanuman Bhakti & Courage', 'Neelkanth Mahadev', 'Shree Krishna Morpankh'],
    },

    // 3. Dream Garage Wall Collection (from Screenshot 1)
    {
      id: 'dream-garage-wall-collection',
      title: 'Dream Garage Wall Collection | 21 Design Setup Combo | Wall Setup Pack',
      piecesText: '21 Design Setup Combo | Wall Setup Pack',
      price: 549,
      originalPrice: 799,
      pieces: 21,
      dimensions: '5.5 × 3.5 ft',
      badge: 'Automotive Dream',
      category: 'Cars & Garage',
      image: pick(['defender', 'rolls', 'bmw']),
      heroImage: pick(['defender', 'rolls', 'bmw']),
      surroundingImages: pickSurrounding('cars', 8),
      mockupLayout: 'split-3',
      wallColor: '#E2E6E9',
      deskType: 'shelf',
      description: 'Massive Defender 110 Trophy center split flanked by BMW M Power, Porsche GT3, Rolls Royce, and Panigale V4.',
      mixDetails: '3-Piece Defender Center Split, 6x A4, 12x A5 prints',
      sampleTitles: ['Defender 110 Trophy Center', 'BMW M3 Competition', 'Porsche 911 GT3 RS', 'Rolls Royce Black Phantom', 'Ducati Panigale V4'],
    },

    // 4. Ram Sita Timeless Devotion (from Screenshot 2)
    {
      id: 'ram-sita-timeless-devotion',
      title: 'Ram Sita Timeless Devotion Wall Setup Ramayanam 20 Piece A3 A4 A5 Mix Pack',
      piecesText: 'Ramayanam 20 Piece A3 A4 A5 Mix Pack',
      price: 649,
      originalPrice: 799,
      pieces: 20,
      dimensions: '5.4 × 4.2 ft',
      badge: 'Sacred Heritage',
      category: 'Devotional',
      image: pick(['vishnu', 'shree krishna', 'hanuman']),
      heroImage: pick(['vishnu', 'shree krishna', 'hanuman']),
      surroundingImages: pickSurrounding('devotional', 8),
      mockupLayout: 'hero-pack',
      wallColor: '#EFE6DA',
      deskType: 'desk',
      description: 'Timeless Ram Sita divine portrait with Ayodhya temple themes, Khatu Shyam Ji, and Vedic art prints.',
      mixDetails: '1x Large Centerpiece, 4x A3, 8x A4, 7x A5',
      sampleTitles: ['Ram Sita Timeless Devotion', 'Ayodhya Mandir Gold', 'Shyam Baba Khatu', 'Lord Shiva Meditating'],
    },

    // 5. Lionel Messi Legacy (from Screenshot 2)
    {
      id: 'lionel-messi-legacy',
      title: 'Lionel Messi Legacy | Premium Wall Setup Pack | 8 Design A3 A4 A5 Mix Pack',
      piecesText: '8 Design A3 A4 A5 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 8,
      dimensions: '4.8 × 3.4 ft',
      badge: 'GOAT Edition',
      category: 'Football & Sports',
      image: pick(['messi', 'brave', 'quit']),
      heroImage: pick(['messi', 'brave', 'quit']),
      surroundingImages: pickSurrounding('sports', 8),
      mockupLayout: 'split-3',
      wallColor: '#E6E9EF',
      deskType: 'desk',
      description: 'Chase the Dream Messi World Cup celebration 3-piece split with Argentina 10 and Barcelona masterclass prints.',
      mixDetails: '3-Piece "Chase The Dream" Split, 2x A3, 3x A4 prints',
      sampleTitles: ['Chase The Dream World Cup Split', 'Messi 10 Argentina Iconic', 'Camp Nou Silence', 'Ballon dOr Record'],
    },

    // 6. Neymar Jr King Without a Crown (from Screenshot 2)
    {
      id: 'neymar-jr-king',
      title: 'Neymar Jr King Without a Crown | Football Premium Wall Setup Pack | 8 Design A3 A4 A5 Mix Pack',
      piecesText: '8 Design A3 A4 A5 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 8,
      dimensions: '4.8 × 3.4 ft',
      badge: 'Joga Bonito',
      category: 'Football & Sports',
      image: pick(['football', 'neymar', 'sport']),
      heroImage: pick(['football', 'neymar', 'sport']),
      surroundingImages: pickSurrounding('sports', 8),
      mockupLayout: 'split-4',
      wallColor: '#E9EFE6',
      deskType: 'desk',
      description: 'King Without a Crown 4-panel split with Brazil Santos, Barcelona MSN, and PSG iconic moments.',
      mixDetails: '4-Panel Center Split, 2x A3, 2x A4 prints',
      sampleTitles: ['King Without A Crown Center Split', 'Brazil 10 Joga Bonito', 'Santos Wonderkid', 'Barcelona 11 Treble'],
    },

    // 7. CR7 Legacy (from Screenshot 2)
    {
      id: 'cr7-legacy',
      title: 'CR7 Legacy | Premium Wall Setup Pack | 8 Design A3 A4 A5 Mix Pack',
      piecesText: '8 Design A3 A4 A5 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 8,
      dimensions: '4.8 × 3.4 ft',
      badge: 'SIIIUUU',
      category: 'Football & Sports',
      image: pick(['cr7', 'men are brave', 'quit']),
      heroImage: pick(['cr7', 'men are brave', 'quit']),
      surroundingImages: pickSurrounding('sports', 8),
      mockupLayout: 'split-3',
      wallColor: '#1C1917',
      deskType: 'desk',
      description: '"Do It For Your Future Self" CR7 iconic celebration 3-panel split with Portugal and Real Madrid classics.',
      mixDetails: '3-Panel "Do It For Your Future Self" Split, 2x A3, 3x A4 prints',
      sampleTitles: ['Do It For Your Future Self Split', 'SIIIUUU Celebration', 'Champions League King', 'Portugal Euro 2016'],
    },

    // 8. Legendary Trio Anime Wall Setup (from Screenshot 3)
    {
      id: 'legendary-trio-anime',
      title: 'Legendary Trio Wall Setup | Premium Wall Setup Pack | 16 Piece A4 A3 Mix Pack',
      piecesText: '16 Piece A4 A3 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 16,
      dimensions: '5.2 × 4.2 ft',
      badge: 'Anime Legends',
      category: 'Anime',
      image: pick(['solo leveling', 'itachi', 'sukuna']),
      heroImage: pick(['solo leveling', 'itachi', 'sukuna']),
      surroundingImages: pickSurrounding('anime', 8),
      mockupLayout: 'split-3',
      wallColor: '#EBE6EF',
      deskType: 'shelf',
      description: 'Gear 5 Luffy, Naruto Sage Mode, and Ichigo Bankai central horizontal split with Zoro, Kakashi, and Itachi prints.',
      mixDetails: '3-Piece Big 3 Center Split, 4x A3, 9x A4 prints',
      sampleTitles: ['Big 3 Center Split (Luffy, Naruto, Ichigo)', 'Gear 5 Joyboy', 'Kakashi Anbu Mask', 'Itachi Uchiha Susanoo', 'Zoro King of Hell'],
    },

    // 9. Kollywood Mass Icons (from Screenshot 3)
    {
      id: 'kollywood-mass-icons',
      title: 'Kollywood Mass Icons | Premium Wall Setup Pack | 16 Piece A4 A3 Mix Pack',
      piecesText: '16 Piece A4 A3 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 16,
      dimensions: '5.2 × 4.2 ft',
      badge: 'Mass Cinema',
      category: 'Cinema & Pop',
      image: pick(['scarface', 'shinchan', 'desi']),
      heroImage: pick(['scarface', 'shinchan', 'desi']),
      surroundingImages: pickSurrounding('cinema', 8),
      mockupLayout: 'split-3',
      wallColor: '#EFEBE6',
      deskType: 'desk',
      description: 'Superstar Rajinikanth center multi-split with Thalapathy Vijay Leo, Kamal Haasan Vikram, and Ajith Kumar prints.',
      mixDetails: '3-Piece Superstar Center Split, 4x A3, 9x A4 prints',
      sampleTitles: ['Superstar Rajinikanth Jailer Split', 'Leo Badass Vijay', 'Vikram Kamal Haasan', 'Thala Ajith Kumar', 'Captain Forever'],
    },

    // 10. The Ultimate Porsche Wall Setup
    {
      id: 'the-ultimate-porsche',
      title: 'The Ultimate Porsche Wall Setup | Wall Setup Pack',
      piecesText: '20 Piece A3 A4 A5 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 20,
      dimensions: '5.5 × 3.5 ft',
      badge: 'Best Seller',
      category: 'Cars & Garage',
      image: pick(['porsche supercar', 'porsche 911', 'porsche']),
      heroImage: pick(['porsche supercar', 'porsche 911', 'porsche']),
      surroundingImages: pickSurrounding('cars', 8),
      mockupLayout: 'split-3',
      wallColor: '#EDE5D8',
      deskType: 'desk',
      description: 'Multi-piece centerpiece Porsche 911 GT3 RS with 16 high-octane racing companion prints.',
      mixDetails: '3-Piece Porsche 911 Split, 4x A3, 8x A4, 5x A5 prints',
      sampleTitles: ['Porsche 911 GT3 RS Center Split', 'GT3 R IMSA Motorsport', 'Red Beast on Wheels', 'Stuttgart Badge'],
    },

    // 11. The King Virat
    {
      id: 'the-king-virat',
      title: 'The King Virat | Wall Setup Pack',
      piecesText: '20 Piece A3 A4 A5 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 20,
      dimensions: '5.0 × 3.8 ft',
      badge: 'Cricket Pride',
      category: 'Football & Sports',
      image: pick(['virat', 'brave', 'quit']),
      heroImage: pick(['virat', 'brave', 'quit']),
      surroundingImages: pickSurrounding('sports', 8),
      mockupLayout: 'hero-pack',
      wallColor: '#F0ECE4',
      deskType: 'desk',
      description: 'Dominance centerpiece Virat Kohli roar split poster with 16 iconic masterclass match prints.',
      mixDetails: '2-Piece Dominance Split, 4x A3, 8x A4, 6x A5 prints',
      sampleTitles: ['Virat Roar Dominance Split', 'Melbourne 82* Masterpiece', 'Century Celebration King', 'Test Aggression'],
    },

    // 12. Superman Batman DC Superhero
    {
      id: 'superman-batman-dc',
      title: 'Superman Batman | DC Superhero Wall Setup | 34 Piece A3 A5 Mix Pack',
      piecesText: '34 Piece A3 A5 Mix Pack Corner Setup',
      price: 649,
      originalPrice: 899,
      pieces: 34,
      dimensions: '6.5 × 4.5 ft',
      badge: 'Mega 34-Pack',
      category: 'Superheroes',
      image: pick(['batman', 'superman', 'spidy']),
      heroImage: pick(['batman', 'superman', 'spidy']),
      surroundingImages: pickSurrounding('superheroes', 8),
      mockupLayout: 'hero-pack',
      wallColor: '#E6E9EB',
      deskType: 'desk',
      description: '"I Am Vengeance" Batman and Heat Vision Superman dual centerpiece posters with 32 comic panels.',
      mixDetails: '2x Large Hero Centerpieces, 6x A3, 12x A4, 14x A5 prints',
      sampleTitles: ['I Am Vengeance Batman', 'Superman Heat Vision', 'Dark Knight City View', 'Joker Classic Art'],
    },

    // 13. Spider-Verse Great Responsibility
    {
      id: 'spider-verse-great-responsibility',
      title: 'Spider Verse Great Responsibility Wall Setup Pack 20 Piece A3 A4 A5 Mix',
      piecesText: '20 Piece A3 A4 A5 Mix Pack',
      price: 549,
      originalPrice: 799,
      pieces: 20,
      dimensions: '5.2 × 4.0 ft',
      badge: 'Multiverse Pack',
      category: 'Superheroes',
      image: pick(['spidy', 'venom', 'spider']),
      heroImage: pick(['spidy', 'venom', 'spider']),
      surroundingImages: pickSurrounding('superheroes', 8),
      mockupLayout: 'hero-pack',
      wallColor: '#EBE6E8',
      deskType: 'desk',
      description: 'Large "Power & Responsibility" Spiderman leap centerpiece poster with 19 multiverse hero prints.',
      mixDetails: '1x Large Centerpiece, 4x A3, 8x A4, 7x A5 prints',
      sampleTitles: ['With Great Power Comes Responsibility', 'Miles Morales Leap', 'Spider-Man 2099', 'Symbiote Suit Art'],
    },
  ];
};
