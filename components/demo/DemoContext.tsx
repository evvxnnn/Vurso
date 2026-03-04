'use client'

import { createContext, useContext, useReducer, useMemo, useCallback, ReactNode } from 'react'
import { DemoProduct, CartItem, ActivityLogEntry, SaleRecord, initialProducts, initialSalesHistory, initialActivityLog, categoryEmojis } from './demoData'

interface DemoState {
  products: DemoProduct[]
  cart: CartItem[]
  activityLog: ActivityLogEntry[]
  salesHistory: SaleRecord[]
  nextProductNum: number
}

type DemoAction =
  | { type: 'ADD_PRODUCT'; payload: Omit<DemoProduct, 'id' | 'sku' | 'image'> & { name: string } }
  | { type: 'EDIT_PRODUCT'; payload: { id: string; updates: Partial<DemoProduct> } }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'TOGGLE_SALE'; payload: { id: string; salePrice?: number } }
  | { type: 'TOGGLE_ACTIVE'; payload: string }
  | { type: 'ADD_TO_CART'; payload: { productId: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QTY'; payload: { productId: string; quantity: number } }
  | { type: 'CHECKOUT' }
  | { type: 'RESET_DEMO' }

interface DemoContextValue {
  state: DemoState
  dispatch: React.Dispatch<DemoAction>
  activeProducts: DemoProduct[]
  customerProducts: DemoProduct[]
  cartTotal: number
  cartItemCount: number
  inventoryValue: number
  retailValue: number
  lowStockProducts: DemoProduct[]
  getCartProduct: (productId: string) => DemoProduct | undefined
}

function logEntry(action: ActivityLogEntry['action'], productName: string, details: string): ActivityLogEntry {
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    action,
    productName,
    details,
  }
}

function generateSku(category: string, num: number): string {
  const prefixes: Record<string, string> = {
    tops: 'TOP', bottoms: 'BTM', footwear: 'FTW', outerwear: 'OTR', dresses: 'DRS',
  }
  const prefix = prefixes[category] || 'PRD'
  return `${prefix}-${String(num).padStart(3, '0')}`
}

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const num = state.nextProductNum
      const newProduct: DemoProduct = {
        ...action.payload,
        id: `prod-${num}`,
        sku: generateSku(action.payload.category, num),
        image: categoryEmojis[action.payload.category] || '📦',
      }
      return {
        ...state,
        products: [...state.products, newProduct],
        nextProductNum: num + 1,
        activityLog: [logEntry('added', newProduct.name, `Added to inventory`), ...state.activityLog],
      }
    }
    case 'EDIT_PRODUCT': {
      const { id, updates } = action.payload
      const product = state.products.find(p => p.id === id)
      if (!product) return state
      const updatedProduct = { ...product, ...updates }
      if (updates.category && updates.category !== product.category) {
        updatedProduct.image = categoryEmojis[updates.category] || '📦'
      }
      return {
        ...state,
        products: state.products.map(p => p.id === id ? updatedProduct : p),
        activityLog: [logEntry('edited', updatedProduct.name, `Product updated`), ...state.activityLog],
      }
    }
    case 'DELETE_PRODUCT': {
      const product = state.products.find(p => p.id === action.payload)
      if (!product) return state
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        cart: state.cart.filter(c => c.productId !== action.payload),
        activityLog: [logEntry('deleted', product.name, `Removed from inventory`), ...state.activityLog],
      }
    }
    case 'TOGGLE_SALE': {
      const { id, salePrice } = action.payload
      const product = state.products.find(p => p.id === id)
      if (!product) return state
      const nowOnSale = !product.isOnSale
      const updated = {
        ...product,
        isOnSale: nowOnSale,
        salePrice: nowOnSale ? (salePrice ?? Math.round(product.price * 0.75 * 100) / 100) : null,
      }
      return {
        ...state,
        products: state.products.map(p => p.id === id ? updated : p),
        activityLog: [
          logEntry('toggled_sale', product.name, nowOnSale ? `On sale at $${updated.salePrice?.toFixed(2)}` : 'Sale ended'),
          ...state.activityLog,
        ],
      }
    }
    case 'TOGGLE_ACTIVE': {
      const product = state.products.find(p => p.id === action.payload)
      if (!product) return state
      const nowActive = !product.isActive
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload ? { ...p, isActive: nowActive } : p),
        cart: nowActive ? state.cart : state.cart.filter(c => c.productId !== action.payload),
        activityLog: [
          logEntry('toggled_status', product.name, nowActive ? 'Listed for sale' : 'Unlisted'),
          ...state.activityLog,
        ],
      }
    }
    case 'ADD_TO_CART': {
      const { productId } = action.payload
      const existing = state.cart.find(c => c.productId === productId)
      const product = state.products.find(p => p.id === productId)
      if (!product || product.quantity === 0) return state
      const currentQty = existing?.quantity ?? 0
      if (currentQty >= product.quantity) return state
      return {
        ...state,
        cart: existing
          ? state.cart.map(c => c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c)
          : [...state.cart, { productId, quantity: 1 }],
      }
    }
    case 'REMOVE_FROM_CART': {
      return { ...state, cart: state.cart.filter(c => c.productId !== action.payload) }
    }
    case 'UPDATE_CART_QTY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) return { ...state, cart: state.cart.filter(c => c.productId !== productId) }
      const product = state.products.find(p => p.id === productId)
      if (!product) return state
      const clampedQty = Math.min(quantity, product.quantity)
      return {
        ...state,
        cart: state.cart.map(c => c.productId === productId ? { ...c, quantity: clampedQty } : c),
      }
    }
    case 'CHECKOUT': {
      if (state.cart.length === 0) return state
      const saleItems = state.cart.map(c => {
        const product = state.products.find(p => p.id === c.productId)!
        const price = product.isOnSale && product.salePrice ? product.salePrice : product.price
        return { productName: product.name, quantity: c.quantity, price, cost: product.cost }
      })
      const saleTotal = saleItems.reduce((s, i) => s + i.price * i.quantity, 0)
      const saleCost = saleItems.reduce((s, i) => s + i.cost * i.quantity, 0)
      const sale: SaleRecord = {
        id: `sale-${Date.now()}`,
        timestamp: Date.now(),
        items: saleItems,
        total: saleTotal,
        totalCost: saleCost,
      }
      const updatedProducts = state.products.map(p => {
        const cartItem = state.cart.find(c => c.productId === p.id)
        if (!cartItem) return p
        return { ...p, quantity: Math.max(0, p.quantity - cartItem.quantity) }
      })
      const purchaseLog = state.cart.map(c => {
        const product = state.products.find(p => p.id === c.productId)
        return logEntry('purchased', product?.name ?? 'Unknown', `${c.quantity} unit${c.quantity > 1 ? 's' : ''} sold`)
      })
      return {
        ...state,
        products: updatedProducts,
        cart: [],
        salesHistory: [...state.salesHistory, sale],
        activityLog: [...purchaseLog, ...state.activityLog],
      }
    }
    case 'RESET_DEMO': {
      return {
        products: initialProducts,
        cart: [],
        activityLog: [],
        salesHistory: initialSalesHistory,
        nextProductNum: 9,
      }
    }
    default:
      return state
  }
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, {
    products: initialProducts,
    cart: [],
    activityLog: [],
    salesHistory: initialSalesHistory,
    nextProductNum: 9,
  })

  const activeProducts = useMemo(() => state.products.filter(p => p.isActive), [state.products])
  const customerProducts = useMemo(() => state.products.filter(p => p.isActive && p.quantity > 0), [state.products])
  const lowStockProducts = useMemo(() => state.products.filter(p => p.isActive && p.quantity > 0 && p.quantity < 5), [state.products])

  const inventoryValue = useMemo(
    () => state.products.reduce((sum, p) => sum + p.cost * p.quantity, 0),
    [state.products]
  )
  const retailValue = useMemo(
    () => state.products.reduce((sum, p) => sum + (p.isOnSale && p.salePrice ? p.salePrice : p.price) * p.quantity, 0),
    [state.products]
  )

  const cartTotal = useMemo(
    () => state.cart.reduce((sum, c) => {
      const product = state.products.find(p => p.id === c.productId)
      if (!product) return sum
      const price = product.isOnSale && product.salePrice ? product.salePrice : product.price
      return sum + price * c.quantity
    }, 0),
    [state.cart, state.products]
  )

  const cartItemCount = useMemo(
    () => state.cart.reduce((sum, c) => sum + c.quantity, 0),
    [state.cart]
  )

  const getCartProduct = useCallback(
    (productId: string) => state.products.find(p => p.id === productId),
    [state.products]
  )

  const value = useMemo<DemoContextValue>(() => ({
    state, dispatch, activeProducts, customerProducts, cartTotal, cartItemCount,
    inventoryValue, retailValue, lowStockProducts, getCartProduct,
  }), [state, activeProducts, customerProducts, cartTotal, cartItemCount, inventoryValue, retailValue, lowStockProducts])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemoContext() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemoContext must be used within DemoProvider')
  return ctx
}
