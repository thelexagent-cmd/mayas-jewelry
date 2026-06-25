export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subcategory?: string;
  collection: string;
  material: string;
  weight: string;
  description: string;
  shortDescription: string;
  details: string[];
  specifications: Record<string, string>;
  images: ProductImage[];
  inStock: boolean;
  stockCount: number;
  badge?: "new" | "sale" | "bestseller" | "limited";
  tags: string[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  financing?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  productCount: number;
  featured: boolean;
}

// ─── Collections ───
export const COLLECTIONS: Collection[] = [
  {
    id: "heritage-gold",
    slug: "heritage-gold",
    name: "Heritage Gold",
    description: "Timeless 18k and 24k gold pieces celebrating four decades of curatorial excellence.",
    longDescription: "Our Heritage Gold collection represents the finest in traditional goldsmithing. Each piece is hand-selected for its exceptional craftsmanship, purity, and timeless appeal. From classic Cuban links to elegant rope chains, these pieces carry the weight of tradition and the warmth of pure gold.",
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&h=1000&fit=crop&q=80",
    productCount: 12,
    featured: true,
  },
  {
    id: "diamond-edit",
    slug: "diamond-edit",
    name: "The Diamond Edit",
    description: "Meticulously sourced diamonds set in contemporary and classic designs.",
    longDescription: "Every diamond in our collection is hand-selected for its brilliance, fire, and scintillation. From solitaire pendants to pavé-set bands, The Diamond Edit offers a curated selection of pieces that capture light and imagination in equal measure.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop&q=80",
    productCount: 10,
    featured: true,
  },
  {
    id: "miami-luxe",
    slug: "miami-luxe",
    name: "Miami Luxe",
    description: "Bold, modern pieces inspired by Miami's vibrant energy and art deco heritage.",
    longDescription: "Miami Luxe captures the spirit of our city — bold, vibrant, and unapologetically glamorous. Inspired by art deco geometry, tropical motifs, and the energy of South Beach, these pieces are designed for those who live life in full color.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=1000&fit=crop&q=80",
    productCount: 8,
    featured: true,
  },
  {
    id: "bespoke-atelier",
    slug: "bespoke-atelier",
    name: "Bespoke Atelier",
    description: "Commission a one-of-a-kind piece crafted to your exact vision.",
    longDescription: "Our Bespoke Atelier transforms your vision into wearable art. Work directly with our master jewelers to design a piece that is uniquely yours — from the initial sketch to the final polish. Every custom creation is a collaboration between your imagination and our four decades of expertise.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop&q=80",
    productCount: 6,
    featured: false,
  },
];

// ─── Categories ───
export const CATEGORIES = [
  { slug: "chains", name: "Chains", count: 8 },
  { slug: "necklaces", name: "Necklaces", count: 7 },
  { slug: "bracelets", name: "Bracelets", count: 6 },
  { slug: "rings", name: "Rings", count: 8 },
  { slug: "watches", name: "Watches", count: 4 },
  { slug: "earrings", name: "Earrings", count: 3 },
  { slug: "pendants", name: "Pendants", count: 4 },
];

