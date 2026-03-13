'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import {
  ShoppingBag, Plus, Minus, X, ChevronRight, ChevronDown,
  Check, Clock, Info, UtensilsCrossed, Phone,
} from 'lucide-react'

/* ── Scroll animation hook ── */
function useInView<T extends HTMLElement>(): [React.RefCallback<T>] {
  const observerRef = useRef<IntersectionObserver | null>(null)
  useEffect(() => { return () => { observerRef.current?.disconnect() } }, [])
  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) node.classList.add('in-view') },
      { threshold: 0.1 }
    )
    observerRef.current.observe(node)
  }, [])
  return [ref]
}

/* ── Menu Data ── */
const CATEGORIES = [
  'Beginnings',
  'Salads',
  'Steaks & Entrées',
  'Seafood',
  'Chicken & Pasta',
  'Lunch',
  'Sides',
  'Beverages',
  'Wine',
  'Bourbon',
] as const

type Category = (typeof CATEGORIES)[number]

interface MenuVariant {
  label: string
  price: number
}

interface MenuItem {
  id: string
  name: string
  description: string
  detail?: string
  price: string
  numPrice?: number
  category: Category
  tag?: string
  image?: string
  variants?: MenuVariant[]
}

const MENU_ITEMS: MenuItem[] = [
  // Beginnings
  { id: 'app-1', name: 'Shrimp Cocktail', description: 'Jumbo shrimp with house cocktail sauce and lemon.', price: '$17', numPrice: 17, category: 'Beginnings', image: '/demos/bynums/menu items/shrimp-cocktail.webp' },
  { id: 'app-2', name: 'Lobster Voodoo', description: 'Fried lobster tail tossed in our spicy voodoo sauce.', price: '$29', numPrice: 29, category: 'Beginnings', tag: 'Popular', image: '/demos/bynums/menu items/lobster-voodoo.webp' },
  { id: 'app-3', name: 'Boom Boom Shrimp', description: 'Breaded shrimp tenders in creamy remoulade sauce.', price: '$17', numPrice: 17, category: 'Beginnings', image: '/demos/bynums/menu items/boom-boom-shrimp.webp' },
  { id: 'app-4', name: 'Onion Flower', description: 'Battered and fried jumbo onion with special sauce.', price: '$14', numPrice: 14, category: 'Beginnings', image: '/demos/bynums/menu items/onion-flower.webp' },
  { id: 'app-5', name: 'Cheese Bread', description: 'Garlic French bread topped with three cheeses.', price: '$13', numPrice: 13, category: 'Beginnings', image: '/demos/bynums/menu items/cheese-bread.webp' },
  { id: 'app-6', name: 'Potato Skins', description: 'Loaded with mozzarella, cheddar, and bacon. Served with sour cream.', price: '$16', numPrice: 16, category: 'Beginnings', image: '/demos/bynums/menu items/loaded-potato-skins.webp' },
  { id: 'app-7', name: 'Stuffed Tater Tots', description: 'Bacon and cheese-filled tots with Santé Fe Ranch dipping sauce.', price: '$15', numPrice: 15, category: 'Beginnings', image: '/demos/bynums/menu items/stuffed-tots.webp' },

  // Salads
  { id: 'sal-1', name: 'Cajun Chicken Salad', description: 'Grilled or fried Cajun chicken with parmesan and mixed vegetables.', price: '$20', numPrice: 20, category: 'Salads', image: '/demos/bynums/menu items/cajun-chicken-salad.webp' },
  { id: 'sal-2', name: 'Black & Bleu Salad', description: 'Blackened prime rib encrusted with bleu cheese, bacon, and tomatoes.', price: '$26', numPrice: 26, category: 'Salads', tag: 'Popular', image: '/demos/bynums/menu items/black-bleu-salad.webp' },
  { id: 'sal-3', name: "Bynum's Chef Salad", description: 'Ham, turkey, bacon bits, cheddar, and hard boiled egg.', price: '$21', numPrice: 21, category: 'Salads', image: '/demos/bynums/menu items/chef-salad.webp' },

  // Steaks
  { id: 'stk-1', name: 'Prime Rib', description: '32oz bone-in, slow roasted with horseradish sauce and au jus.', detail: 'Our signature cut — a massive 32-ounce bone-in prime rib, slow roasted to perfection. Served with house-made horseradish sauce and au jus. Includes onion soup, garden salad, warm bread, and choice of side.', price: '$78', numPrice: 78, category: 'Steaks & Entrées', tag: 'Signature', image: '/demos/bynums/menu items/prime-rib.webp' },
  { id: 'stk-2', name: 'NY Strip', description: '20oz hand-cut Angus, wet-aged 21 days.', detail: '20-ounce hand-cut NY Strip from Angus beef, wet-aged 21 days for peak tenderness. Cut 1.5–2 inches thick. Includes onion soup, garden salad, warm bread, and choice of side.', price: '$54', numPrice: 54, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/ny-strip.webp' },
  { id: 'stk-3', name: 'Filet Mignon', description: 'The most tender cut of beef. Standard or hearty.', detail: 'Premium filet mignon, the most tender cut of beef. Melt-in-your-mouth texture with delicate flavor. Available in standard or hearty portion. Includes onion soup, garden salad, warm bread, and choice of side.', price: '$48 / $54', category: 'Steaks & Entrées', tag: 'Premium', image: '/demos/bynums/menu items/filet.webp', variants: [{ label: 'Standard', price: 48 }, { label: 'Hearty', price: 54 }] },
  { id: 'stk-5', name: 'Porterhouse', description: 'NY strip and filet combination — best of both worlds.', detail: 'The ultimate steak experience — a porterhouse gives you both the NY Strip and the filet in one cut. Includes onion soup, garden salad, warm bread, and choice of side.', price: '$61', numPrice: 61, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/porterhouse.webp' },
  { id: 'stk-6', name: 'Bone-In Ribeye', description: 'Well-marbled Angus beef, rich and flavorful.', detail: 'Beautifully marbled bone-in ribeye from Angus beef. Rich, beefy flavor with juicy tenderness. Wet-aged 21 days. Includes onion soup, garden salad, warm bread, and choice of side.', price: '$68', numPrice: 68, category: 'Steaks & Entrées', tag: 'Popular', image: '/demos/bynums/menu items/ribeye.webp' },
  { id: 'stk-7', name: 'Steak & Shrimp', description: '14oz NY strip with four breaded jumbo shrimp.', price: '$49', numPrice: 49, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/steak-and-shrimp.webp' },
  { id: 'stk-8', name: 'Sirloin for Two', description: 'Center cut sirloin, feeds 2 or more.', price: '$81', numPrice: 81, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/sirloin.webp' },
  { id: 'stk-9', name: 'Sirloin', description: '8oz center cut sirloin.', price: '$40', numPrice: 40, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/sirloin.webp' },
  { id: 'stk-10', name: 'Chopped Steak', description: 'Fresh ground filet, char-grilled to order.', price: '$30', numPrice: 30, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/chopped-steak.webp' },
  { id: 'stk-11', name: 'Pork Chops', description: 'White Marble Farms premium pork chops.', price: '$41', numPrice: 41, category: 'Steaks & Entrées', image: '/demos/bynums/menu items/pork-chops.webp' },
  { id: 'stk-12', name: "Bynum's BBQ Ribs", description: 'Full rack, slow roasted until fall-off-the-bone.', price: '$39', numPrice: 39, category: 'Steaks & Entrées', tag: 'Favorite', image: '/demos/bynums/menu items/ribs.webp' },

  // Seafood
  { id: 'sea-1', name: 'Surf & Turf', description: '7oz filet paired with an 8oz lobster tail.', detail: 'The best of land and sea — a tender 7oz filet mignon alongside an 8oz cold water lobster tail with drawn butter. Includes onion soup, garden salad, warm bread, and choice of side.', price: 'Market', category: 'Seafood', tag: "Chef's Pick", image: '/demos/bynums/menu items/surf-and-turf.webp' },
  { id: 'sea-2', name: 'Lobster Tail', description: 'Cold water lobster tail with drawn butter. 8oz to 24oz+.', price: 'Market', category: 'Seafood', tag: 'Popular', image: '/demos/bynums/menu items/lobster-tail.webp' },
  { id: 'sea-3', name: 'Parmesan Encrusted Tilapia', description: 'Bread crumbs and parmesan, golden brown.', price: '$33', numPrice: 33, category: 'Seafood', image: '/demos/bynums/menu items/parm-tilapia.webp' },
  { id: 'sea-4', name: 'Breaded Shrimp', description: 'Eight jumbo shrimp fried golden brown.', price: '$30', numPrice: 30, category: 'Seafood', image: '/demos/bynums/menu items/breaded-shrimp.webp' },
  { id: 'sea-5', name: 'Blackened Grouper', description: '8oz filet with Cajun spices. Also available grilled or fried.', price: '$33', numPrice: 33, category: 'Seafood', image: '/demos/bynums/menu items/blackened-grouper.webp' },

  // Chicken
  { id: 'chk-1', name: 'Chicken Parmesan', description: 'Breaded chicken breast over pasta with marinara sauce.', price: '$34', numPrice: 34, category: 'Chicken & Pasta', image: '/demos/bynums/menu items/chicken-parm.webp' },
  { id: 'chk-2', name: 'Roasted Chicken', description: 'Half chicken, slow-roasted with crispy golden skin.', price: '$35', numPrice: 35, category: 'Chicken & Pasta', image: '/demos/bynums/menu items/roasted-chicken.webp' },
  { id: 'chk-3', name: 'Chicken Fettuccini Alfredo', description: 'Grilled chicken with fettuccini in parmesan cream sauce.', price: '$33', numPrice: 33, category: 'Chicken & Pasta', image: '/demos/bynums/menu items/chicken-alfredo.webp' },

  // Lunch
  { id: 'lun-1', name: 'Blackened Prime Rib', description: 'Slow roasted, Cajun spiced.', price: '$25', numPrice: 25, category: 'Lunch', image: '/demos/bynums/menu items/blackened-prime-rib.webp' },
  { id: 'lun-2', name: 'Beef Tips', description: 'Filet chunks grilled to order.', price: '$23', numPrice: 23, category: 'Lunch', image: '/demos/bynums/menu items/beef-tips.webp' },
  { id: 'lun-3', name: 'Smothered Prime Rib', description: 'With sautéed onions, mushrooms, and mozzarella.', price: '$28', numPrice: 28, category: 'Lunch', tag: 'Popular', image: '/demos/bynums/menu items/smothered-prime-rib.webp' },
  { id: 'lun-4', name: 'Fried Grouper Sandwich', description: 'Crispy grouper with Boom Boom sauce.', price: '$22', numPrice: 22, category: 'Lunch', image: '/demos/bynums/menu items/fried-grouper-sandwich.webp' },
  { id: 'lun-5', name: 'Tenderloin', description: 'Grilled or breaded pork tenderloin sandwich.', price: '$17', numPrice: 17, category: 'Lunch', image: '/demos/bynums/menu items/tenderloin.webp' },
  { id: 'lun-6', name: "Bynum's Club", description: 'Ham, turkey, bacon, chipotle mayo on sourdough.', price: '$16', numPrice: 16, category: 'Lunch', image: '/demos/bynums/menu items/bynums-club.webp' },
  { id: 'lun-7', name: 'Chicken Breast Sandwich', description: 'Cajun, bleu cheese, or BBQ sauce options.', price: '$14', numPrice: 14, category: 'Lunch', image: '/demos/bynums/menu items/cajun-chicken-sandwich.webp' },
  { id: 'lun-8', name: 'Hot Ham & Cheese', description: 'American and mozzarella blend on grilled bread.', price: '$16', numPrice: 16, category: 'Lunch', image: '/demos/bynums/menu items/hot-ham-and-cheese.webp' },
  { id: 'lun-9', name: 'Roast Beef & Cheddar', description: 'Prime rib with melted cheddar.', price: '$18', numPrice: 18, category: 'Lunch', image: '/demos/bynums/menu items/roast-beef-and-cheddar.webp' },
  { id: 'lun-10', name: 'Bleu Cheese Burger', description: 'Half pound patty with bleu cheese dressing.', price: '$16', numPrice: 16, category: 'Lunch', image: '/demos/bynums/menu items/bleu-cheese-burger.webp' },
  { id: 'lun-11', name: "Bynum's Signature Steakburger", description: 'Half pound with mozzarella and mushrooms.', price: '$16', numPrice: 16, category: 'Lunch', tag: 'Signature' },
  { id: 'lun-12', name: "Bynum's Smokehouse Burger", description: 'Half pound with American cheese and bacon.', price: '$16', numPrice: 16, category: 'Lunch' },
  { id: 'lun-13', name: 'Lunch Chopped Steak', description: 'Fresh ground filet, served until 4 PM.', price: '$19', numPrice: 19, category: 'Lunch', image: '/demos/bynums/menu items/chopped-steak.webp' },
  { id: 'lun-14', name: 'Lunch Chicken Parmesan', description: 'Breaded with marinara on hoagie roll.', price: '$17', numPrice: 17, category: 'Lunch', image: '/demos/bynums/menu items/chicken-parm.webp' },

  // Sides
  { id: 'sid-1', name: 'Loaded Baked Potato', description: 'Baked potato with all the toppings.', price: '$2.50', numPrice: 2.50, category: 'Sides' },
  { id: 'sid-2', name: 'Loaded Steak Fries', description: 'Thick-cut fries, fully loaded.', price: '$3.50', numPrice: 3.50, category: 'Sides' },
  { id: 'sid-3', name: 'Broccoli with Cheese', description: 'Steamed broccoli with cheese sauce.', price: '$2.00', numPrice: 2.00, category: 'Sides' },
  { id: 'sid-4', name: 'Sautéed Mushrooms', description: 'Add to any entrée.', price: '$3.50', numPrice: 3.50, category: 'Sides' },
  { id: 'sid-5', name: 'Sautéed Onions', description: 'Add to any entrée.', price: '$2.50', numPrice: 2.50, category: 'Sides' },
  { id: 'sid-6', name: "Bynum's Bourbon Glaze", description: 'Sweet bourbon steak glaze.', price: '$3.95', numPrice: 3.95, category: 'Sides' },
  { id: 'sid-7', name: 'Garlic Butter', description: 'For steaks.', price: '$3.95', numPrice: 3.95, category: 'Sides' },
  { id: 'sid-8', name: 'Truffle Butter', description: 'Premium truffle butter for steaks.', price: '$3.95', numPrice: 3.95, category: 'Sides' },
  { id: 'sid-9', name: 'Bleu Cheese Encrusted', description: 'Bleu cheese crust topping.', price: '$3.95', numPrice: 3.95, category: 'Sides' },
  { id: 'sid-10', name: 'Parmesan Horseradish Encrusted', description: 'Parmesan horseradish crust topping.', price: '$3.95', numPrice: 3.95, category: 'Sides' },
  { id: 'sid-11', name: 'Half Rack of Ribs', description: 'Add a half rack to any entrée.', price: '$16', numPrice: 16, category: 'Sides' },
  { id: 'sid-12', name: 'Breaded Jumbo Shrimp (4pc)', description: 'Add four breaded shrimp.', price: '$13', numPrice: 13, category: 'Sides' },
  { id: 'sid-13', name: 'Cajun Grilled Shrimp (4pc)', description: 'Add four Cajun grilled shrimp.', price: '$13', numPrice: 13, category: 'Sides' },

  // Beverages
  { id: 'bev-1', name: "Bynum's Coffee", description: 'Fresh brewed with hot cocoa, whipped cream, and crème de menthe.', price: '$4.00', numPrice: 4.00, category: 'Beverages' },
  { id: 'bev-2', name: 'Coffee', description: 'Regular or decaf.', price: '$3.50', numPrice: 3.50, category: 'Beverages' },
  { id: 'bev-3', name: 'Hot / Iced / Sweet Tea', description: 'Freshly brewed tea.', price: '$4.00', numPrice: 4.00, category: 'Beverages' },
  { id: 'bev-4', name: 'Fruit Juice', description: 'Orange, cranberry, or milk.', price: '$4.25', numPrice: 4.25, category: 'Beverages' },
  { id: 'bev-5', name: 'Dasani Water', description: 'Bottled water.', price: '$3.00', numPrice: 3.00, category: 'Beverages' },
  { id: 'bev-6', name: 'Soft Drinks', description: 'Coke, Diet Coke, Coke Zero, Mr. Pibb, Sprite, Lemonade.', price: '$4.00', numPrice: 4.00, category: 'Beverages' },
  { id: 'bev-7', name: "Sprecher's Gourmet Root Beer", description: 'Premium craft root beer.', price: '$4.50', numPrice: 4.50, category: 'Beverages' },

  // Wine
  { id: 'win-1', name: 'Ruffino Prosecco', description: 'Off-dry sparkling with pear, apple, peach.', price: '$15 / $38', category: 'Wine', tag: 'Sparkling' },
  { id: 'win-2', name: 'Roscato Moscato', description: 'Sweet with candied citrus and ripe fruit.', price: '$10.50 / $39', category: 'Wine', tag: 'White' },
  { id: 'win-3', name: 'Dr. L Riesling', description: 'German — fruity with citrus and apricot.', price: '$8.25 / $29', category: 'Wine', tag: 'White' },
  { id: 'win-4', name: 'Caposaldo Pinot Grigio', description: 'Dry and crisp with almond and apple.', price: '$9 / $33', category: 'Wine', tag: 'White' },
  { id: 'win-5', name: 'Brancott Sauvignon Blanc', description: 'New Zealand — grapefruit, passion fruit.', price: '$10.50 / $39', category: 'Wine', tag: 'White' },
  { id: 'win-6', name: 'Sea Sun Chardonnay', description: 'California — buttery with apple and peach.', price: '$9.75 / $36', category: 'Wine', tag: 'White' },
  { id: 'win-7', name: "Bynum's Chardonnay", description: 'House label by Hopwood — light and soft.', price: '$34', category: 'Wine', tag: 'House' },
  { id: 'win-8', name: "Bynum's Cabernet Sauvignon", description: 'House label — oak and cherry, perfect with steak.', price: '$34', category: 'Wine', tag: 'House' },
  { id: 'win-9', name: 'Bonanza Cabernet Sauvignon', description: 'Dark berry, vanilla, and cassis.', price: '$10 / $38', category: 'Wine', tag: 'Red' },
  { id: 'win-10', name: 'Z Alexander Brown Cabernet', description: 'Black cherry and milk chocolate.', price: '$13 / $49', category: 'Wine', tag: 'Red' },
  { id: 'win-11', name: 'Quilt Napa Valley Cabernet', description: 'Black cherry pie, plum, velvety tannins.', price: '$85', category: 'Wine', tag: 'Red' },
  { id: 'win-12', name: 'Freakshow Old Vine Zinfandel', description: 'Cherry, cranberry, peppery spice.', price: '$11 / $41', category: 'Wine', tag: 'Red' },
  { id: 'win-13', name: 'Argyle Bloomhouse Pinot Noir', description: 'Red plum, raspberry, toasted oak.', price: '$14 / $53', category: 'Wine', tag: 'Red' },
  { id: 'win-14', name: 'Decoy by Duckhorn Pinot Noir', description: 'Black cherry, strawberry, black tea.', price: '$12 / $45', category: 'Wine', tag: 'Red' },
  { id: 'win-15', name: 'Conundrum by Caymus Red Blend', description: 'Chocolate-covered cherry, smoky.', price: '$8.75 / $32', category: 'Wine', tag: 'Red' },
  { id: 'win-16', name: 'Banfi Centine Rosso Toscana', description: 'Dark fruit, black cherry, plum.', price: '$72', category: 'Wine', tag: 'Red' },
  { id: 'win-17', name: 'Francis Coppola Merlot', description: 'Plums, currants, blueberry pie.', price: '$13 / $49', category: 'Wine', tag: 'Red' },
  { id: 'win-18', name: 'Portillo Malbec', description: 'Red currant, black cherry, cinnamon.', price: '$11 / $40', category: 'Wine', tag: 'Red' },
  { id: 'win-19', name: 'Trivento Reserve Malbec', description: 'Red fruits, coffee, chocolate.', price: '$8 / $29', category: 'Wine', tag: 'Red' },
  { id: 'win-20', name: 'Bogle Chardonnay', description: 'House pour — crisp and easy.', price: '$7 / $25', category: 'Wine', tag: 'House' },
  { id: 'win-21', name: 'Bogle Merlot', description: 'House pour — smooth and balanced.', price: '$7 / $25', category: 'Wine', tag: 'House' },
  { id: 'win-22', name: 'Bogle Cabernet Sauvignon', description: 'House pour — rich and full.', price: '$7 / $25', category: 'Wine', tag: 'House' },
  { id: 'win-23', name: 'Crane Lake White Zinfandel', description: 'House rosé — light and refreshing.', price: '$7 / $25', category: 'Wine', tag: 'House' },

  // Bourbon
  { id: 'bbn-1', name: 'Knob Creek', description: 'Full-bodied, slightly sweet with a long finish.', price: 'Ask', category: 'Bourbon' },
  { id: 'bbn-2', name: "Maker's Mark", description: 'Smooth, approachable — caramel and vanilla.', price: 'Ask', category: 'Bourbon' },
  { id: 'bbn-3', name: "Basil Hayden's", description: 'Light-bodied with a spicy, tea-like quality.', price: 'Ask', category: 'Bourbon' },
  { id: 'bbn-4', name: 'Hotel Tango', description: 'Indiana-made, veteran-owned craft bourbon.', price: 'Ask', category: 'Bourbon', tag: 'Local' },
  { id: 'bbn-5', name: 'Woodford Reserve', description: 'Rich and complex — dried fruit, vanilla.', price: 'Ask', category: 'Bourbon' },
  { id: 'bbn-6', name: "Angel's Envy", description: 'Port barrel finished — smooth, subtle sweetness.', price: 'Ask', category: 'Bourbon', tag: 'Premium' },
  { id: 'bbn-7', name: 'Bulleit Rye', description: 'Spicy character with a crisp, clean finish.', price: 'Ask', category: 'Bourbon' },
  { id: 'bbn-8', name: "Jefferson's Ocean", description: 'Aged at sea — complex caramel and salt.', price: 'Ask', category: 'Bourbon', tag: 'Premium' },
]

/* ── Cart Types ── */
interface CartItem {
  item: MenuItem
  qty: number
  variantLabel?: string
  unitPrice: number
}

/* ── Checkout Steps ── */
type Step = 'browse' | 'cart' | 'info' | 'confirm'

/* ── Detail Modal ── */
function DetailModal({ item, onClose, onAdd }: { item: MenuItem; onClose: () => void; onAdd: (variant?: MenuVariant) => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="aspect-[16/9] bg-bn-bg-alt flex items-center justify-center rounded-t-2xl border-b border-bn-border overflow-hidden">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-bn-text-light text-sm">Photo Coming Soon</span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h2 className="font-[var(--font-playfair)] text-2xl text-bn-text">{item.name}</h2>
              {item.tag && (
                <span className="text-[10px] font-bold tracking-wider uppercase text-bn-red bg-bn-red/5 px-2 py-0.5 rounded inline-block mt-1">
                  {item.tag}
                </span>
              )}
            </div>
            <span className="font-[var(--font-playfair)] text-2xl text-bn-text font-bold whitespace-nowrap">
              {item.price}
            </span>
          </div>
          <p className="text-bn-text-mid leading-relaxed mb-4">
            {item.detail || item.description}
          </p>
          {item.category === 'Steaks & Entrées' && (
            <div className="bg-bn-bg rounded-lg p-3 mb-4">
              <p className="text-bn-text-mid text-xs">
                <strong className="text-bn-text">Includes:</strong> Onion soup, garden salad with house-made dressings, warm bread, and choice of baked potato, steak fries, seasoned rice, or broccoli.
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {item.variants && item.variants.length > 0 ? (
              <div className="flex gap-2">
                {item.variants.map(v => (
                  <button
                    key={v.label}
                    onClick={() => { onAdd(v); onClose() }}
                    className="flex-1 flex flex-col items-center gap-0.5 bg-bn-red text-white py-3 rounded-lg font-bold text-sm hover:bg-bn-red-dark transition-colors"
                  >
                    <span>{v.label}</span>
                    <span className="text-white/70 text-xs font-normal">${v.price}</span>
                  </button>
                ))}
              </div>
            ) : item.numPrice ? (
              <button
                onClick={() => { onAdd(); onClose() }}
                className="flex items-center justify-center gap-2 bg-bn-red text-white py-3 rounded-lg font-bold text-sm hover:bg-bn-red-dark transition-colors"
              >
                <Plus className="w-4 h-4" /> Add to Order
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-bn-border text-bn-text-mid text-sm hover:bg-bn-bg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Component ── */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Beginnings')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<Step>('browse')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [headerRef] = useInView<HTMLElement>()

  // Checkout fields
  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [notes, setNotes] = useState('')

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0)
  const cartTotal = cart.reduce((sum, c) => sum + c.unitPrice * c.qty, 0)

  /* Cart key combines item id + variant for uniqueness */
  function cartKey(id: string, variantLabel?: string) {
    return variantLabel ? `${id}__${variantLabel}` : id
  }

  function addToCart(item: MenuItem, variant?: MenuVariant) {
    const key = cartKey(item.id, variant?.label)
    const price = variant?.price ?? item.numPrice ?? 0
    setCart(prev => {
      const existing = prev.find(c => cartKey(c.item.id, c.variantLabel) === key)
      if (existing) return prev.map(c => cartKey(c.item.id, c.variantLabel) === key ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { item, qty: 1, variantLabel: variant?.label, unitPrice: price }]
    })
    setExpandedId(null)
  }

  function updateQty(key: string, delta: number) {
    setCart(prev => prev.map(c => cartKey(c.item.id, c.variantLabel) === key ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0))
  }

  function removeFromCart(key: string) {
    setCart(prev => prev.filter(c => cartKey(c.item.id, c.variantLabel) !== key))
  }

  function getQty(id: string) {
    return cart.filter(c => c.item.id === id).reduce((sum, c) => sum + c.qty, 0)
  }

  const filtered = MENU_ITEMS.filter(i => i.category === activeCategory)
  const isOrderable = (item: MenuItem) => !!item.numPrice || (item.variants && item.variants.length > 0)

  /* ── Order Confirmed ── */
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-bn-bg">
        <Nav />
        <section className="pt-32 pb-20 sm:pt-40">
          <div className="section-container text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text mb-4">
              Order Placed!
            </h1>
            <p className="text-bn-text-mid mb-2">
              Thank you, <span className="font-bold text-bn-text">{custName || 'Guest'}</span>!
            </p>
            <p className="text-bn-text-light text-sm mb-8">
              {cartCount} item{cartCount !== 1 ? 's' : ''} totaling{' '}
              <span className="font-bold text-bn-text">${cartTotal.toFixed(2)}</span>
              {pickupTime && <> &middot; Pickup: <span className="font-bold text-bn-text">{pickupTime}</span></>}
            </p>
            <div className="bg-white rounded-xl border border-bn-border p-6 mb-8 text-left">
              <h3 className="text-bn-red text-sm font-bold uppercase tracking-wider mb-4">Order Summary</h3>
              {cart.map(c => (
                <div key={cartKey(c.item.id, c.variantLabel)} className="flex justify-between py-2 border-b border-bn-border/50 last:border-0">
                  <span className="text-bn-text-mid text-sm">{c.qty}x {c.item.name}{c.variantLabel ? ` (${c.variantLabel})` : ''}</span>
                  <span className="text-bn-text text-sm font-medium">${(c.unitPrice * c.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 mt-2 border-t border-bn-border">
                <span className="text-bn-text font-bold">Total</span>
                <span className="font-[var(--font-playfair)] text-bn-text text-xl font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-bn-text-light text-xs mb-6">
              This is a demo — no actual order has been placed.
            </p>
            <a href="/demos/bynums" className="inline-block bg-bn-red text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors">
              Back to Home
            </a>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  /* ── Checkout Info ── */
  if (step === 'info') {
    return (
      <div className="min-h-screen bg-bn-bg">
        <Nav />
        <section className="pt-28 pb-20 sm:pt-36">
          <div className="section-container max-w-xl mx-auto">
            <button onClick={() => setStep('cart')} className="text-bn-red text-sm font-bold mb-8 hover:text-bn-red-dark transition-colors">
              &larr; Back to Cart
            </button>
            <h1 className="font-[var(--font-playfair)] text-3xl text-bn-text mb-2">Pickup Details</h1>
            <p className="text-bn-text-mid text-sm mb-8">Tell us who&apos;s picking up and when.</p>

            <div className="space-y-5">
              <div>
                <label className="block text-bn-text text-sm font-medium mb-1.5">Name *</label>
                <input type="text" value={custName} onChange={e => setCustName(e.target.value)} placeholder="Your name"
                  className="w-full bg-white border border-bn-border rounded-lg px-4 py-3 text-bn-text placeholder:text-bn-text-light focus:outline-none focus:border-bn-red/40 focus:ring-1 focus:ring-bn-red/20 transition-colors" />
              </div>
              <div>
                <label className="block text-bn-text text-sm font-medium mb-1.5">Phone *</label>
                <input type="tel" value={custPhone} onChange={e => setCustPhone(e.target.value)} placeholder="(317) 555-0000"
                  className="w-full bg-white border border-bn-border rounded-lg px-4 py-3 text-bn-text placeholder:text-bn-text-light focus:outline-none focus:border-bn-red/40 focus:ring-1 focus:ring-bn-red/20 transition-colors" />
              </div>
              <div>
                <label className="block text-bn-text text-sm font-medium mb-1.5">Pickup Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bn-text-light" />
                  <select value={pickupTime} onChange={e => setPickupTime(e.target.value)}
                    className="w-full bg-white border border-bn-border rounded-lg pl-10 pr-4 py-3 text-bn-text focus:outline-none focus:border-bn-red/40 focus:ring-1 focus:ring-bn-red/20 transition-colors appearance-none">
                    <option value="">ASAP</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-bn-text text-sm font-medium mb-1.5">Special Instructions</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Allergies, steak temperature, special requests..."
                  rows={3} className="w-full bg-white border border-bn-border rounded-lg px-4 py-3 text-bn-text placeholder:text-bn-text-light focus:outline-none focus:border-bn-red/40 focus:ring-1 focus:ring-bn-red/20 transition-colors resize-none" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-bn-border p-5 mt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-bn-text-mid text-sm">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
                <span className="font-[var(--font-playfair)] text-bn-text text-xl font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { setOrderPlaced(true); setStep('confirm') }}
                disabled={!custName.trim() || !custPhone.trim()}
                className="w-full bg-bn-red text-white py-3.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
              <p className="text-bn-text-light text-xs text-center mt-3">Demo only — no real order will be placed</p>
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
      <div className="min-h-screen bg-bn-bg">
        <Nav />
        <section className="pt-28 pb-20 sm:pt-36">
          <div className="section-container max-w-2xl mx-auto">
            <button onClick={() => setStep('browse')} className="text-bn-red text-sm font-bold mb-8 hover:text-bn-red-dark transition-colors">
              &larr; Continue Shopping
            </button>
            <h1 className="font-[var(--font-playfair)] text-3xl text-bn-text mb-2">Your Order</h1>
            <p className="text-bn-text-mid text-sm mb-8">
              {cartCount === 0 ? 'Your cart is empty.' : `${cartCount} item${cartCount !== 1 ? 's' : ''} in your order.`}
            </p>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-bn-border mx-auto mb-4" />
                <p className="text-bn-text-light">Nothing here yet.</p>
                <button onClick={() => setStep('browse')} className="mt-4 text-bn-red text-sm font-bold hover:text-bn-red-dark transition-colors">
                  Browse Menu &rarr;
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(c => {
                    const key = cartKey(c.item.id, c.variantLabel)
                    return (
                    <div key={key} className="flex items-center gap-4 bg-white rounded-xl border border-bn-border p-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-bn-text font-bold truncate">{c.item.name}{c.variantLabel ? ` (${c.variantLabel})` : ''}</h3>
                        <p className="text-bn-text-light text-sm">{c.item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => updateQty(key, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-bn-border text-bn-text-mid hover:bg-bn-bg-alt transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-bn-text font-bold">{c.qty}</span>
                        <button onClick={() => updateQty(key, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-bn-border text-bn-text-mid hover:bg-bn-bg-alt transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-[var(--font-playfair)] text-bn-text text-lg font-bold w-20 text-right flex-shrink-0">
                        ${(c.unitPrice * c.qty).toFixed(2)}
                      </span>
                      <button onClick={() => removeFromCart(key)} className="text-bn-text-light hover:text-bn-red transition-colors flex-shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    )
                  })}
                </div>
                <div className="bg-white rounded-xl border border-bn-border p-5 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-bn-text text-lg font-bold">Total</span>
                    <span className="font-[var(--font-playfair)] text-bn-text text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={() => setStep('info')}
                    className="w-full bg-bn-red text-white py-3.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors flex items-center justify-center gap-2">
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

  /* ── Browse Menu (default) ── */
  return (
    <div className="min-h-screen bg-bn-bg">
      <Nav />

      {/* Detail modal */}
      {detailItem && (
        <DetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onAdd={(variant) => addToCart(detailItem, variant)}
        />
      )}

      {/* Header */}
      <section ref={headerRef} className="animate-on-scroll animate-fade-up pt-28 pb-6 sm:pt-36 sm:pb-10">
        <div className="section-container text-center">
          <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">Bynum&apos;s Steakhouse</p>
          <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl text-bn-text mb-3">
            Menu &amp; Online Ordering
          </h1>
          <p className="text-bn-text-mid max-w-lg mx-auto text-sm">
            Browse our full menu. Click any item for details or to add it to your order.
            {' '}Dinner entr&eacute;es include onion soup, salad, bread, and a side.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <section className="sticky top-16 sm:top-20 z-40 bg-bn-bg/95 backdrop-blur-sm border-y border-bn-border">
        <div className="section-container py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedId(null) }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-bn-red text-white'
                    : 'text-bn-text-mid bg-white border border-bn-border hover:border-bn-red/30 hover:text-bn-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category note */}
      <section className="pt-6 sm:pt-8">
        <div className="section-container">
          <h2 className="font-[var(--font-playfair)] text-2xl text-bn-text mb-1">{activeCategory}</h2>
          {activeCategory === 'Lunch' && (
            <p className="text-bn-text-light text-xs">Served until 4 PM. Sandwiches include lettuce, tomato, onion, and choice of side.</p>
          )}
          {activeCategory === 'Wine' && (
            <p className="text-bn-text-light text-xs">Prices shown as glass / bottle where applicable.</p>
          )}
          {activeCategory === 'Bourbon' && (
            <p className="text-bn-text-light text-xs">Ask your server for current pricing.</p>
          )}
          {activeCategory === 'Steaks & Entrées' && (
            <p className="text-bn-text-light text-xs">Hand-cut Angus beef, wet-aged 21 days. All include onion soup, salad, bread, and side.</p>
          )}
        </div>
      </section>

      {/* Items */}
      <section className="py-4 sm:py-6 pb-8">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(item => {
              const qty = getQty(item.id)
              const isExpanded = expandedId === item.id
              const orderable = isOrderable(item)

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all overflow-hidden ${
                    qty > 0 ? 'border-bn-red/30 ring-1 ring-bn-red/10' : 'border-bn-border hover:border-bn-red/20 hover:shadow-sm'
                  }`}
                >
                  {/* Image */}
                  <div className="aspect-[16/9] bg-bn-bg-alt flex items-center justify-center relative overflow-hidden">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-bn-text-light/40 text-xs">Photo Coming Soon</span>
                    )}
                    {qty > 0 && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-bn-red text-white text-xs font-bold flex items-center justify-center">
                        {qty}
                      </div>
                    )}
                    {item.tag && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold tracking-wider uppercase text-white bg-bn-red px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-bn-text font-bold text-sm leading-snug">{item.name}</h3>
                      <span className="font-[var(--font-playfair)] text-bn-text font-bold whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-bn-text-light text-xs leading-relaxed mb-3">{item.description}</p>

                    {/* Action area */}
                    {!isExpanded ? (
                      <button
                        onClick={() => setExpandedId(item.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-bn-border text-bn-text-mid text-xs font-bold hover:border-bn-red/30 hover:text-bn-red transition-all"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                        {orderable ? 'View Details or Order' : 'View Details'}
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setDetailItem(item); setExpandedId(null) }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-bn-border text-bn-text-mid text-xs font-bold hover:bg-bn-bg transition-colors"
                          >
                            <Info className="w-3.5 h-3.5" /> Details
                          </button>
                          {!item.variants && orderable && qty === 0 && (
                            <button
                              onClick={() => addToCart(item)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-bn-red text-white text-xs font-bold hover:bg-bn-red-dark transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add to Order
                            </button>
                          )}
                          {!item.variants && orderable && qty > 0 && (
                            <div className="flex-1 flex items-center justify-center gap-2 py-1">
                              <button onClick={() => updateQty(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-bn-border text-bn-text-mid hover:bg-bn-bg-alt transition-colors">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center text-bn-text font-bold text-sm">{qty}</span>
                              <button onClick={() => updateQty(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-bn-border text-bn-text-mid hover:bg-bn-bg-alt transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                          {!orderable && (
                            <div className="flex-1 flex items-center justify-center text-bn-text-light text-xs">
                              Dine-in only
                            </div>
                          )}
                        </div>
                        {/* Variant selection */}
                        {item.variants && item.variants.length > 0 && (
                          <div className="flex gap-2">
                            {item.variants.map(v => (
                              <button
                                key={v.label}
                                onClick={() => addToCart(item, v)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-bn-red text-white text-xs font-bold hover:bg-bn-red-dark transition-colors"
                              >
                                <Plus className="w-3 h-3" /> {v.label} — ${v.price}
                              </button>
                            ))}
                          </div>
                        )}
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-bn-border shadow-lg">
          <div className="section-container py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-bn-red" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-bn-red text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-bn-text text-sm font-medium">
                {cartCount} item{cartCount !== 1 ? 's' : ''}
              </span>
              <span className="font-[var(--font-playfair)] text-bn-text text-lg font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep('cart')}
              className="bg-bn-red text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors flex items-center gap-2"
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
