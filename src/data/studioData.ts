export type PageId = 'home' | 'services' | 'works' | 'contact';

export const STUDIO_INFO = {
  name: 'Pixel Nest Studio',
  motto: 'Your Vision. Our Creativity.',
  email: 'pixelneststudio@gmail.com',
  instagramHandle: '@pixelneststudio',
  instagramUrl: 'https://instagram.com/pixelneststudio',
  phoneDisplay: '+91 9744212665',
  phoneHref: 'tel:+919744212665',
  location: 'Kerala, India · Serving Worldwide',
};

export type ServiceGroup = 'All' | 'Design & Web' | 'Video & Reels' | 'Photo & Ads';

export interface StudioService {
  id: string;
  number: string;
  title: string;
  group: Exclude<ServiceGroup, 'All'>;
  summary: string;
  deliverables: string[];
  pricingNote: 'Contact Us for Pricing' | "Let's Discuss Your Project";
  portfolioCategory: PortfolioCategory;
}

export const SERVICES_LIST: StudioService[] = [
  {
    id: 'web-design',
    number: '01.',
    title: 'Web Design',
    group: 'Design & Web',
    summary:
      'Fast, responsive websites engineered with crisp visual hierarchy to convert visitors into loyal customers.',
    deliverables: ['Responsive Desktop & Mobile', 'Custom Brand Styling', 'Conversion-Focused Layouts'],
    pricingNote: 'Contact Us for Pricing',
    portfolioCategory: 'Web & UI/UX Designs',
  },
  {
    id: 'ui-ux-design',
    number: '02.',
    title: 'UI/UX Design',
    group: 'Design & Web',
    summary:
      'Intuitive product interfaces, wireframes, and interactive prototypes built for clarity and effortless flow.',
    deliverables: ['User Flows & Wireframes', 'Design Systems', 'Interactive Prototypes'],
    pricingNote: "Let's Discuss Your Project",
    portfolioCategory: 'Web & UI/UX Designs',
  },
  {
    id: 'poster-design',
    number: '03.',
    title: 'Poster Design',
    group: 'Design & Web',
    summary:
      'Print-ready and social campaign posters that command attention through bold typography and balanced composition.',
    deliverables: ['Event & Launch Posters', 'Print & Digital Formats', 'Custom Typography Layouts'],
    pricingNote: 'Contact Us for Pricing',
    portfolioCategory: 'Posters & Graphic Designs',
  },
  {
    id: 'youtube-thumbnail',
    number: '04.',
    title: 'YouTube Thumbnail Design',
    group: 'Design & Web',
    summary:
      'Click-worthy, high-contrast thumbnails crafted to sharpen visual hooks and lift channel click-through rates.',
    deliverables: ['High-Contrast Visual Hooks', 'Channel Style Consistency', 'A/B Ready Variants'],
    pricingNote: 'Contact Us for Pricing',
    portfolioCategory: 'YouTube Thumbnails',
  },
  {
    id: 'social-media-reels',
    number: '05.',
    title: 'Social Media Reels',
    group: 'Video & Reels',
    summary:
      'Paced vertical edits, kinetic captions, and rhythmic sound design tailored for Instagram Reels and Shorts.',
    deliverables: ['9:16 Vertical Framing', 'Motion Captions & Pacing', 'Color Grading & Audio Mix'],
    pricingNote: "Let's Discuss Your Project",
    portfolioCategory: 'Social Media Reels',
  },
  {
    id: 'digital-advertisements',
    number: '06.',
    title: 'Digital Advertisements',
    group: 'Photo & Ads',
    summary:
      'Scroll-stopping campaign creatives built for Meta, Google, and launch placements with sharp product storytelling.',
    deliverables: ['Static & Motion Ad Sets', 'Multi-Aspect Ad Exports', 'Brand Campaign Art Direction'],
    pricingNote: 'Contact Us for Pricing',
    portfolioCategory: 'Advertisements',
  },
  {
    id: 'ai-video-creation',
    number: '07.',
    title: 'AI Video Creation',
    group: 'Video & Reels',
    summary:
      'Next-generation generative visual commercials and concept films blending AI motion tools with editorial post-production.',
    deliverables: ['Concept Storyboarding', 'Generative Visual Direction', '4K Sound & Grade Finish'],
    pricingNote: "Let's Discuss Your Project",
    portfolioCategory: 'AI Videos',
  },
  {
    id: 'professional-photography',
    number: '08.',
    title: 'Professional Photography',
    group: 'Photo & Ads',
    summary:
      'Editorial portraits, product stills, and brand lookbooks captured with calibrated studio lighting and clean retouching.',
    deliverables: ['Studio & Location Shoots', 'Product & Editorial Stills', 'Color-Calibrated Retouching'],
    pricingNote: 'Contact Us for Pricing',
    portfolioCategory: 'Photography',
  },
  {
    id: 'wedding-reels',
    number: '09.',
    title: 'Wedding Reels & Cinematic Wedding Videos',
    group: 'Video & Reels',
    summary:
      'Timeless wedding highlights and atmospheric reels crafted with warm color grading and authentic emotional pacing.',
    deliverables: ['Cinematic Highlight Films', 'Same-Week Vertical Reels', 'Licensed Soundtrack & Grade'],
    pricingNote: "Let's Discuss Your Project",
    portfolioCategory: 'Wedding Projects',
  },
  {
    id: 'automobile-reels',
    number: '10.',
    title: 'Automobile Reels & Promotional Videos',
    group: 'Video & Reels',
    summary:
      'Dynamic rolling shots, crisp exhaust sound design, and showroom feature films built for dealerships and enthusiasts.',
    deliverables: ['Rolling & Rig Cinematography', 'Precision Speed Ramping', 'Dealership Launch Cuts'],
    pricingNote: 'Contact Us for Pricing',
    portfolioCategory: 'Automobile Projects',
  },
];

