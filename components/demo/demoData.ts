export interface DemoProduct {
  id: string
  name: string
  sku: string
  price: number
  cost: number
  salePrice: number | null
  quantity: number
  category: 'tops' | 'bottoms' | 'footwear' | 'outerwear' | 'dresses'
  isActive: boolean
  isOnSale: boolean
  image: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface ActivityLogEntry {
  id: string
  timestamp: number
  action: 'added' | 'edited' | 'toggled_sale' | 'toggled_status' | 'purchased' | 'stock_changed' | 'deleted'
  productName: string
  details: string
}

export interface SaleRecord {
  id: string
  timestamp: number
  items: { productName: string; quantity: number; price: number; cost: number }[]
  total: number
  totalCost: number
}

export const categoryEmojis: Record<DemoProduct['category'], string> = {
  tops: '👕',
  bottoms: '👖',
  footwear: '👟',
  outerwear: '🧥',
  dresses: '👗',
}

export const initialProducts: DemoProduct[] = [
  {
    id: 'prod-1',
    name: 'Classic White Tee',
    sku: 'TEE-WHT-001',
    price: 24.99,
    cost: 8.50,
    salePrice: null,
    quantity: 45,
    category: 'tops',
    isActive: true,
    isOnSale: false,
    image: '👕',
  },
  {
    id: 'prod-2',
    name: 'Slim Fit Jeans',
    sku: 'JNS-BLU-002',
    price: 59.99,
    cost: 22.00,
    salePrice: 44.99,
    quantity: 30,
    category: 'bottoms',
    isActive: true,
    isOnSale: true,
    image: '👖',
  },
  {
    id: 'prod-3',
    name: 'Running Sneakers',
    sku: 'SNK-BLK-003',
    price: 89.99,
    cost: 35.00,
    salePrice: null,
    quantity: 18,
    category: 'footwear',
    isActive: true,
    isOnSale: false,
    image: '👟',
  },
  {
    id: 'prod-4',
    name: 'Zip-Up Hoodie',
    sku: 'HOD-GRY-004',
    price: 49.99,
    cost: 18.00,
    salePrice: null,
    quantity: 3,
    category: 'outerwear',
    isActive: true,
    isOnSale: false,
    image: '🧥',
  },
  {
    id: 'prod-5',
    name: 'Summer Dress',
    sku: 'DRS-FLR-005',
    price: 39.99,
    cost: 14.00,
    salePrice: 29.99,
    quantity: 22,
    category: 'dresses',
    isActive: true,
    isOnSale: true,
    image: '👗',
  },
  {
    id: 'prod-6',
    name: 'Graphic Tee',
    sku: 'TEE-GFX-006',
    price: 29.99,
    cost: 10.00,
    salePrice: null,
    quantity: 0,
    category: 'tops',
    isActive: true,
    isOnSale: false,
    image: '👕',
  },
  {
    id: 'prod-7',
    name: 'Cargo Pants',
    sku: 'PNT-KHK-007',
    price: 54.99,
    cost: 20.00,
    salePrice: null,
    quantity: 15,
    category: 'bottoms',
    isActive: false,
    isOnSale: false,
    image: '👖',
  },
  {
    id: 'prod-8',
    name: 'Canvas Sneakers',
    sku: 'SNK-WHT-008',
    price: 44.99,
    cost: 16.00,
    salePrice: null,
    quantity: 2,
    category: 'footwear',
    isActive: true,
    isOnSale: false,
    image: '👟',
  },
]

// Seed sales history — looks like today's earlier transactions
const now = Date.now()
export const initialSalesHistory: SaleRecord[] = [
  {
    id: 'sale-seed-1',
    timestamp: now - 3 * 60 * 60 * 1000, // 3 hours ago
    items: [
      { productName: 'Classic White Tee', quantity: 2, price: 24.99, cost: 8.50 },
      { productName: 'Slim Fit Jeans', quantity: 1, price: 44.99, cost: 22.00 },
    ],
    total: 94.97,
    totalCost: 39.00,
  },
  {
    id: 'sale-seed-2',
    timestamp: now - 2 * 60 * 60 * 1000, // 2 hours ago
    items: [
      { productName: 'Running Sneakers', quantity: 1, price: 89.99, cost: 35.00 },
      { productName: 'Summer Dress', quantity: 2, price: 29.99, cost: 14.00 },
    ],
    total: 149.97,
    totalCost: 63.00,
  },
  {
    id: 'sale-seed-3',
    timestamp: now - 1.5 * 60 * 60 * 1000, // 1.5 hours ago
    items: [
      { productName: 'Zip-Up Hoodie', quantity: 1, price: 49.99, cost: 18.00 },
    ],
    total: 49.99,
    totalCost: 18.00,
  },
  {
    id: 'sale-seed-4',
    timestamp: now - 45 * 60 * 1000, // 45 min ago
    items: [
      { productName: 'Classic White Tee', quantity: 3, price: 24.99, cost: 8.50 },
      { productName: 'Canvas Sneakers', quantity: 1, price: 44.99, cost: 16.00 },
    ],
    total: 119.96,
    totalCost: 41.50,
  },
  {
    id: 'sale-seed-5',
    timestamp: now - 15 * 60 * 1000, // 15 min ago
    items: [
      { productName: 'Summer Dress', quantity: 1, price: 29.99, cost: 14.00 },
      { productName: 'Slim Fit Jeans', quantity: 2, price: 44.99, cost: 22.00 },
    ],
    total: 119.97,
    totalCost: 58.00,
  },
]

export const initialActivityLog: ActivityLogEntry[] = [
  { id: 'log-seed-1', timestamp: now - 15 * 60 * 1000, action: 'purchased', productName: 'Summer Dress', details: '1 unit sold' },
  { id: 'log-seed-2', timestamp: now - 15 * 60 * 1000, action: 'purchased', productName: 'Slim Fit Jeans', details: '2 units sold' },
  { id: 'log-seed-3', timestamp: now - 45 * 60 * 1000, action: 'purchased', productName: 'Classic White Tee', details: '3 units sold' },
  { id: 'log-seed-4', timestamp: now - 45 * 60 * 1000, action: 'purchased', productName: 'Canvas Sneakers', details: '1 unit sold' },
  { id: 'log-seed-5', timestamp: now - 1.5 * 60 * 60 * 1000, action: 'purchased', productName: 'Zip-Up Hoodie', details: '1 unit sold' },
  { id: 'log-seed-6', timestamp: now - 2 * 60 * 60 * 1000, action: 'toggled_sale', productName: 'Slim Fit Jeans', details: 'On sale at $44.99' },
  { id: 'log-seed-7', timestamp: now - 2 * 60 * 60 * 1000, action: 'toggled_sale', productName: 'Summer Dress', details: 'On sale at $29.99' },
  { id: 'log-seed-8', timestamp: now - 3 * 60 * 60 * 1000, action: 'added', productName: 'Canvas Sneakers', details: 'Added to inventory' },
  { id: 'log-seed-9', timestamp: now - 4 * 60 * 60 * 1000, action: 'toggled_status', productName: 'Cargo Pants', details: 'Unlisted' },
  { id: 'log-seed-10', timestamp: now - 5 * 60 * 60 * 1000, action: 'stock_changed', productName: 'Classic White Tee', details: 'Restocked to 45 units' },
]
