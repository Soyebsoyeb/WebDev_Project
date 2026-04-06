export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  style: string;
  monthly_price: number;
  dimensions: string;
  material: string;
  images: string[];
  description: string;
}

export const inventoryMock: InventoryItem[] = [
  {
    id: '1',
    sku: 'DSK-WAL-001',
    name: 'Walnut Sit-Stand Desk',
    category: 'Office',
    style: 'Mid-Century',
    monthly_price: 49,
    dimensions: '48"x24"x30-48"',
    material: 'Walnut Wood / Steel',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'],
    description: 'A premium motorized sit-stand desk wrapped in pure walnut. Ergonomic design meets mid-century styling.'
  },
  {
    id: '2',
    sku: 'SOF-CLD-002',
    name: 'Cloud Sofa',
    category: 'Living',
    style: 'Scandi',
    monthly_price: 89,
    dimensions: '78"x35"x32"',
    material: 'Beige Fabric',
    images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'],
    description: 'Irresistibly soft deep-seating sofa with pillowy cushions.'
  },
  {
    id: '3',
    sku: 'CHR-EAM-003',
    name: 'Eames-style Lounge Chair',
    category: 'Living',
    style: 'Mid-Century',
    monthly_price: 59,
    dimensions: '32"x30"x32"',
    material: 'Walnut / Black Leather',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'],
    description: 'A classic silhouette providing the ultimate luxury seating.'
  },
  {
    id: '4',
    sku: 'BED-JAP-004',
    name: 'Japandi Bed Frame',
    category: 'Bedroom',
    style: 'Japandi',
    monthly_price: 79,
    dimensions: 'Queen',
    material: 'Natural Oak / Linen',
    images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80'],
    description: 'Minimalist platform bed blending Japanese and Scandinavian notes.'
  },
  {
    id: '5',
    sku: 'BKS-IND-005',
    name: 'Industrial Bookshelf',
    category: 'Living',
    style: 'Industrial',
    monthly_price: 39,
    dimensions: '72"x12"x72"',
    material: 'Black Metal / Reclaimed Wood',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    description: 'Tall geometric shelving perfect for dividing rooms or displaying accents.'
  },
  {
    id: '6',
    sku: 'RUG-BOH-006',
    name: 'Bohemian Rug',
    category: 'Living',
    style: 'Bohemian',
    monthly_price: 19,
    dimensions: '5x8',
    material: 'Wool',
    images: ['https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&q=80'],
    description: 'Hand-woven rug bringing warmth and vibrant geometric patterns to any room.'
  },
  {
    id: '7',
    sku: 'LMP-SCA-007',
    name: 'Scandi Floor Lamp',
    category: 'Any',
    style: 'Scandi',
    monthly_price: 15,
    dimensions: '58" tall',
    material: 'Brass / Off-white shade',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    description: 'Elegant down-light floor lamp providing ambient warmth.'
  },
  {
    id: '8',
    sku: 'TBL-MOD-008',
    name: 'Modular Coffee Table',
    category: 'Living',
    style: 'Minimalist',
    monthly_price: 29,
    dimensions: '40"x20"x16"',
    material: 'White Oak',
    images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'],
    description: 'Low-profile solid wood table complementing any modern sofa.'
  },
  {
    id: '9',
    sku: 'CHR-ERG-009',
    name: 'Ergonomic Office Chair',
    category: 'Office',
    style: 'Modern',
    monthly_price: 35,
    dimensions: 'Standard',
    material: 'Mesh / Polycarbonate',
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80'],
    description: 'Supportive mesh chair designed for 8+ hour continuous use.'
  },
  {
    id: '10',
    sku: 'CHR-VEL-010',
    name: 'Velvet Accent Chair',
    category: 'Living',
    style: 'Maximalist',
    monthly_price: 45,
    dimensions: '28"x30"x32"',
    material: 'Emerald Green Velvet',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
    description: 'A striking emerald chair that brings a pop of richness to your interior.'
  }
];