export const PORTFOLIO_CATEGORIES = [
  'All Works',
  'Posters & Graphic Designs',
  'YouTube Thumbnails',
  'Web & UI/UX Designs',
  'Social Media Reels',
  'Advertisements',
  'AI Videos',
  'Photography',
  'Wedding Projects',
  'Automobile Projects',
] as const;

export type PortfolioFilter = (typeof PORTFOLIO_CATEGORIES)[number];
export type PortfolioCategory = Exclude<PortfolioFilter, 'All Works'>;

export interface PortfolioProject {
  id: string;
  title: string;
  category: PortfolioCategory;
  serviceMatch: string;
  client: string;
  year: string;
  format: string;
  image: string;
  aspectClass: string;
  featuredOnHome?: boolean;
  description: string;
  deliverables: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'swiss-form-poster',
    title: 'Graphic Form & Function Exhibition Series',
    category: 'Posters & Graphic Designs',
    serviceMatch: 'Poster Design',
    client: 'Kunsthalle Cultural Collective',
    year: '2026',
    format: 'A1 Print & Digital Series',
    image: '/src/assets/images/work_poster_design_1794543847065.jpg',
    aspectClass: 'aspect-[3/4]',
    featuredOnHome: true,
    description:
      'A Swiss-modernist exhibition poster system combining royal cobalt geometry, structured Swiss grids, and tactile warm cream stock.',
    deliverables: ['Exhibition Key Poster', 'Print Prepress Files', 'Social Teaser Crops'],
  },
  {
    id: 'coastal-gt-reel',
    title: 'Blue Hour Grand Tourer Rolling Film',
    category: 'Automobile Projects',
    serviceMatch: 'Automobile Reels & Promotional Videos',
    client: 'Apex Performance Motors',
    year: '2026',
    format: '4K Commercial & 9:16 Reel',
    image: '/assets/aistudio/image_9c5bbb3d.png',
    aspectClass: 'aspect-[3/2]',
    featuredOnHome: true,
    description:
      'Twilight coastal highway rolling shoot featuring stabilized tracking shots, natural turbine audio layering, and bespoke royal-blue grade.',
    deliverables: ['60s Hero Film', '15s Instagram Cut', 'Dealership Press Stills'],
  },
  {
    id: 'velasco-web-uiux',
    title: 'Velasco Digital Editorial Platform',
    category: 'Web & UI/UX Designs',
    serviceMatch: 'Web Design',
    client: 'Velasco Architecture & Brand',
    year: '2026',
    format: 'Responsive Web & Tablet System',
    image: '/assets/aistudio/image_933f42d7.png',
    aspectClass: 'aspect-[16/9]',
    featuredOnHome: true,
    description:
      'End-to-end brand web architecture pairing warm ivory surfaces with crisp royal blue typographic hierarchy across desktop and tablet.',
    deliverables: ['UX Wireframes', 'UI Design System', 'Production Web Build'],
  },
  {
    id: 'heritage-colonnade-wedding',
    title: 'Golden Hour Colonnade Wedding Film',
    category: 'Wedding Projects',
    serviceMatch: 'Wedding Reels & Cinematic Wedding Videos',
    client: 'Aarav & Elena',
    year: '2026',
    format: 'Anamorphic Highlight & Reel',
    image: '/src/assets/images/work_wedding_cinema_1794543850137.jpg',
    aspectClass: 'aspect-[16/9]',
    featuredOnHome: true,
    description:
      'Warm anamorphic wedding storytelling set inside a sandstone colonnade at sunset, edited with documentary intimacy and crisp motion.',
    deliverables: ['6-Min Highlight Film', '90s Vertical Reel', 'Color-Graded Teaser'],
  },
  {
    id: 'oceans-echo-ad',
    title: 'Fogg Royal Concept Product Campaign',
    category: 'Advertisements',
    serviceMatch: 'Digital Advertisements',
    client: 'Fogg Royal Creative Spec',
    year: '2026',
    format: 'Paid Social & Key Visual Ad',
    image: '/assets/aistudio/image_162929d8.png',
    aspectClass: 'aspect-[3/4]',
    featuredOnHome: false,
    description:
      'Playful high-impact product composite advertisement pairing dynamic action storytelling with crisp royal-blue studio backdrop lighting.',
    deliverables: ['Hero Product Key Visual', 'Meta Carousel Assets', 'Story Motion Cutdowns'],
  },
  {
    id: 'creator-hub-thumbnail',
    title: 'Wealth Mindset High-CTR Thumbnail',
    category: 'YouTube Thumbnails',
    serviceMatch: 'YouTube Thumbnail Design',
    client: 'Apex Finance Channel',
    year: '2026',
    format: '16:9 High-CTR Packaging',
    image: '/assets/aistudio/image_ae6d7d30.png',
    aspectClass: 'aspect-[16/9]',
    featuredOnHome: false,
    description:
      'High-contrast YouTube thumbnail artwork combining sculptural focal lighting, bold growth iconography, and instant mobile readability.',
    deliverables: ['Primary & Variant Thumbnails', 'Color Contrast Keying', 'Title Hook Pairing'],
  },
  {
    id: 'ivory-atelier-reel',
    title: 'Dual-Lit Studio Cyclorama Production',
    category: 'Social Media Reels',
    serviceMatch: 'Social Media Reels',
    client: 'Pixel Nest Production Floor',
    year: '2026',
    format: 'Studio Reel & Behind-the-Scenes',
    image: '/assets/aistudio/image_a89c9496.png',
    aspectClass: 'aspect-[16/9]',
    featuredOnHome: false,
    description:
      'Custom studio cyclorama setup featuring dual warm-and-cobalt key softboxes engineered for high-retention creator and brand reels.',
    deliverables: ['3x Vertical Launch Reels', 'Studio Lighting Setup', 'Color LUT Pack'],
  },
  {
    id: 'kinetic-glass-ai-film',
    title: '3D Character AI Story Reel',
    category: 'AI Videos',
    serviceMatch: 'AI Video Creation',
    client: 'Nova Kids & Story Studio',
    year: '2026',
    format: '9:16 Generative 3D Film',
    image: '/assets/aistudio/image_8c37bcb8.png',
    aspectClass: 'aspect-[9/16]',
    featuredOnHome: false,
    description:
      'Expressive AI-assisted 3D character animation sequence combining consistent character design, soft studio key light, and narrative motion.',
    deliverables: ['AI Character Consistency', '4K Vertical Master', 'Voice & SFX Sync'],
  },
  {
    id: 'monolith-editorial-portrait',
    title: 'Moonlit Canopy Night Photography',
    category: 'Photography',
    serviceMatch: 'Professional Photography',
    client: 'Nocturne Fine Art Series',
    year: '2026',
    format: 'Low-Light Editorial Capture',
    image: '/assets/aistudio/image_93ee339e.png',
    aspectClass: 'aspect-[3/4]',
    featuredOnHome: false,
    description:
      'Dramatic nocturnal long-exposure study capturing crisp lunar detail framed by storm clouds and natural woodland silhouettes.',
    deliverables: ['High-Res Master Print', 'Tonal Retouching', 'Digital Archive Files'],
  },
  {
    id: 'bauhaus-gallery-poster',
    title: 'Bauhaus Geometry Museum Print',
    category: 'Posters & Graphic Designs',
    serviceMatch: 'Poster Design',
    client: 'Gallery Noveau',
    year: '2026',
    format: 'Large-Format Exhibition Print',
    image: '/src/assets/images/work_poster_brand_1794543850804.jpg',
    aspectClass: 'aspect-[3/4]',
    featuredOnHome: false,
    description:
      'Bold cobalt and charcoal abstract geometric exhibition poster balancing asymmetric negative space with sharp architectural type.',
    deliverables: ['Framed Exhibition Print', 'Wayfinding Signage', 'Digital Invite'],
  },
  {
    id: 'studio-fender-auto-promo',
    title: 'Classic Ambassador Heritage Feature',
    category: 'Automobile Projects',
    serviceMatch: 'Automobile Reels & Promotional Videos',
    client: 'Kerala Classic Motors',
    year: '2026',
    format: '1:1 Automotive Photo & Reel',
    image: '/assets/aistudio/image_417cbfe7.png',
    aspectClass: 'aspect-square',
    featuredOnHome: false,
    description:
      'Natural daylight automotive portrait and promotional reel capturing timeless chrome detailing and deep emerald paintwork on an open backroad.',
    deliverables: ['Automotive Photo Set', 'Social Promo Reel', 'Color-Graded Masters'],
  },
];