// ─── Product Catalog (30 products) ───
export const PRODUCTS: Product[] = [
  // ── CHAINS ──
  {
    id: "cuban-link-heritage",
    slug: "cuban-link-heritage-chain",
    name: "Cuban Link Heritage Chain",
    sku: "MCG-CH-001",
    price: 4800,
    category: "chains",
    collection: "heritage-gold",
    material: "18K Yellow Gold",
    weight: "42g",
    description: "Our signature Cuban link chain, handcrafted in 18k yellow gold. Each link is individually soldered and hand-polished for unmatched strength and fluidity. This is the chain that built our reputation — worn by generations of Miami's most discerning collectors.",
    shortDescription: "Handcrafted 18K Cuban link chain — our signature piece since 1985.",
    details: ["18K Yellow Gold", '22" Length', "8mm Width", "Box Clasp with Safety"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Length": '22 inches', "Width": "8mm", "Weight": "42 grams", "Clasp": "Box clasp with double safety", "Hallmark": "750 MCG" },
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=1100&fit=crop&q=80", alt: "Cuban Link Heritage Chain front" },
      { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&h=1100&fit=crop&q=80", alt: "Cuban Link Heritage Chain detail" },
    ],
    inStock: true, stockCount: 5, badge: "bestseller",
    tags: ["gold", "cuban link", "chain", "heritage", "bestseller"],
    reviews: [
      { id: 1, author: "Carlos R.", rating: 5, title: "Absolutely Stunning", text: "The craftsmanship is unreal. Heavy, solid, and the finish is perfect. Worth every penny.", date: "2024-03-15", verified: true },
      { id: 2, author: "Miguel S.", rating: 5, title: "Family Heirloom Quality", text: "Bought this for my father's 60th. He says it's the finest chain he's ever owned.", date: "2024-01-22", verified: true },
    ],
    rating: 4.9, reviewCount: 47, featured: true,
    financing: "As low as $400/mo with financing",
  },
  {
    id: "rope-chain-classic",
    slug: "classic-rope-chain-24k",
    name: "Classic Rope Chain",
    sku: "MCG-CH-002",
    price: 3200,
    category: "chains",
    collection: "heritage-gold",
    material: "24K Yellow Gold",
    weight: "35g",
    description: "A timeless rope chain in pure 24K gold. The twisted design catches light from every angle, creating a brilliant display of warmth and luxury. Ideal for pendants or worn alone as a statement piece.",
    shortDescription: "Pure 24K rope chain with brilliant twisted design.",
    details: ["24K Yellow Gold", '24" Length', "4mm Width", "Lobster Clasp"],
    specifications: { "Metal": "24K Yellow Gold (999)", "Length": '24 inches', "Width": "4mm", "Weight": "35 grams", "Clasp": "Lobster clasp", "Hallmark": "999 MCG" },
    images: [
      { src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&h=1100&fit=crop&q=80", alt: "Classic Rope Chain" },
      { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=1100&fit=crop&q=80", alt: "Classic Rope Chain worn" },
    ],
    inStock: true, stockCount: 8,
    tags: ["gold", "rope", "chain", "classic", "24k"],
    reviews: [
      { id: 1, author: "Ana M.", rating: 5, title: "Pure Gold Beauty", text: "The color of 24K gold is incomparable. This chain glows.", date: "2024-04-10", verified: true },
    ],
    rating: 4.8, reviewCount: 32, featured: false,
  },
  {
    id: "figaro-chain",
    slug: "figaro-link-chain",
    name: "Figaro Link Chain",
    sku: "MCG-CH-003",
    price: 2800,
    compareAtPrice: 3400,
    category: "chains",
    collection: "heritage-gold",
    material: "18K Yellow Gold",
    weight: "28g",
    description: "The Italian-inspired Figaro pattern alternates between elongated and round links, creating a rhythmic visual texture. A versatile piece that transitions effortlessly from casual to formal.",
    shortDescription: "Italian-inspired 18K Figaro chain with alternating link pattern.",
    details: ["18K Yellow Gold", '20" Length', "6mm Width", "Lobster Clasp"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Length": '20 inches', "Width": "6mm", "Weight": "28 grams", "Clasp": "Lobster clasp", "Hallmark": "750 MCG" },
    images: [
      { src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&h=1100&fit=crop&q=80", alt: "Figaro Link Chain" },
      { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&h=1100&fit=crop&q=80", alt: "Figaro Link detail" },
    ],
    inStock: true, stockCount: 3, badge: "sale",
    tags: ["gold", "figaro", "chain", "italian", "sale"],
    reviews: [],
    rating: 4.7, reviewCount: 18, featured: false,
  },
  {
    id: "franco-chain",
    slug: "franco-chain-18k",
    name: "Franco Chain",
    sku: "MCG-CH-004",
    price: 5200,
    category: "chains",
    collection: "heritage-gold",
    material: "18K White Gold",
    weight: "48g",
    description: "The Franco chain features interlocking V-shaped links that create a smooth, flexible rope-like appearance. Crafted in 18K white gold for a modern, sophisticated look that pairs beautifully with any pendant.",
    shortDescription: "18K white gold Franco chain with interlocking V-links.",
    details: ["18K White Gold", '22" Length', "5mm Width", "Box Clasp"],
    specifications: { "Metal": "18K White Gold (750)", "Length": '22 inches', "Width": "5mm", "Weight": "48 grams", "Clasp": "Box clasp with safety", "Hallmark": "750 MCG" },
    images: [
      { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&h=1100&fit=crop&q=80", alt: "Franco Chain" },
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=1100&fit=crop&q=80", alt: "Franco Chain detail" },
    ],
    inStock: true, stockCount: 2, badge: "new",
    tags: ["white gold", "franco", "chain", "new"],
    reviews: [],
    rating: 5.0, reviewCount: 8, featured: true,
  },
  {
    id: "miami-cuban-iced",
    slug: "miami-cuban-iced-out",
    name: "Miami Cuban Iced Chain",
    sku: "MCG-CH-005",
    price: 8900,
    category: "chains",
    collection: "miami-luxe",
    material: "18K Yellow Gold & Diamonds",
    weight: "65g",
    description: "Our most extravagant chain — a Miami Cuban link fully set with VS1 round brilliant diamonds. Over 8 carats of diamonds are meticulously hand-set into each link. This is Miami luxury at its finest.",
    shortDescription: "Diamond-encrusted 18K Cuban link — 8+ carats of VS1 brilliance.",
    details: ["18K Yellow Gold", "8.2ct Diamonds", "VS1 Clarity", "F-G Color"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Diamonds": "8.2ct total weight", "Diamond Quality": "VS1 clarity, F-G color", "Length": '22 inches', "Width": "12mm", "Weight": "65 grams" },
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=1100&fit=crop&q=80", alt: "Miami Cuban Iced Chain" },
      { src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&h=1100&fit=crop&q=80", alt: "Miami Cuban Iced detail" },
    ],
    inStock: true, stockCount: 1, badge: "limited",
    tags: ["diamond", "cuban", "chain", "iced", "luxury", "miami"],
    reviews: [
      { id: 1, author: "Dwayne P.", rating: 5, title: "Show Stopper", text: "Absolutely incredible. The diamonds catch every light. I've never gotten so many compliments.", date: "2024-05-01", verified: true },
    ],
    rating: 5.0, reviewCount: 12, featured: true,
    financing: "As low as $742/mo with financing",
  },
  {
    id: "box-chain-platinum",
    slug: "platinum-box-chain",
    name: "Platinum Box Chain",
    sku: "MCG-CH-006",
    price: 6400,
    category: "chains",
    collection: "diamond-edit",
    material: "Platinum 950",
    weight: "38g",
    description: "A refined box chain crafted in platinum — the most precious of metals. Its clean geometric links create a sleek, modern silhouette that complements any pendant or stands alone as a mark of distinction.",
    shortDescription: "Refined platinum box chain with clean geometric links.",
    details: ["Platinum 950", '20" Length', "3mm Width", "Lobster Clasp"],
    specifications: { "Metal": "Platinum 950", "Length": '20 inches', "Width": "3mm", "Weight": "38 grams", "Clasp": "Platinum lobster clasp", "Hallmark": "PT950 MCG" },
    images: [
      { src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&h=1100&fit=crop&q=80", alt: "Platinum Box Chain" },
      { src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&h=1100&fit=crop&q=80", alt: "Platinum Box Chain detail" },
    ],
    inStock: true, stockCount: 4,
    tags: ["platinum", "box chain", "chain", "luxury"],
    reviews: [],
    rating: 4.8, reviewCount: 15, featured: false,
  },
  // ── NECKLACES ──
  {
    id: "soleil-diamond-pendant",
    slug: "soleil-diamond-pendant-necklace",
    name: "Soleil Diamond Pendant",
    sku: "MCG-NK-001",
    price: 6200,
    category: "necklaces",
    subcategory: "pendants",
    collection: "diamond-edit",
    material: "18K White Gold & Diamond",
    weight: "12g",
    description: "A radiant sun-inspired pendant featuring a 1.5ct center diamond surrounded by a halo of pavé diamonds. The design captures the brilliance of Miami's eternal sunshine in precious metal and stone.",
    shortDescription: "1.5ct diamond pendant with pavé halo — Miami sunshine captured in stone.",
    details: ["1.5ct Center Diamond", "VS1 Clarity", "18K White Gold", "GIA Certified"],
    specifications: { "Metal": "18K White Gold (750)", "Center Stone": "1.5ct Round Brilliant Diamond", "Clarity": "VS1", "Color": "F", "Chain": '18" 18K white gold cable chain', "Certificate": "GIA" },
    images: [
      { src: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=900&h=1100&fit=crop&q=80", alt: "Soleil Diamond Pendant" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=1100&fit=crop&q=80", alt: "Soleil Diamond Pendant detail" },
    ],
    inStock: true, stockCount: 3, badge: "bestseller",
    tags: ["diamond", "pendant", "necklace", "halo", "white gold"],
    reviews: [
      { id: 1, author: "Isabella V.", rating: 5, title: "My Dream Necklace", text: "My husband surprised me with this for our anniversary. I've never seen anything so beautiful.", date: "2024-02-14", verified: true },
    ],
    rating: 4.9, reviewCount: 34, featured: true,
    financing: "As low as $517/mo with financing",
  },
  {
    id: "layered-gold-necklace",
    slug: "three-layer-gold-necklace",
    name: "Three-Layer Gold Necklace",
    sku: "MCG-NK-002",
    price: 2400,
    category: "necklaces",
    collection: "miami-luxe",
    material: "14K Yellow Gold",
    weight: "15g",
    description: "Three delicate gold chains of varying lengths create an effortless layered look. Each chain features a different texture — satellite, cable, and herringbone — for visual depth and movement.",
    shortDescription: "Effortless three-layer gold necklace with mixed textures.",
    details: ["14K Yellow Gold", "16/18/20\" Lengths", "Mixed Textures", "Adjustable"],
    specifications: { "Metal": "14K Yellow Gold (585)", "Lengths": '16", 18", 20"', "Textures": "Satellite, Cable, Herringbone", "Weight": "15 grams total", "Clasp": "Single spring ring" },
    images: [
      { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=1100&fit=crop&q=80", alt: "Three-Layer Gold Necklace" },
      { src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&h=1100&fit=crop&q=80", alt: "Three-Layer Gold detail" },
    ],
    inStock: true, stockCount: 7, badge: "new",
    tags: ["gold", "layered", "necklace", "trendy", "miami"],
    reviews: [],
    rating: 4.7, reviewCount: 22, featured: false,
  },
  {
    id: "pearl-strand",
    slug: "south-sea-pearl-strand",
    name: "South Sea Pearl Strand",
    sku: "MCG-NK-003",
    price: 7800,
    category: "necklaces",
    collection: "heritage-gold",
    material: "South Sea Pearls & 18K Gold",
    weight: "45g",
    description: "A luminous strand of hand-matched South Sea pearls, each measuring 10-12mm. The warm, golden overtones of these rare pearls are perfectly complemented by an 18K gold clasp set with a single diamond.",
    shortDescription: "Hand-matched South Sea pearls with 18K gold diamond clasp.",
    details: ["South Sea Pearls", "10-12mm Size", "18K Gold Clasp", "Diamond Accent"],
    specifications: { "Pearls": "South Sea cultured", "Size": "10-12mm", "Count": "35 pearls", "Overtone": "Golden", "Clasp": "18K gold with 0.15ct diamond", "Length": '18 inches' },
    images: [
      { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=900&h=1100&fit=crop&q=80", alt: "South Sea Pearl Strand" },
      { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=1100&fit=crop&q=80", alt: "Pearl Strand detail" },
    ],
    inStock: true, stockCount: 2, badge: "limited",
    tags: ["pearl", "necklace", "south sea", "luxury", "classic"],
    reviews: [],
    rating: 5.0, reviewCount: 9, featured: true,
    financing: "As low as $650/mo with financing",
  },
  {
    id: "choker-diamond-bar",
    slug: "diamond-bar-choker",
    name: "Diamond Bar Choker",
    sku: "MCG-NK-004",
    price: 3600,
    category: "necklaces",
    collection: "miami-luxe",
    material: "18K Rose Gold & Diamonds",
    weight: "8g",
    description: "A sleek rose gold choker with a horizontal diamond bar pendant. The 0.75ct of pavé diamonds create an unbroken line of light that sits perfectly at the collarbone.",
    shortDescription: "Rose gold choker with 0.75ct diamond bar — modern elegance.",
    details: ["18K Rose Gold", "0.75ct Diamonds", '15" with 2" Extender', "Pavé Setting"],
    specifications: { "Metal": "18K Rose Gold (750)", "Diamonds": "0.75ct total", "Clarity": "VS2", "Color": "G-H", "Length": '15" + 2" extender', "Weight": "8 grams" },
    images: [
      { src: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=900&h=1100&fit=crop&q=80", alt: "Diamond Bar Choker" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=1100&fit=crop&q=80", alt: "Choker worn" },
    ],
    inStock: true, stockCount: 4,
    tags: ["choker", "diamond", "rose gold", "modern", "necklace"],
    reviews: [],
    rating: 4.8, reviewCount: 19, featured: false,
  },
  // ── BRACELETS ──
  {
    id: "cuban-link-bracelet",
    slug: "cuban-link-bracelet-18k",
    name: "Cuban Link Bracelet",
    sku: "MCG-BR-001",
    price: 2800,
    category: "bracelets",
    collection: "heritage-gold",
    material: "18K Yellow Gold",
    weight: "28g",
    description: "The wrist counterpart to our signature Cuban link chain. Each link is individually handcrafted and hand-finished for a seamless, comfortable fit that moves with you.",
    shortDescription: "Signature Cuban link bracelet — handcrafted 18K gold.",
    details: ["18K Yellow Gold", '8.5" Length', "8mm Width", "Box Clasp"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Length": '8.5 inches', "Width": "8mm", "Weight": "28 grams", "Clasp": "Box clasp with safety" },
    images: [
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=1100&fit=crop&q=80", alt: "Cuban Link Bracelet" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=1100&fit=crop&q=80", alt: "Cuban Link Bracelet worn" },
    ],
    inStock: true, stockCount: 6, badge: "bestseller",
    tags: ["gold", "cuban link", "bracelet", "heritage"],
    reviews: [
      { id: 1, author: "Roberto G.", rating: 5, title: "Matches My Chain Perfectly", text: "Ordered to match the Heritage Chain. The set together is phenomenal.", date: "2024-03-20", verified: true },
    ],
    rating: 4.9, reviewCount: 41, featured: true,
  },
  {
    id: "tennis-bracelet",
    slug: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    sku: "MCG-BR-002",
    price: 9400,
    category: "bracelets",
    collection: "diamond-edit",
    material: "Platinum & Diamonds",
    weight: "18g",
    description: "A classic tennis bracelet featuring 5.0 carats of perfectly matched round brilliant diamonds set in platinum. Each stone is individually selected for its fire and brilliance.",
    shortDescription: "5.0ct diamond tennis bracelet in platinum — timeless luxury.",
    details: ["5.0ct Diamonds", "Platinum 950", "VS1-VS2 Clarity", "D-F Color"],
    specifications: { "Metal": "Platinum 950", "Diamonds": "5.0ct total weight", "Stone Count": "42 round brilliants", "Clarity": "VS1-VS2", "Color": "D-F", "Length": '7 inches' },
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=1100&fit=crop&q=80", alt: "Diamond Tennis Bracelet" },
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=1100&fit=crop&q=80", alt: "Tennis Bracelet detail" },
    ],
    inStock: true, stockCount: 2, badge: "limited",
    tags: ["diamond", "tennis", "bracelet", "platinum", "luxury"],
    reviews: [],
    rating: 5.0, reviewCount: 14, featured: true,
    financing: "As low as $783/mo with financing",
  },
  {
    id: "bangle-gold-set",
    slug: "stacking-gold-bangle-set",
    name: "Stacking Bangle Set",
    sku: "MCG-BR-003",
    price: 1800,
    category: "bracelets",
    collection: "miami-luxe",
    material: "14K Mixed Gold",
    weight: "22g",
    description: "A set of five slim bangles in mixed gold tones — yellow, rose, and white. Designed to be stacked, layered, and mixed for a personalized, modern look.",
    shortDescription: "Five mixed-gold bangles for effortless stacking.",
    details: ["14K Yellow, Rose & White Gold", "Set of 5", "2.5\" Diameter", "Slip-On"],
    specifications: { "Metal": "14K Yellow, Rose & White Gold", "Count": "5 bangles", "Diameter": "2.5 inches", "Width": "2mm each", "Weight": "22 grams total" },
    images: [
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=1100&fit=crop&q=80", alt: "Stacking Bangle Set" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=1100&fit=crop&q=80", alt: "Bangles stacked" },
    ],
    inStock: true, stockCount: 10,
    tags: ["bangle", "stacking", "mixed gold", "set", "trendy"],
    reviews: [],
    rating: 4.6, reviewCount: 27, featured: false,
  },
  {
    id: "cuff-bracelet-deco",
    slug: "art-deco-gold-cuff",
    name: "Art Deco Gold Cuff",
    sku: "MCG-BR-004",
    price: 3400,
    category: "bracelets",
    collection: "miami-luxe",
    material: "18K Yellow Gold",
    weight: "35g",
    description: "A bold, architectural cuff inspired by Miami Beach's iconic Art Deco buildings. Geometric patterns are hand-engraved into solid 18K gold, creating a wearable work of art.",
    shortDescription: "Hand-engraved Art Deco cuff in solid 18K gold.",
    details: ["18K Yellow Gold", "Hand-Engraved", "Adjustable", "35mm Width"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Width": "35mm", "Weight": "35 grams", "Fit": "Adjustable (6-7.5\")", "Finish": "High polish with matte accents" },
    images: [
      { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&h=1100&fit=crop&q=80", alt: "Art Deco Gold Cuff" },
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=1100&fit=crop&q=80", alt: "Gold Cuff worn" },
    ],
    inStock: true, stockCount: 3, badge: "new",
    tags: ["cuff", "art deco", "gold", "bracelet", "statement"],
    reviews: [],
    rating: 4.8, reviewCount: 11, featured: false,
  },
  // ── RINGS ──
  {
    id: "cocktail-ring-deco",
    slug: "art-deco-cocktail-ring",
    name: "Art Deco Cocktail Ring",
    sku: "MCG-RG-001",
    price: 3400,
    category: "rings",
    collection: "miami-luxe",
    material: "18K Rose Gold, Emeralds & Diamonds",
    weight: "8g",
    description: "Inspired by Miami Beach's iconic architecture. Geometric patterns set with natural emeralds and round brilliant diamonds in 18K rose gold. A conversation piece that commands attention.",
    shortDescription: "Emerald and diamond cocktail ring with Art Deco geometry.",
    details: ["Natural Emeralds", "Round Brilliant Diamonds", "18K Rose Gold", "Size 5-9"],
    specifications: { "Metal": "18K Rose Gold (750)", "Center Stones": "2 natural emeralds, 0.8ct total", "Accent Diamonds": "0.45ct total", "Ring Size": "Available 5-9", "Weight": "8 grams" },
    images: [
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&h=1100&fit=crop&q=80", alt: "Art Deco Cocktail Ring" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=1100&fit=crop&q=80", alt: "Cocktail Ring detail" },
    ],
    inStock: true, stockCount: 4, badge: "bestseller",
    tags: ["ring", "cocktail", "emerald", "diamond", "art deco"],
    reviews: [
      { id: 1, author: "Sofia L.", rating: 5, title: "Stunning Conversation Piece", text: "Every time I wear this ring, someone asks me about it. The emeralds are gorgeous.", date: "2024-04-05", verified: true },
    ],
    rating: 4.9, reviewCount: 28, featured: true,
  },
  {
    id: "solitaire-engagement",
    slug: "classic-solitaire-engagement-ring",
    name: "Classic Solitaire Ring",
    sku: "MCG-RG-002",
    price: 12000,
    category: "rings",
    collection: "diamond-edit",
    material: "Platinum & Diamond",
    weight: "6g",
    description: "The quintessential engagement ring — a 2.0ct round brilliant diamond set in a six-prong platinum mounting. The elevated setting allows maximum light to enter the stone, creating extraordinary brilliance.",
    shortDescription: "2.0ct solitaire diamond in platinum — the ultimate engagement ring.",
    details: ["2.0ct Diamond", "Platinum 950", "VS1 Clarity", "GIA Certified"],
    specifications: { "Metal": "Platinum 950", "Center Stone": "2.0ct Round Brilliant", "Clarity": "VS1", "Color": "E", "Cut": "Excellent", "Certificate": "GIA" },
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=1100&fit=crop&q=80", alt: "Classic Solitaire Ring" },
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&h=1100&fit=crop&q=80", alt: "Solitaire detail" },
    ],
    inStock: true, stockCount: 3,
    tags: ["diamond", "solitaire", "engagement", "ring", "platinum"],
    reviews: [
      { id: 1, author: "Carlos R.", rating: 5, title: "She Said Yes!", text: "Had a custom engagement ring made here. The craftsmanship exceeded my expectations.", date: "2024-06-10", verified: true },
    ],
    rating: 5.0, reviewCount: 21, featured: true,
    financing: "As low as $1,000/mo with financing",
  },
  {
    id: "signet-ring-gold",
    slug: "heritage-signet-ring",
    name: "Heritage Signet Ring",
    sku: "MCG-RG-003",
    price: 1600,
    category: "rings",
    collection: "heritage-gold",
    material: "18K Yellow Gold",
    weight: "14g",
    description: "A substantial signet ring in 18K gold with a smooth, polished face ready for custom engraving. A timeless symbol of identity and heritage, worn by leaders throughout history.",
    shortDescription: "Classic 18K gold signet ring — engravable, timeless, substantial.",
    details: ["18K Yellow Gold", "14g Solid", "Engravable Face", "Size 7-13"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Face": "14x12mm oval", "Weight": "14 grams", "Size": "Available 7-13", "Engraving": "Custom engraving available" },
    images: [
      { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&h=1100&fit=crop&q=80", alt: "Heritage Signet Ring" },
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&h=1100&fit=crop&q=80", alt: "Signet Ring profile" },
    ],
    inStock: true, stockCount: 8,
    tags: ["ring", "signet", "gold", "engraving", "heritage"],
    reviews: [],
    rating: 4.7, reviewCount: 16, featured: false,
  },
  {
    id: "eternity-band",
    slug: "diamond-eternity-band",
    name: "Diamond Eternity Band",
    sku: "MCG-RG-004",
    price: 4200,
    category: "rings",
    collection: "diamond-edit",
    material: "18K White Gold & Diamonds",
    weight: "4g",
    description: "An unbroken circle of round brilliant diamonds set in 18K white gold. The shared-prong setting maximizes each stone's brilliance while creating the illusion of an endless ribbon of light.",
    shortDescription: "Full eternity band — an unbroken circle of diamonds.",
    details: ["2.0ct Total Diamonds", "18K White Gold", "Shared Prong", "VS2 Clarity"],
    specifications: { "Metal": "18K White Gold (750)", "Diamonds": "2.0ct total", "Count": "28 stones", "Clarity": "VS2", "Color": "F-G", "Size": "Available 4-8" },
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=1100&fit=crop&q=80", alt: "Diamond Eternity Band" },
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&h=1100&fit=crop&q=80", alt: "Eternity Band worn" },
    ],
    inStock: true, stockCount: 5,
    tags: ["diamond", "eternity", "band", "ring", "wedding"],
    reviews: [],
    rating: 4.9, reviewCount: 23, featured: false,
  },
  {
    id: "cuban-ring",
    slug: "cuban-link-ring",
    name: "Cuban Link Ring",
    sku: "MCG-RG-005",
    price: 950,
    category: "rings",
    collection: "heritage-gold",
    material: "14K Yellow Gold",
    weight: "6g",
    description: "Our iconic Cuban link pattern reimagined as a bold statement ring. The interlocking links wrap around the finger in solid 14K gold — the perfect complement to any Cuban link chain or bracelet.",
    shortDescription: "Cuban link pattern in a bold 14K gold statement ring.",
    details: ["14K Yellow Gold", "6mm Width", "Comfort Fit", "Size 7-13"],
    specifications: { "Metal": "14K Yellow Gold (585)", "Width": "6mm", "Weight": "6 grams", "Fit": "Comfort fit", "Size": "Available 7-13" },
    images: [
      { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&h=1100&fit=crop&q=80", alt: "Cuban Link Ring" },
      { src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&h=1100&fit=crop&q=80", alt: "Cuban Link Ring detail" },
    ],
    inStock: true, stockCount: 12,
    tags: ["ring", "cuban link", "gold", "statement"],
    reviews: [],
    rating: 4.6, reviewCount: 31, featured: false,
  },
  {
    id: "sapphire-halo-ring",
    slug: "ceylon-sapphire-halo-ring",
    name: "Ceylon Sapphire Halo Ring",
    sku: "MCG-RG-006",
    price: 7200,
    category: "rings",
    collection: "diamond-edit",
    material: "18K White Gold, Sapphire & Diamonds",
    weight: "5g",
    description: "A vivid 2.0ct Ceylon sapphire surrounded by a halo of brilliant-cut diamonds. The deep royal blue of the sapphire is enhanced by the white gold setting and sparkling diamond frame.",
    shortDescription: "2.0ct Ceylon sapphire with diamond halo in white gold.",
    details: ["2.0ct Ceylon Sapphire", "0.6ct Diamond Halo", "18K White Gold", "Size 5-8"],
    specifications: { "Metal": "18K White Gold (750)", "Center": "2.0ct Ceylon sapphire", "Halo": "0.6ct diamonds, VS1, F-G", "Origin": "Sri Lanka (Ceylon)", "Size": "Available 5-8" },
    images: [
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&h=1100&fit=crop&q=80", alt: "Ceylon Sapphire Halo Ring" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=1100&fit=crop&q=80", alt: "Sapphire Ring detail" },
    ],
    inStock: true, stockCount: 2, badge: "new",
    tags: ["sapphire", "halo", "ring", "ceylon", "diamond"],
    reviews: [],
    rating: 4.9, reviewCount: 7, featured: true,
    financing: "As low as $600/mo with financing",
  },
  // ── WATCHES ──
  {
    id: "dress-watch-gold",
    slug: "heritage-dress-watch",
    name: "Heritage Dress Watch",
    sku: "MCG-WT-001",
    price: 15000,
    category: "watches",
    collection: "heritage-gold",
    material: "18K Yellow Gold",
    weight: "85g",
    description: "A refined dress watch in solid 18K yellow gold with a Swiss automatic movement. The champagne dial features applied gold indices and dauphine hands — understated luxury for the connoisseur.",
    shortDescription: "Swiss automatic dress watch in solid 18K gold.",
    details: ["18K Yellow Gold Case", "Swiss Automatic", "Sapphire Crystal", "Champagne Dial"],
    specifications: { "Case": "18K Yellow Gold, 38mm", "Movement": "Swiss automatic", "Crystal": "Sapphire, anti-reflective", "Dial": "Champagne with applied gold indices", "Water Resistance": "30m", "Strap": "18K gold bracelet" },
    images: [
      { src: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&h=1100&fit=crop&q=80", alt: "Heritage Dress Watch" },
      { src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&h=1100&fit=crop&q=80", alt: "Dress Watch on wrist" },
    ],
    inStock: true, stockCount: 1, badge: "limited",
    tags: ["watch", "gold", "automatic", "swiss", "dress"],
    reviews: [],
    rating: 5.0, reviewCount: 5, featured: true,
    financing: "As low as $1,250/mo with financing",
  },
  {
    id: "sport-watch-steel",
    slug: "sport-chronograph-watch",
    name: "Sport Chronograph",
    sku: "MCG-WT-002",
    price: 8500,
    category: "watches",
    collection: "miami-luxe",
    material: "Stainless Steel & Ceramic",
    weight: "120g",
    description: "A modern sport chronograph with a ceramic bezel and stainless steel case. The deep blue dial is complemented by luminous markers and a tachymeter scale — built for performance, designed for style.",
    shortDescription: "Modern sport chronograph with ceramic bezel and blue dial.",
    details: ["Stainless Steel Case", "Ceramic Bezel", "Swiss Automatic", "100m WR"],
    specifications: { "Case": "316L Stainless Steel, 42mm", "Bezel": "Ceramic, unidirectional", "Movement": "Swiss automatic chronograph", "Dial": "Deep blue sunburst", "Water Resistance": "100m", "Crystal": "Sapphire" },
    images: [
      { src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&h=1100&fit=crop&q=80", alt: "Sport Chronograph" },
      { src: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&h=1100&fit=crop&q=80", alt: "Chronograph detail" },
    ],
    inStock: true, stockCount: 3,
    tags: ["watch", "chronograph", "sport", "ceramic", "steel"],
    reviews: [],
    rating: 4.8, reviewCount: 12, featured: false,
    financing: "As low as $708/mo with financing",
  },
  {
    id: "diamond-watch-ladies",
    slug: "ladies-diamond-watch",
    name: "Ladies Diamond Watch",
    sku: "MCG-WT-003",
    price: 11000,
    category: "watches",
    collection: "diamond-edit",
    material: "18K White Gold & Diamonds",
    weight: "55g",
    description: "An exquisite ladies' timepiece with a diamond-set bezel and mother-of-pearl dial. The delicate 18K white gold bracelet is designed for the most refined wrists.",
    shortDescription: "Diamond-set ladies watch with mother-of-pearl dial.",
    details: ["18K White Gold", "Diamond Bezel", "Mother of Pearl Dial", "Swiss Quartz"],
    specifications: { "Case": "18K White Gold, 28mm", "Bezel": "0.8ct diamonds", "Dial": "Mother of pearl with diamond markers", "Movement": "Swiss quartz", "Bracelet": "18K white gold", "Water Resistance": "30m" },
    images: [
      { src: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&h=1100&fit=crop&q=80", alt: "Ladies Diamond Watch" },
      { src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&h=1100&fit=crop&q=80", alt: "Diamond Watch detail" },
    ],
    inStock: true, stockCount: 2,
    tags: ["watch", "diamond", "ladies", "white gold", "luxury"],
    reviews: [],
    rating: 4.9, reviewCount: 8, featured: false,
    financing: "As low as $917/mo with financing",
  },
  // ── EARRINGS ──
  {
    id: "diamond-studs",
    slug: "diamond-stud-earrings",
    name: "Diamond Stud Earrings",
    sku: "MCG-ER-001",
    price: 4800,
    category: "earrings",
    collection: "diamond-edit",
    material: "Platinum & Diamonds",
    weight: "3g",
    description: "Classic diamond studs featuring a matched pair of 1.0ct round brilliant diamonds in platinum four-prong settings. The push-back posts ensure secure, comfortable wear.",
    shortDescription: "1.0ct each diamond studs in platinum — a timeless essential.",
    details: ["2.0ct Total Weight", "Platinum Settings", "VS1 Clarity", "GIA Certified"],
    specifications: { "Metal": "Platinum 950", "Diamonds": "2.0ct total (1.0ct each)", "Shape": "Round Brilliant", "Clarity": "VS1", "Color": "E-F", "Certificate": "GIA" },
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=1100&fit=crop&q=80", alt: "Diamond Stud Earrings" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=1100&fit=crop&q=80", alt: "Studs detail" },
    ],
    inStock: true, stockCount: 6, badge: "bestseller",
    tags: ["diamond", "studs", "earrings", "platinum", "classic"],
    reviews: [
      { id: 1, author: "Maria L.", rating: 5, title: "Perfect Every Day", text: "I never take these off. The brilliance is incredible for their size.", date: "2024-01-15", verified: true },
    ],
    rating: 4.9, reviewCount: 52, featured: true,
    financing: "As low as $400/mo with financing",
  },
  {
    id: "gold-hoops-large",
    slug: "oversized-gold-hoops",
    name: "Oversized Gold Hoops",
    sku: "MCG-ER-002",
    price: 1200,
    category: "earrings",
    collection: "miami-luxe",
    material: "14K Yellow Gold",
    weight: "8g",
    description: "Bold, oversized hoops in polished 14K gold. The 50mm diameter creates a dramatic silhouette that captures the spirit of Miami glamour. Lightweight despite their size for all-day comfort.",
    shortDescription: "Bold 50mm gold hoops — Miami glamour in 14K gold.",
    details: ["14K Yellow Gold", "50mm Diameter", "3mm Thick", "Click-Top Closure"],
    specifications: { "Metal": "14K Yellow Gold (585)", "Diameter": "50mm", "Thickness": "3mm", "Weight": "8 grams", "Closure": "Click-top" },
    images: [
      { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=1100&fit=crop&q=80", alt: "Oversized Gold Hoops" },
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=1100&fit=crop&q=80", alt: "Gold Hoops worn" },
    ],
    inStock: true, stockCount: 15,
    tags: ["hoops", "gold", "earrings", "oversized", "miami"],
    reviews: [],
    rating: 4.7, reviewCount: 38, featured: false,
  },
  {
    id: "drop-earrings-emerald",
    slug: "emerald-drop-earrings",
    name: "Emerald Drop Earrings",
    sku: "MCG-ER-003",
    price: 5600,
    category: "earrings",
    collection: "miami-luxe",
    material: "18K Yellow Gold & Emeralds",
    weight: "6g",
    description: "Elegant drop earrings featuring pear-shaped Colombian emeralds suspended from diamond-set hooks. The vivid green stones are a striking contrast to the warm gold settings.",
    shortDescription: "Colombian emerald drops with diamond-set hooks in 18K gold.",
    details: ["Colombian Emeralds", "Diamond Hooks", "18K Yellow Gold", "Pear Shape"],
    specifications: { "Metal": "18K Yellow Gold (750)", "Emeralds": "2.4ct total (1.2ct each)", "Diamonds": "0.3ct total in hooks", "Origin": "Colombia", "Length": "35mm drop" },
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=1100&fit=crop&q=80", alt: "Emerald Drop Earrings" },
      { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=1100&fit=crop&q=80", alt: "Emerald Drops worn" },
    ],
    inStock: true, stockCount: 2, badge: "new",
    tags: ["emerald", "drop", "earrings", "gold", "colombian"],
    reviews: [],
    rating: 5.0, reviewCount: 6, featured: true,
    financing: "As low as $467/mo with financing",
  },
  // ── PENDANTS ──
  {
    id: "cross-pendant-diamond",
    slug: "diamond-cross-pendant",
    name: "Diamond Cross Pendant",
    sku: "MCG-PD-001",
    price: 3200,
    category: "pendants",
    collection: "heritage-gold",
    material: "18K Yellow Gold & Diamonds",
    weight: "8g",
    description: "A classic cross pendant set with round brilliant diamonds in 18K yellow gold. The timeless design is elevated by the quality of the stones and the precision of the setting.",
    shortDescription: "Diamond-set cross pendant in 18K gold — faith meets luxury.",
    details: ["18K Yellow Gold", "0.5ct Diamonds", "VS2 Clarity", '20" Chain Included'],
    specifications: { "Metal": "18K Yellow Gold (750)", "Diamonds": "0.5ct total", "Clarity": "VS2", "Color": "G-H", "Pendant Size": "25x18mm", "Chain": '20" cable chain' },
    images: [
      { src: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=900&h=1100&fit=crop&q=80", alt: "Diamond Cross Pendant" },
      { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=900&h=1100&fit=crop&q=80", alt: "Cross Pendant worn" },
    ],
    inStock: true, stockCount: 5,
    tags: ["cross", "pendant", "diamond", "gold", "religious"],
    reviews: [],
    rating: 4.8, reviewCount: 19, featured: false,
  },
  {
    id: "initial-pendant",
    slug: "custom-initial-pendant",
    name: "Custom Initial Pendant",
    sku: "MCG-PD-002",
    price: 890,
    category: "pendants",
    collection: "miami-luxe",
    material: "14K Yellow Gold",
    weight: "4g",
    description: "A personalized initial pendant in polished 14K gold. Choose your letter, rendered in an elegant serif font. Includes a delicate cable chain. The perfect personalized gift.",
    shortDescription: "Personalized initial pendant in 14K gold — elegant gifting.",
    details: ["14K Yellow Gold", "Custom Letter", '18" Chain Included', "Gift Box"],
    specifications: { "Metal": "14K Yellow Gold (585)", "Size": "15mm height", "Font": "Classic serif", "Chain": '18" cable chain', "Personalization": "Any single letter A-Z" },
    images: [
      { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=900&h=1100&fit=crop&q=80", alt: "Custom Initial Pendant" },
      { src: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=900&h=1100&fit=crop&q=80", alt: "Initial Pendant detail" },
    ],
    inStock: true, stockCount: 20,
    tags: ["initial", "pendant", "personalized", "gold", "gift"],
    reviews: [],
    rating: 4.5, reviewCount: 45, featured: false,
  },
  {
    id: "evil-eye-pendant",
    slug: "evil-eye-diamond-pendant",
    name: "Evil Eye Diamond Pendant",
    sku: "MCG-PD-003",
    price: 2200,
    category: "pendants",
    collection: "miami-luxe",
    material: "18K White Gold, Sapphires & Diamonds",
    weight: "5g",
    description: "A contemporary take on the ancient evil eye motif, set with blue sapphires and diamonds in 18K white gold. A protective talisman reimagined as a luxury statement piece.",
    shortDescription: "Sapphire and diamond evil eye pendant in 18K white gold.",
    details: ["18K White Gold", "Blue Sapphires", "Diamond Surround", '18" Chain'],
    specifications: { "Metal": "18K White Gold (750)", "Sapphires": "0.3ct total", "Diamonds": "0.2ct total", "Size": "12mm diameter", "Chain": '18" cable chain' },
    images: [
      { src: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=900&h=1100&fit=crop&q=80", alt: "Evil Eye Diamond Pendant" },
      { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=900&h=1100&fit=crop&q=80", alt: "Evil Eye Pendant worn" },
    ],
    inStock: true, stockCount: 7,
    tags: ["evil eye", "pendant", "sapphire", "diamond", "protection"],
    reviews: [],
    rating: 4.7, reviewCount: 14, featured: false,
  },
  {
    id: "medallion-pendant",
    slug: "heritage-gold-medallion",
    name: "Heritage Gold Medallion",
    sku: "MCG-PD-004",
    price: 2800,
    category: "pendants",
    collection: "heritage-gold",
    material: "18K Yellow Gold",
    weight: "15g",
    description: "A substantial gold medallion featuring hand-engraved scrollwork inspired by Spanish colonial design. The heavy 18K gold disc hangs from a bold bail — a statement of heritage and strength.",
    shortDescription: "Hand-engraved 18K gold medallion with colonial-inspired scrollwork.",
    details: ["18K Yellow Gold", "Hand-Engraved", "30mm Diameter", '24" Chain'],
    specifications: { "Metal": "18K Yellow Gold (750)", "Diameter": "30mm", "Weight": "15 grams (pendant only)", "Engraving": "Hand-engraved scrollwork", "Chain": '24" Franco chain' },
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=1100&fit=crop&q=80", alt: "Heritage Gold Medallion" },
      { src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&h=1100&fit=crop&q=80", alt: "Medallion detail" },
    ],
    inStock: true, stockCount: 3,
    tags: ["medallion", "pendant", "gold", "heritage", "engraved"],
    reviews: [],
    rating: 4.8, reviewCount: 10, featured: false,
  },
];

// ─── Helper Functions ───
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.material.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
