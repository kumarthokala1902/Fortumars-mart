import { Product } from './types';

export const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Beauty',
  'Sports'
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- Electronics ---
  {
    id: 'e1',
    name: 'Fortumas X-Phone Pro',
    description: 'The ultimate smartphone experience with a titanium frame, 48MP camera, and all-day battery life.',
    price: 999.00,
    category: 'Electronics',
    rating: 4.9,
    reviewsCount: 15420,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Premium'
  },
  {
    id: 'e2',
    name: 'UltraWide Curved Gaming Monitor',
    description: '34-inch 144Hz curved display with vibrant colors and ultra-fast response time.',
    price: 449.99,
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: 3200,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    badge: 'Top Rated'
  },
  {
    id: 'e3',
    name: 'Noise Cancelling Earbuds Gen 4',
    description: 'Compact wireless earbuds with industry-leading active noise cancellation.',
    price: 199.00,
    category: 'Electronics',
    rating: 4.6,
    reviewsCount: 8200,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e4',
    name: 'Fortumas Book Air M3',
    description: 'The world\'s most popular laptop is now even better with the M3 chip and liquid retina display.',
    price: 1299.00,
    category: 'Electronics',
    rating: 4.9,
    reviewsCount: 2150,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e5',
    name: 'Pro Vlogger Camera Kit',
    description: 'Mirrorless 4K camera with flip screen, external mic, and tripod for professional content creation.',
    price: 849.00,
    category: 'Electronics',
    rating: 4.7,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e6',
    name: 'SkyPhantom Drone 4K',
    description: 'Advanced folding drone with GPS, obstacle avoidance, and 30-minute flight time.',
    price: 599.99,
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1473968512447-ac4753a64607?auto=format&fit=crop&q=80&w=800'
  },

  // --- Clothing ---
  {
    id: 'c1',
    name: 'Urban Explorer Waterproof Parka',
    description: 'Stylish, windproof, and waterproof parka designed for extreme weather and city life.',
    price: 185.00,
    category: 'Clothing',
    rating: 4.7,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    badge: 'Bestseller'
  },
  {
    id: 'c2',
    name: 'Classic Leather Chelsea Boots',
    description: 'Handcrafted genuine leather boots with elastic side panels and durable rubber sole.',
    price: 120.00,
    category: 'Clothing',
    rating: 4.5,
    reviewsCount: 1205,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c3',
    name: 'Minimalist Cotton T-Shirt Set',
    description: 'Pack of 3 premium organic cotton shirts in neutral colors.',
    price: 45.00,
    category: 'Clothing',
    rating: 4.4,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c4',
    name: 'Luxury Silk Evening Dress',
    description: 'Elegance redefined with pure mulberry silk and a modern silhouette.',
    price: 350.00,
    category: 'Clothing',
    rating: 4.8,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c5',
    name: 'Performance Tech Joggers',
    description: 'Four-way stretch joggers with hidden zip pockets, perfect for travel or light workouts.',
    price: 78.00,
    category: 'Clothing',
    rating: 4.6,
    reviewsCount: 1540,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c6',
    name: 'Arctic Wool Turtleneck',
    description: '100% fine merino wool sweater that balances warmth with breathability.',
    price: 110.00,
    category: 'Clothing',
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
  },

  // --- Home & Kitchen ---
  {
    id: 'h1',
    name: 'Precision Espresso Machine',
    description: 'Barista-quality coffee at home with integrated grinder and steam wand.',
    price: 599.00,
    category: 'Home & Kitchen',
    rating: 4.9,
    reviewsCount: 5430,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'h2',
    name: 'Smart Robotic Vacuum V8',
    description: 'Hands-free cleaning with AI obstacle avoidance and powerful suction.',
    price: 299.00,
    category: 'Home & Kitchen',
    rating: 4.5,
    reviewsCount: 2840,
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'h3',
    name: 'Cast Iron Dutch Oven 6qt',
    description: 'Premium enameled cast iron for perfect heat retention and distribution.',
    price: 145.00,
    category: 'Home & Kitchen',
    rating: 4.9,
    reviewsCount: 11200,
    image: 'https://images.unsplash.com/photo-1591189863430-ab87e120f312?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'h4',
    name: 'PureFlow Air Purifier',
    description: 'HEPA 13 filter captures 99.97% of airborne particles for cleaner breathing.',
    price: 199.00,
    category: 'Home & Kitchen',
    rating: 4.7,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'h5',
    name: 'Professional Chef Knife Set',
    description: 'German high-carbon steel knives with ergonomic handles and oak wood block.',
    price: 249.00,
    category: 'Home & Kitchen',
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'h6',
    name: 'Smart Multi-Cooker XL',
    description: '10-in-1 cooker that pressure cooks, slow cooks, sautes, and even air fries.',
    price: 169.00,
    category: 'Home & Kitchen',
    rating: 4.8,
    reviewsCount: 4500,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800'
  },

  // --- Books ---
  {
    id: 'b1',
    name: 'Deep Learning with Python',
    description: 'Comprehensive guide to building neural networks and AI systems.',
    price: 38.50,
    category: 'Books',
    rating: 5.0,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    name: 'The Art of Minimalist Living',
    description: 'Learn how to simplify your space and your life for maximum peace.',
    price: 24.99,
    category: 'Books',
    rating: 4.7,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    name: 'Mastering UI/UX Design',
    description: 'A visual guide to creating intuitive and beautiful digital experiences.',
    price: 42.00,
    category: 'Books',
    rating: 4.9,
    reviewsCount: 85,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b4',
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    price: 18.00,
    category: 'Books',
    rating: 4.8,
    reviewsCount: 22400,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b5',
    name: 'Modern Architecture Trends',
    description: 'A deep dive into sustainable building practices and futuristic design.',
    price: 55.00,
    category: 'Books',
    rating: 4.6,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1511105612320-2e62a04dd044?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b6',
    name: 'Creative Coding Handbook',
    description: 'Learn how to generate art and visuals using JavaScript and P5.js.',
    price: 34.00,
    category: 'Books',
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800'
  },

  // --- Sports ---
  {
    id: 's1',
    name: 'Elite Carbon Road Bike',
    description: 'Ultralight aerodynamic frame designed for speed and endurance.',
    price: 2499.00,
    category: 'Sports',
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    name: 'Pro Series Dumbbell Set',
    description: 'Adjustable weight plates from 5lbs to 52lbs with a space-saving design.',
    price: 320.00,
    category: 'Sports',
    rating: 4.6,
    reviewsCount: 1850,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    name: 'ZenGrip Pro Yoga Mat',
    description: 'Extra thick, non-slip cork mat for perfect balance and comfort.',
    price: 85.00,
    category: 'Sports',
    rating: 4.8,
    reviewsCount: 2100,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's4',
    name: 'Smart Muscle Recovery Gun',
    description: 'Percussive therapy device with 5 speeds and 4 specialized attachments.',
    price: 129.00,
    category: 'Sports',
    rating: 4.7,
    reviewsCount: 3420,
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's5',
    name: 'Carbon Fiber Tennis Racket',
    description: 'Professional grade racket offering superior power and vibration dampening.',
    price: 189.00,
    category: 'Sports',
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's6',
    name: 'Pro Weight Bench 3000',
    description: 'Heavy-duty adjustable bench with incline and decline settings for full body workouts.',
    price: 210.00,
    category: 'Sports',
    rating: 4.6,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },

  // --- Beauty ---
  {
    id: 'bt1',
    name: 'Revive Night Facial Oil',
    description: 'Organic botanical extracts to rejuvenate and hydrate your skin overnight.',
    price: 65.00,
    category: 'Beauty',
    rating: 4.8,
    reviewsCount: 740,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bt2',
    name: 'Hyaluronic Acid Serum',
    description: 'Ultra-pure hydrating formula that plumps skin and reduces fine lines.',
    price: 34.00,
    category: 'Beauty',
    rating: 4.9,
    reviewsCount: 3100,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bt3',
    name: 'Deep Clean Charcoal Mask',
    description: 'Detoxifying clay mask that draws out impurities and refines pores.',
    price: 28.00,
    category: 'Beauty',
    rating: 4.7,
    reviewsCount: 1800,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bt4',
    name: 'Vitamin C Glow Essence',
    description: 'Brightening facial mist that provides an instant refresh and antioxidant protection.',
    price: 39.00,
    category: 'Beauty',
    rating: 4.6,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bt5',
    name: 'Luxe Beard Grooming Oil',
    description: 'Cedarwood and sandalwood infused oil for a soft, healthy, and fragrant beard.',
    price: 22.00,
    category: 'Beauty',
    rating: 4.8,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bt6',
    name: 'Shield Sunstick SPF 50',
    description: 'Transparent, non-greasy sunscreen stick for easy reapplying on the go.',
    price: 26.00,
    category: 'Beauty',
    rating: 4.9,
    reviewsCount: 1200,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
  }
];