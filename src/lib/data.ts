export const BRAND = {
  name: "MAYA'S",
  tagline: "Fine Jewelry · Miami · Since 1985",
  description: "Four decades of curating exquisite jewelry in the heart of Miami. Where heritage meets contemporary elegance.",
  phone: "(305) 392-1461",
  email: "info@mayasjewelry.com",
  address: "542 SW 12th Ave, Miami, FL 33130",
  hours: {
    weekday: "Mon – Fri: 10 AM – 6 PM",
    weekend: "Sat: 10 AM – 5 PM",
    closed: "Sun: Closed",
  },
  social: {
    instagram: "#",
    facebook: "#",
    pinterest: "#",
  },
  founded: 1985,
  yearsInBusiness: new Date().getFullYear() - 1985,
};

export const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Pieces", href: "#pieces" },
  { label: "Heritage", href: "#heritage" },
  { label: "Atelier", href: "#atelier" },
  { label: "Journal", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export const COLLECTIONS = [
  {
    id: 1,
    title: "Heritage Gold",
    subtitle: "Timeless Elegance",
    description: "Hand-selected 18k and 24k gold pieces celebrating four decades of curatorial excellence.",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800&h=1000&fit=crop&q=80",
    itemCount: 42,
  },
  {
    id: 2,
    title: "Diamond Edit",
    subtitle: "Brilliant Cuts",
    description: "Meticulously sourced diamonds set in contemporary and classic designs.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop&q=80",
    itemCount: 28,
  },
  {
    id: 3,
    title: "Miami Luxe",
    subtitle: "Contemporary Spirit",
    description: "Bold, modern pieces inspired by Miami's vibrant energy and art deco heritage.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=1000&fit=crop&q=80",
    itemCount: 35,
  },
  {
    id: 4,
    title: "Bespoke Atelier",
    subtitle: "Made for You",
    description: "Commission a one-of-a-kind piece crafted to your exact vision by our master jewelers.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop&q=80",
    itemCount: 16,
  },
];

export const SIGNATURE_PRODUCTS = [
  {
    id: 1,
    name: "Cuban Link Heritage Chain",
    collection: "Heritage Gold",
    price: "$4,800",
    description: "Our signature Cuban link chain, handcrafted in 18k yellow gold. Each link is individually soldered for strength and fluidity.",
    details: ["18K Yellow Gold", "22\" Length", "8mm Width", "Handcrafted"],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=1100&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Soleil Diamond Pendant",
    collection: "Diamond Edit",
    price: "$6,200",
    description: "A radiant sun-inspired pendant featuring a 1.5ct center stone surrounded by a halo of pavé diamonds.",
    details: ["1.5ct Center Diamond", "VS1 Clarity", "18K White Gold", "Certificate Included"],
    image: "https://images.unsplash.com/photo-1599459183200-59c3fd3dc15f?w=900&h=1100&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Art Deco Cocktail Ring",
    collection: "Miami Luxe",
    price: "$3,400",
    description: "Inspired by Miami Beach's iconic architecture. Geometric patterns set with emeralds and diamonds.",
    details: ["Natural Emeralds", "Round Brilliant Diamonds", "18K Rose Gold", "Size 5-9"],
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&h=1100&fit=crop&q=80",
  },
];

export const REVIEWS = [
  {
    id: 1,
    name: "Cris P.",
    rating: 5,
    text: "Excellent place, great service. The ladies are polite and respectful, very friendly. They have jewelry at wonderful prices. I recommend it wholeheartedly.",
    location: "Miami, FL",
    date: "2024",
  },
  {
    id: 2,
    name: "Jose D.",
    rating: 5,
    text: "Great prices and excellent service. The quality of the gold pieces is exceptional. You can tell they know their craft after decades in the business.",
    location: "Coral Gables, FL",
    date: "2023",
  },
  {
    id: 3,
    name: "Erdwyn G.",
    rating: 5,
    text: "Great staff, they are always willing to assist you! The attention to detail and personal service makes all the difference.",
    location: "Miami Beach, FL",
    date: "2022",
  },
  {
    id: 4,
    name: "Maria L.",
    rating: 5,
    text: "I brought in my grandmother's jewelry for appraisal. They treated every piece with such care and respect. Truly a family business that values their customers.",
    location: "Brickell, FL",
    date: "2024",
  },
  {
    id: 5,
    name: "Carlos R.",
    rating: 5,
    text: "Had a custom engagement ring made here. The craftsmanship exceeded my expectations. My fiancée was speechless. Thank you, Maya's!",
    location: "Doral, FL",
    date: "2024",
  },
];

export const STATS = [
  { value: 41, suffix: "+", label: "Years of Excellence" },
  { value: 10, suffix: "K+", label: "Pieces Curated" },
  { value: 5000, suffix: "+", label: "Families Served" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export const SERVICES = [
  {
    title: "Expert Appraisals",
    description: "Complimentary professional valuations by certified gemologists with decades of experience.",
    icon: "appraisal",
  },
  {
    title: "Custom Design",
    description: "From concept to creation — our master jewelers bring your vision to life in precious metals and stones.",
    icon: "custom",
  },
  {
    title: "Jewelry Restoration",
    description: "Breathe new life into heirloom pieces with meticulous repair and restoration services.",
    icon: "restore",
  },
  {
    title: "Secure Trade-In",
    description: "Fair market value for your gold and precious metals, assessed transparently before your eyes.",
    icon: "trade",
  },
  {
    title: "Lifetime Care",
    description: "Every purchase includes complimentary cleaning, inspection, and minor adjustments for life.",
    icon: "care",
  },
  {
    title: "Private Viewings",
    description: "Schedule an exclusive appointment for a curated selection presented in complete privacy.",
    icon: "private",
  },
];

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop&q=80",
    alt: "Gold necklace detail",
    aspect: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop&q=80",
    alt: "Diamond ring collection",
    aspect: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop&q=80",
    alt: "Luxury bracelet",
    aspect: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=400&fit=crop&q=80",
    alt: "Craftsmanship detail",
    aspect: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=900&fit=crop&q=80",
    alt: "Pearl earrings",
    aspect: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=600&h=400&fit=crop&q=80",
    alt: "Gold chains",
    aspect: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&q=80",
    alt: "Jewelry workshop",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop&q=80",
    alt: "Diamond close-up",
    aspect: "tall",
  },
];
