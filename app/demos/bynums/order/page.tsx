'use client'

import { useState } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { ShoppingBag, Plus, Minus, X, ChevronRight, Check, Clock } from 'lucide-react'

/* ── Order Menu Data ── */
interface OrderItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  tag?: string
}

const ORDER_CATEGORIES = [
  'Beginnings',
  'Salads',
  'Steaks & Entrées',
  'Seafood',
  'Chicken & Pasta',
  'Lunch Specials',
  'Sides & Extras',
  'Beverages',
] as const

const ORDER_ITEMS: OrderItem[] = [
  // Beginnings
  { id: 'app-1', name: 'Shrimp Cocktail', description: 'Jumbo shrimp with house cocktail sauce', price: 17, category: 'Beginnings' },
  { id: 'app-2', name: 'Lobster Voodoo', description: 'Fried lobster tail in spicy voodoo sauce', price: 29, category: 'Beginnings', tag: 'Popular' },
  { id: 'app-3', name: 'Boom Boom Shrimp', description: 'Breaded shrimp in remoulade sauce', price: 17, category: 'Beginnings' },
  { id: 'app-4', name: 'Onion Flower', description: 'Battered and fried with special sauce', price: 14, category: 'Beginnings' },
  { id: 'app-5', name: 'Cheese Bread', description: 'Garlic bread with three cheeses', price: 13, category: 'Beginnings' },
  { id: 'app-6', name: 'Potato Skins', description: 'Mozzarella, cheddar, bacon, sour cream', price: 16, category: 'Beginnings' },
  { id: 'app-7', name: 'Stuffed Tater Tots', description: 'Bacon & cheese tots with Santé Fe Ranch', price: 15, category: 'Beginnings' },

  // Salads
  { id: 'sal-1', name: 'Cajun Chicken Salad', description: 'Grilled or fried Cajun chicken, parmesan, veggies', price: 20, category: 'Salads' },
  { id: 'sal-2', name: 'Black & Bleu Salad', description: 'Blackened prime rib, bleu cheese, bacon', price: 26, category: 'Salads', tag: 'Popular' },
  { id: 'sal-3', name: "Bynum's Chef Salad", description: 'Ham, turkey, bacon, cheddar, hard boiled egg', price: 21, category: 'Salads' },

  // Steaks
  { id: 'stk-1', name: 'Prime Rib (32oz)', description: 'Bone-in, slow roasted with horseradish & au jus', price: 78, category: 'Steaks & Entrées', tag: 'Signature' },
  { id: 'stk-2', name: 'NY Strip (20oz)', description: 'Hand-cut Angus, wet-aged 21 days', price: 54, category: 'Steaks & Entrées' },
  { id: 'stk-3', name: 'Filet Mignon', description: 'Most tender cut — regular', price: 48, category: 'Steaks & Entrées', tag: 'Premium' },
  { id: 'stk-4', name: 'Filet Mignon (Hearty)', description: 'Larger portion of our tender filet', price: 54, category: 'Steaks & Entrées' },
  { id: 'stk-5', name: 'Porterhouse', description: 'Strip and filet combination', price: 61, category: 'Steaks & Entrées' },
  { id: 'stk-6', name: 'Bone-In Ribeye', description: 'Well-marbled Angus, rich and flavorful', price: 68, category: 'Steaks & Entrées', tag: 'Popular' },
  { id: 'stk-7', name: 'Steak & Shrimp', description: '14oz NY strip with four jumbo shrimp', price: 49, category: 'Steaks & Entrées' },
  { id: 'stk-8', name: 'Sirloin (8oz)', description: 'Center cut sirloin', price: 40, category: 'Steaks & Entrées' },
  { id: 'stk-9', name: 'Chopped Steak', description: 'Fresh ground filet, char-grilled', price: 30, category: 'Steaks & Entrées' },
  { id: 'stk-10', name: 'Pork Chops', description: 'White Marble Farms premium chops', price: 41, category: 'Steaks & Entrées' },
  { id: 'stk-11', name: "Bynum's BBQ Ribs", description: 'Full rack, slow roasted', price: 39, category: 'Steaks & Entrées' },

  // Seafood
  { id: 'sea-1', name: 'Parmesan Encrusted Tilapia', description: 'Bread crumbs and parmesan', price: 33, category: 'Seafood' },
  { id: 'sea-2', name: 'Breaded Shrimp (8pc)', description: 'Eight jumbo shrimp, fried golden', price: 30, category: 'Seafood' },
  { id: 'sea-3', name: 'Blackened Grouper', description: '8oz filet with Cajun spices', price: 33, category: 'Seafood' },

  // Chicken
  { id: 'chk-1', name: 'Chicken Parmesan', description: 'Breaded breast over pasta with marinara', price: 34, category: 'Chicken & Pasta' },
  { id: 'chk-2', name: 'Roasted Chicken', description: 'Half chicken, slow-roasted, crispy skin', price: 35, category: 'Chicken & Pasta' },
  { id: 'chk-3', name: 'Chicken Fettuccini Alfredo', description: 'Grilled chicken, fettuccini, cream sauce', price: 33, category: 'Chicken & Pasta' },

  // Lunch
  { id: 'lun-1', name: 'Blackened Prime Rib Sandwich', description: 'Slow roasted, Cajun spiced', price: 25, category: 'Lunch Specials' },
  { id: 'lun-2', name: 'Beef Tips', description: 'Filet chunks grilled to order', price: 23, category: 'Lunch Specials' },
  { id: 'lun-3', name: 'Smothered Prime Rib', description: 'Onions, mushrooms, mozzarella', price: 28, category: 'Lunch Specials', tag: 'Popular' },
  { id: 'lun-4', name: 'Fried Grouper Sandwich', description: 'Crispy grouper with Boom Boom sauce', price: 22, category: 'Lunch Specials' },
  { id: 'lun-5', name: "Bynum's Signature Steakburger", description: 'Half pound, mozzarella, mushrooms', price: 16, category: 'Lunch Specials', tag: 'Signature' },
  { id: 'lun-6', name: "Bynum's Smokehouse Burger", description: 'Half pound, American cheese, bacon', price: 16, category: 'Lunch Specials' },
  { id: 'lun-7', name: "Bynum's Club", description: 'Ham, turkey, bacon, chipotle mayo', price: 16, category: 'Lunch Specials' },
  { id: 'lun-8', name: 'Bleu Cheese Burger', description: 'Half pound with bleu cheese dressing', price: 16, category: 'Lunch Specials' },
  { id: 'lun-9', name: 'Tenderloin Sandwich', description: 'Grilled or breaded pork', price: 17, category: 'Lunch Specials' },
  { id: 'lun-10', name: 'Roast Beef & Cheddar', description: 'Prime rib with melted cheddar', price: 18, category: 'Lunch Specials' },

  // Sides
  { id: 'sid-1', name: 'Loaded Baked Potato', description: 'Baked potato with all the toppings', price: 2.50, category: 'Sides & Extras' },
  { id: 'sid-2', name: 'Loaded Steak Fries', description: 'Thick-cut fries loaded up', price: 3.50, category: 'Sides & Extras' },
  { id: 'sid-3', name: 'Broccoli with Cheese', description: 'Steamed broccoli with cheese sauce', price: 2.00, category: 'Sides & Extras' },
  { id: 'sid-4', name: 'Sautéed Mushrooms', description: 'Add to any entrée', price: 3.50, category: 'Sides & Extras' },
  { id: 'sid-5', name: 'Sautéed Onions', description: 'Add to any entrée', price: 2.50, category: 'Sides & Extras' },
  { id: 'sid-6', name: "Bynum's Bourbon Glaze", description: 'Sweet bourbon steak glaze', price: 3.95, category: 'Sides & Extras' },
  { id: 'sid-7', name: 'Truffle Butter', description: 'Premium truffle butter for steaks', price: 3.95, category: 'Sides & Extras' },
  { id: 'sid-8', name: 'Bleu Cheese Encrusted', description: 'Bleu cheese crust for steaks', price: 3.95, category: 'Sides & Extras' },

  // Beverages
  { id: 'bev-1', name: "Bynum's Coffee", description: 'Hot cocoa, whipped cream, crème de menthe', price: 4.00, category: 'Beverages' },
  { id: 'bev-2', name: 'Coffee', description: 'Regular or decaf', price: 3.50, category: 'Beverages' },
  { id: 'bev-3', name: 'Iced Tea / Sweet Tea', description: 'Freshly brewed', price: 4.00, category: 'Beverages' },
  { id: 'bev-4', name: 'Soft Drinks', description: 'Coke, Diet Coke, Sprite, Lemonade', price: 4.00, category: 'Beverages' },
  { id: 'bev-5', name: "Sprecher's Root Beer", description: 'Premium craft root beer', price: 4.50, category: 'Beverages' },
]

/* ── Cart Types ── */
interface CartItem {
  item: OrderItem
  qty: number
  notes: string
}

/* ── Checkout Steps ── */
type Step = 'menu' | 'cart' | 'info' | 'confirm'

/* ── Component ── */
export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<Step>('menu')
  const [activeCategory, setActiveCategory] = useState<string>(ORDER_CATEGORIES[0])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Customer info
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0)
  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0)

  function addToCart(item: OrderItem) {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id)
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { item, qty: 1, notes: '' }]
    })
  }

  function updateQty(id: string, delta: number) {
    setCart(prev => prev
      .map(c => c.item.id === id ? { ...c, qty: c.qty + delta } : c)
      .filter(c => c.qty > 0)
    )
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(c => c.item.id !== id))
  }

  function getQty(id: string) {
    return cart.find(c => c.item.id === id)?.qty || 0
  }

  function handlePlaceOrder() {
    setOrderPlaced(true)
    setStep('confirm')
  }

  const filtered = ORDER_ITEMS.filter(i => i.category === activeCategory)

  /* ── Order Confirmed View ── */
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-bn-dark">
        <Nav />
        <section className="pt-32 pb-20 sm:pt-40">
          <div className="section-container text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-bn-gold/10 border-2 border-bn-gold flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-bn-gold" />
            </div>
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-cream mb-4">
              Order Placed!
            </h1>
            <p className="text-bn-cream/50 mb-2">
              Thank you, <span className="text-bn-gold">{name || 'Guest'}</span>!
            </p>
            <p className="text-bn-cream/40 text-sm mb-8">
              Your order of {cartCount} item{cartCount !== 1 ? 's' : ''} totaling{' '}
              <span className="text-bn-gold font-medium">${cartTotal.toFixed(2)}</span>{' '}
              has been received.
              {pickupTime && (
                <>
                  {' '}Estimated pickup: <span className="text-bn-gold">{pickupTime}</span>.
                </>
              )}
            </p>
            <div className="bg-bn-warm/30 border border-bn-gold/10 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-bn-gold text-sm tracking-wider uppercase mb-4">Order Summary</h3>
              {cart.map(c => (
                <div key={c.item.id} className="flex justify-between py-2 border-b border-bn-gold/5 last:border-0">
                  <span className="text-bn-cream/60 text-sm">
                    {c.qty}x {c.item.name}
                  </span>
                  <span className="text-bn-gold text-sm">${(c.item.price * c.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 mt-2 border-t border-bn-gold/15">
                <span className="text-bn-cream font-medium">Total</span>
                <span className="text-bn-gold font-[var(--font-playfair)] text-lg">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-bn-cream/30 text-xs mb-6">
              This is a demo order — no actual order has been placed.
            </p>
            <a
              href="/demos/bynums"
              className="inline-block bg-bn-gold text-bn-dark px-8 py-3 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors"
            >
              Back to Home
            </a>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  /* ── Checkout Info View ── */
  if (step === 'info') {
    return (
      <div className="min-h-screen bg-bn-dark">
        <Nav />
        <section className="pt-28 pb-20 sm:pt-36">
          <div className="section-container max-w-xl mx-auto">
            <button
              onClick={() => setStep('cart')}
              className="text-bn-gold text-sm tracking-wider uppercase mb-8 hover:text-bn-gold-light transition-colors flex items-center gap-1"
            >
              &larr; Back to Cart
            </button>
            <h1 className="font-[var(--font-playfair)] text-3xl text-bn-cream mb-2">
              Pickup Details
            </h1>
            <p className="text-bn-cream/40 text-sm mb-8">
              Tell us who&apos;s picking up and when.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-bn-cream/60 text-sm mb-1.5">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-bn-warm/40 border border-bn-gold/15 rounded px-4 py-3 text-bn-cream placeholder:text-bn-cream/20 focus:outline-none focus:border-bn-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-bn-cream/60 text-sm mb-1.5">Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(317) 555-0000"
                  className="w-full bg-bn-warm/40 border border-bn-gold/15 rounded px-4 py-3 text-bn-cream placeholder:text-bn-cream/20 focus:outline-none focus:border-bn-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-bn-cream/60 text-sm mb-1.5">Pickup Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bn-cream/30" />
                  <select
                    value={pickupTime}
                    onChange={e => setPickupTime(e.target.value)}
                    className="w-full bg-bn-warm/40 border border-bn-gold/15 rounded pl-10 pr-4 py-3 text-bn-cream focus:outline-none focus:border-bn-gold/50 transition-colors appearance-none"
                  >
                    <option value="">ASAP</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-bn-cream/60 text-sm mb-1.5">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  placeholder="Allergies, special requests, steak temperature, etc."
                  rows={3}
                  className="w-full bg-bn-warm/40 border border-bn-gold/15 rounded px-4 py-3 text-bn-cream placeholder:text-bn-cream/20 focus:outline-none focus:border-bn-gold/50 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-bn-warm/30 border border-bn-gold/10 rounded-lg p-5 mt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-bn-cream/60 text-sm">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
                <span className="font-[var(--font-playfair)] text-bn-gold text-xl">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={!name.trim() || !phone.trim()}
                className="w-full bg-bn-gold text-bn-dark py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
              <p className="text-bn-cream/20 text-xs text-center mt-3">
                Demo only — no real order will be placed
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  /* ── Cart View ── */
  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-bn-dark">
        <Nav />
        <section className="pt-28 pb-20 sm:pt-36">
          <div className="section-container max-w-2xl mx-auto">
            <button
              onClick={() => setStep('menu')}
              className="text-bn-gold text-sm tracking-wider uppercase mb-8 hover:text-bn-gold-light transition-colors flex items-center gap-1"
            >
              &larr; Continue Shopping
            </button>
            <h1 className="font-[var(--font-playfair)] text-3xl text-bn-cream mb-2">Your Order</h1>
            <p className="text-bn-cream/40 text-sm mb-8">
              {cartCount === 0 ? 'Your cart is empty.' : `${cartCount} item${cartCount !== 1 ? 's' : ''} in your order.`}
            </p>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-bn-gold/20 mx-auto mb-4" />
                <p className="text-bn-cream/30">Nothing here yet.</p>
                <button
                  onClick={() => setStep('menu')}
                  className="mt-4 text-bn-gold text-sm hover:text-bn-gold-light transition-colors"
                >
                  Browse Menu &rarr;
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(c => (
                    <div
                      key={c.item.id}
                      className="flex items-center gap-4 bg-bn-warm/20 border border-bn-gold/[0.06] rounded p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-bn-cream font-medium truncate">{c.item.name}</h3>
                        <p className="text-bn-cream/35 text-sm">{c.item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(c.item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center border border-bn-gold/20 text-bn-gold hover:bg-bn-gold/10 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-bn-cream">{c.qty}</span>
                        <button
                          onClick={() => updateQty(c.item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center border border-bn-gold/20 text-bn-gold hover:bg-bn-gold/10 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-[var(--font-playfair)] text-bn-gold text-lg w-20 text-right">
                        ${(c.item.price * c.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(c.item.id)}
                        className="text-bn-cream/20 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-bn-warm/30 border border-bn-gold/10 rounded-lg p-5 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-bn-cream text-lg">Total</span>
                    <span className="font-[var(--font-playfair)] text-bn-gold text-2xl">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setStep('info')}
                    className="w-full bg-bn-gold text-bn-dark py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Checkout <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  /* ── Menu/Ordering View (default) ── */
  return (
    <div className="min-h-screen bg-bn-dark">
      <Nav />

      {/* Header */}
      <section className="pt-28 pb-8 sm:pt-36 sm:pb-12">
        <div className="section-container text-center">
          <p className="text-bn-gold tracking-[0.3em] uppercase text-xs mb-3">Bynum&apos;s Steakhouse</p>
          <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl text-bn-cream mb-4">
            Order Online
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-bn-cream/40 max-w-md mx-auto text-sm">
            Select your items and we&apos;ll have them ready for pickup.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <section className="sticky top-16 sm:top-20 z-40 bg-bn-dark/95 backdrop-blur-sm border-y border-bn-gold/10">
        <div className="section-container py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {ORDER_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs tracking-wider uppercase whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-bn-gold text-bn-dark font-bold'
                    : 'text-bn-cream/50 hover:text-bn-gold border border-bn-gold/10 hover:border-bn-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Items grid */}
      <section className="py-8 sm:py-12">
        <div className="section-container">
          <h2 className="font-[var(--font-playfair)] text-2xl text-bn-gold mb-6">{activeCategory}</h2>
          {activeCategory === 'Lunch Specials' && (
            <p className="text-bn-cream/30 text-xs mb-4">Available until 4 PM. Includes lettuce, tomato, onion, and choice of side.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => {
              const qty = getQty(item.id)
              return (
                <div
                  key={item.id}
                  className={`bg-bn-warm/20 border rounded-lg p-5 transition-all ${
                    qty > 0 ? 'border-bn-gold/30 bg-bn-warm/30' : 'border-bn-gold/[0.06] hover:border-bn-gold/20'
                  }`}
                >
                  {/* Placeholder image area */}
                  <div className="aspect-[16/10] rounded bg-bn-warm/40 mb-4 flex items-center justify-center border border-bn-gold/5 overflow-hidden">
                    <span className="text-bn-cream/10 text-xs tracking-wider uppercase">Photo Coming Soon</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-bn-cream font-medium text-sm">{item.name}</h3>
                    {item.tag && (
                      <span className="text-[9px] tracking-wider uppercase text-bn-gold/60 border border-bn-gold/20 px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-bn-cream/35 text-xs leading-relaxed mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-[var(--font-playfair)] text-bn-gold text-lg">${item.price.toFixed(2)}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 bg-bn-gold/10 border border-bn-gold/20 text-bn-gold px-3 py-1.5 text-xs tracking-wider uppercase hover:bg-bn-gold hover:text-bn-dark transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center border border-bn-gold/20 text-bn-gold hover:bg-bn-gold/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-bn-cream text-sm">{qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center border border-bn-gold/20 text-bn-gold hover:bg-bn-gold/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Floating cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-bn-dark/95 backdrop-blur-sm border-t border-bn-gold/20 safe-bottom">
          <div className="section-container py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-bn-gold" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-bn-gold text-bn-dark text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-bn-cream text-sm">
                {cartCount} item{cartCount !== 1 ? 's' : ''}
              </span>
              <span className="font-[var(--font-playfair)] text-bn-gold text-lg">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep('cart')}
              className="bg-bn-gold text-bn-dark px-6 py-2.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors flex items-center gap-2"
            >
              View Order <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className={cartCount > 0 ? 'pb-16' : ''}>
        <Footer />
      </div>
    </div>
  )
}
