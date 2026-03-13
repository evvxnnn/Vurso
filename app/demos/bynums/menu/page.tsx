'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'

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
  'All',
  'Beginnings',
  'Salads',
  'Steaks',
  'Seafood',
  'Chicken',
  'Lunch',
  'Sides',
  'Beverages',
  'Wine',
  'Bourbon',
] as const

type Category = (typeof CATEGORIES)[number]

interface MenuItem {
  name: string
  description: string
  price: string
  category: Category
  tag?: string
}

const MENU_ITEMS: MenuItem[] = [
  // Beginnings
  { name: 'Shrimp Cocktail', description: 'Jumbo shrimp served with house cocktail sauce and lemon.', price: '$17', category: 'Beginnings' },
  { name: 'Lobster Voodoo', description: 'Fried lobster tail tossed in our spicy voodoo sauce.', price: '$29', category: 'Beginnings', tag: 'Popular' },
  { name: 'Boom Boom Shrimp', description: 'Breaded shrimp tenders in creamy remoulade sauce.', price: '$17', category: 'Beginnings' },
  { name: 'Onion Flower', description: 'Battered and fried jumbo onion served with our special sauce.', price: '$14', category: 'Beginnings' },
  { name: 'Cheese Bread', description: 'Garlic French bread topped with three cheeses.', price: '$13', category: 'Beginnings' },
  { name: 'Potato Skins', description: 'Loaded with mozzarella, cheddar, and bacon. Served with sour cream.', price: '$16', category: 'Beginnings' },
  { name: 'Stuffed Tater Tots', description: 'Bacon and cheese-filled tots with Santé Fe Ranch dipping sauce.', price: '$15', category: 'Beginnings' },

  // Salads
  { name: 'Cajun Chicken Salad', description: 'Grilled or fried Cajun chicken with parmesan and mixed vegetables.', price: '$20', category: 'Salads' },
  { name: 'Black & Bleu Salad', description: 'Blackened prime rib encrusted with bleu cheese, bacon, and tomatoes.', price: '$26', category: 'Salads', tag: 'Popular' },
  { name: "Bynum's Chef Salad", description: 'Ham, turkey, bacon bits, cheddar, and hard boiled egg.', price: '$21', category: 'Salads' },

  // Steaks
  { name: 'Prime Rib', description: '32oz bone-in, slow roasted with horseradish sauce and au jus.', price: '$78', category: 'Steaks', tag: 'Signature' },
  { name: 'NY Strip', description: '20oz hand-cut Angus, wet-aged 21 days.', price: '$54', category: 'Steaks' },
  { name: 'Filet Mignon', description: 'The most tender cut available. Regular or hearty.', price: '$48–$54', category: 'Steaks', tag: 'Premium' },
  { name: 'Porterhouse', description: 'NY strip and filet combination — best of both worlds.', price: '$61', category: 'Steaks' },
  { name: 'Bone-In Ribeye', description: 'Well-marbled Angus beef, rich and flavorful.', price: '$68', category: 'Steaks', tag: 'Popular' },
  { name: 'Steak & Shrimp', description: '14oz NY strip with four breaded jumbo shrimp.', price: '$49', category: 'Steaks' },
  { name: 'Sirloin for Two', description: 'Center cut sirloin, feeds 2 or more.', price: '$81', category: 'Steaks' },
  { name: 'Sirloin', description: '8oz center cut sirloin.', price: '$40', category: 'Steaks' },
  { name: 'Chopped Steak', description: 'Fresh ground filet, char-grilled to order.', price: '$30', category: 'Steaks' },
  { name: 'Pork Chops', description: 'White Marble Farms premium pork chops.', price: '$41', category: 'Steaks' },
  { name: "Bynum's BBQ Ribs", description: 'Full rack, slow roasted until fall-off-the-bone tender.', price: '$39', category: 'Steaks' },

  // Seafood
  { name: 'Surf & Turf', description: '7oz filet paired with an 8oz lobster tail.', price: 'Market', category: 'Seafood', tag: "Chef's Pick" },
  { name: 'Lobster Tail', description: 'Cold water lobster tail with drawn butter. 8oz to 24oz+.', price: 'Market', category: 'Seafood', tag: 'Popular' },
  { name: 'Parmesan Encrusted Tilapia', description: 'Bread crumbs and parmesan, golden brown.', price: '$33', category: 'Seafood' },
  { name: 'Breaded Shrimp', description: 'Eight jumbo shrimp fried golden brown.', price: '$30', category: 'Seafood' },
  { name: 'Blackened Grouper', description: '8oz filet with Cajun spices. Also available grilled or fried.', price: '$33', category: 'Seafood' },

  // Chicken
  { name: 'Chicken Parmesan', description: 'Breaded chicken breast over pasta with marinara sauce.', price: '$34', category: 'Chicken' },
  { name: 'Roasted Chicken', description: 'Half chicken, slow-roasted with crispy golden skin.', price: '$35', category: 'Chicken' },
  { name: 'Chicken Fettuccini Alfredo', description: 'Grilled chicken with fettuccini in parmesan cream sauce.', price: '$33', category: 'Chicken' },

  // Lunch
  { name: 'Blackened Prime Rib', description: 'Slow roasted, Cajun spiced. Served until 4 PM.', price: '$25', category: 'Lunch' },
  { name: 'Beef Tips', description: 'Filet chunks grilled to order.', price: '$23', category: 'Lunch' },
  { name: 'Smothered Prime Rib', description: 'With sautéed onions, mushrooms, and mozzarella.', price: '$28', category: 'Lunch', tag: 'Popular' },
  { name: 'Fried Grouper Sandwich', description: 'Crispy grouper with Boom Boom sauce.', price: '$22', category: 'Lunch' },
  { name: 'Tenderloin', description: 'Grilled or breaded pork tenderloin sandwich.', price: '$17', category: 'Lunch' },
  { name: "Bynum's Club", description: 'Ham, turkey, bacon, chipotle mayo on sourdough.', price: '$16', category: 'Lunch' },
  { name: 'Chicken Breast Sandwich', description: 'Cajun, bleu cheese, or BBQ sauce options.', price: '$14', category: 'Lunch' },
  { name: 'Hot Ham & Cheese', description: 'American and mozzarella blend on grilled bread.', price: '$16', category: 'Lunch' },
  { name: 'Roast Beef & Cheddar', description: 'Prime rib with melted cheddar.', price: '$18', category: 'Lunch' },
  { name: 'Bleu Cheese Burger', description: 'Half pound patty with bleu cheese dressing.', price: '$16', category: 'Lunch' },
  { name: "Bynum's Signature Steakburger", description: 'Half pound with mozzarella and mushrooms.', price: '$16', category: 'Lunch', tag: 'Signature' },
  { name: "Bynum's Smokehouse Burger", description: 'Half pound with American cheese and bacon.', price: '$16', category: 'Lunch' },
  { name: 'Lunch Chopped Steak', description: 'Fresh ground filet, served until 4 PM.', price: '$19', category: 'Lunch' },
  { name: 'Lunch Chicken Parmesan', description: 'Breaded with marinara on hoagie roll.', price: '$17', category: 'Lunch' },

  // Sides
  { name: 'Baked Potato', description: 'Classic baked potato. Loaded add $2.50.', price: 'Included', category: 'Sides' },
  { name: 'Steak Fries', description: 'Thick-cut steak fries. Loaded add $3.50.', price: 'Included', category: 'Sides' },
  { name: 'Seasoned Rice', description: 'Seasoned and steamed to perfection.', price: 'Included', category: 'Sides' },
  { name: 'Broccoli', description: 'Fresh steamed broccoli. Add cheese $2.00.', price: 'Included', category: 'Sides' },

  // Beverages
  { name: "Bynum's Coffee", description: 'Fresh brewed with hot cocoa, whipped cream, and crème de menthe.', price: '$4.00', category: 'Beverages' },
  { name: 'Coffee', description: 'Regular or decaf.', price: '$3.50', category: 'Beverages' },
  { name: 'Hot / Iced / Sweet Tea', description: 'Freshly brewed tea, your choice.', price: '$4.00', category: 'Beverages' },
  { name: 'Fruit Juice', description: 'Orange, cranberry, or milk. No refills.', price: '$4.25', category: 'Beverages' },
  { name: 'Dasani Water', description: 'Bottled water.', price: '$3.00', category: 'Beverages' },
  { name: 'Soft Drinks', description: 'Coke, Diet Coke, Coke Zero, Mr. Pibb, Sprite, Lemonade.', price: '$4.00', category: 'Beverages' },
  { name: "Sprecher's Gourmet Root Beer", description: 'Premium craft root beer.', price: '$4.50', category: 'Beverages' },

  // Wine
  { name: 'Ruffino Prosecco', description: 'Off-dry sparkling wine with notes of pear, apple, peach, and lemon.', price: '$15 / $38', category: 'Wine', tag: 'Sparkling' },
  { name: 'Roscato Moscato', description: 'Sweet with candied citrus and ripe fruit notes.', price: '$10.50 / $39', category: 'Wine', tag: 'White' },
  { name: 'Dr. L Riesling', description: 'German Riesling — fruity aromas with citrus and apricot.', price: '$8.25 / $29', category: 'Wine', tag: 'White' },
  { name: 'Caposaldo Pinot Grigio', description: 'Dry and crisp with almond and apple aromas.', price: '$9 / $33', category: 'Wine', tag: 'White' },
  { name: 'Brancott Sauvignon Blanc', description: 'New Zealand — grapefruit and passion fruit with fresh acidity.', price: '$10.50 / $39', category: 'Wine', tag: 'White' },
  { name: 'Sea Sun Chardonnay', description: 'California — soft buttery mouthfeel with apple, peach, and pineapple.', price: '$9.75 / $36', category: 'Wine', tag: 'White' },
  { name: "Bynum's Chardonnay", description: 'House label by Hopwood — light and soft.', price: '$34', category: 'Wine', tag: 'House' },
  { name: "Bynum's Cabernet Sauvignon", description: 'House label by Hopwood — oak and cherry, perfect with steak.', price: '$34', category: 'Wine', tag: 'House' },
  { name: 'Bonanza Cabernet Sauvignon', description: 'Dark berry, vanilla, and cassis flavors.', price: '$10 / $38', category: 'Wine', tag: 'Red' },
  { name: 'Z Alexander Brown Cabernet', description: 'Black cherry and milk chocolate notes.', price: '$13 / $49', category: 'Wine', tag: 'Red' },
  { name: 'Quilt Napa Valley Cabernet', description: 'Black cherry pie and plum, velvety tannins.', price: '$85', category: 'Wine', tag: 'Red' },
  { name: 'Freakshow Old Vine Zinfandel', description: 'Cherry, cranberry with a peppery spice finish.', price: '$11 / $41', category: 'Wine', tag: 'Red' },
  { name: 'Argyle Bloomhouse Pinot Noir', description: 'Red plum and raspberry with toasted oak.', price: '$14 / $53', category: 'Wine', tag: 'Red' },
  { name: 'Decoy by Duckhorn Pinot Noir', description: 'Black cherry and strawberry with hints of black tea.', price: '$12 / $45', category: 'Wine', tag: 'Red' },
  { name: 'Conundrum by Caymus Red Blend', description: 'Chocolate-covered cherry flavors with smokiness.', price: '$8.75 / $32', category: 'Wine', tag: 'Red' },
  { name: 'Banfi Centine Rosso Toscana', description: 'Dark fruit with black cherry and plum.', price: '$72', category: 'Wine', tag: 'Red' },
  { name: 'Francis Coppola Merlot', description: 'Plums, currants, blueberry pie, and toasted oak.', price: '$13 / $49', category: 'Wine', tag: 'Red' },
  { name: 'Portillo Malbec', description: 'Red currant and black cherry with cinnamon notes.', price: '$11 / $40', category: 'Wine', tag: 'Red' },
  { name: 'Trivento Reserve Malbec', description: 'Red fruits with coffee and chocolate hints.', price: '$8 / $29', category: 'Wine', tag: 'Red' },
  { name: 'Bogle Chardonnay', description: 'House pour — crisp and easy-drinking.', price: '$7 / $25', category: 'Wine', tag: 'House' },
  { name: 'Bogle Merlot', description: 'House pour — smooth and balanced.', price: '$7 / $25', category: 'Wine', tag: 'House' },
  { name: 'Bogle Cabernet Sauvignon', description: 'House pour — rich and full-bodied.', price: '$7 / $25', category: 'Wine', tag: 'House' },
  { name: 'Crane Lake White Zinfandel', description: 'House rosé — light and refreshing.', price: '$7 / $25', category: 'Wine', tag: 'House' },

  // Bourbon
  { name: 'Knob Creek', description: 'Full-bodied, slightly sweet with a long finish.', price: 'Ask', category: 'Bourbon' },
  { name: "Maker's Mark", description: 'Smooth, approachable with caramel and vanilla notes.', price: 'Ask', category: 'Bourbon' },
  { name: "Basil Hayden's", description: 'Light-bodied with a spicy, tea-like quality.', price: 'Ask', category: 'Bourbon' },
  { name: 'Hotel Tango', description: 'Indiana-made, veteran-owned craft bourbon.', price: 'Ask', category: 'Bourbon', tag: 'Local' },
  { name: 'Woodford Reserve', description: 'Rich and complex with dried fruit and vanilla.', price: 'Ask', category: 'Bourbon' },
  { name: "Angel's Envy", description: 'Port barrel finished — smooth with subtle sweetness.', price: 'Ask', category: 'Bourbon', tag: 'Premium' },
  { name: 'Bulleit Rye', description: 'Spicy character with a crisp, clean finish.', price: 'Ask', category: 'Bourbon' },
  { name: "Jefferson's Ocean", description: 'Aged at sea — unique, complex caramel and salt notes.', price: 'Ask', category: 'Bourbon', tag: 'Premium' },
]

/* Steak accompaniments */
const ACCOMPANIMENTS = [
  { name: "Bynum's Sweet Bourbon Glaze", price: '$3.95' },
  { name: 'Garlic Butter', price: '$3.95' },
  { name: 'Truffle Butter', price: '$3.95' },
  { name: 'Bleu Cheese Encrusted', price: '$3.95' },
  { name: 'Parmesan Horseradish Encrusted', price: '$3.95' },
]

const ADD_ONS = [
  { name: 'Half Rack of Ribs', price: '$16' },
  { name: 'Four Breaded Jumbo Shrimp', price: '$13' },
  { name: 'Four Cajun Grilled Shrimp', price: '$13' },
  { name: 'Sautéed Mushrooms', price: '$3.50' },
  { name: 'Sautéed Onions', price: '$2.50' },
]

/* ── Page ── */
export default function MenuPage() {
  const [active, setActive] = useState<Category>('All')
  const [headerRef] = useInView<HTMLElement>()

  const filtered = active === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === active)

  /* Group by category for "All" view */
  const grouped = active === 'All'
    ? CATEGORIES.filter(c => c !== 'All').reduce<Record<string, MenuItem[]>>((acc, cat) => {
        const items = MENU_ITEMS.filter(i => i.category === cat)
        if (items.length > 0) acc[cat] = items
        return acc
      }, {})
    : { [active]: filtered }

  return (
    <div className="min-h-screen bg-bn-dark">
      <Nav />

      {/* Header */}
      <section ref={headerRef} className="animate-on-scroll animate-fade-up pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="section-container text-center">
          <p className="text-bn-gold tracking-[0.3em] uppercase text-xs mb-3">Bynum&apos;s Steakhouse</p>
          <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl text-bn-cream mb-4">
            Our Menu
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-bn-cream/40 max-w-lg mx-auto text-sm">
            All dinner entr&eacute;es include onion soup, garden salad with house-made dressings,
            warm bread, and choice of side. Lunch served until 4 PM.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 sm:top-20 z-40 bg-bn-dark/95 backdrop-blur-sm border-y border-bn-gold/10">
        <div className="section-container py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 text-xs tracking-wider uppercase whitespace-nowrap transition-all ${
                  active === cat
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

      {/* Menu Items */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} id={category.toLowerCase()} className="mb-14 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-[var(--font-playfair)] text-2xl text-bn-gold whitespace-nowrap">
                  {category}
                </h2>
                <div className="flex-1 h-[1px] bg-bn-gold/15" />
              </div>

              {/* Special notes per category */}
              {category === 'Lunch' && (
                <p className="text-bn-cream/30 text-xs mb-4 tracking-wide">
                  Served until 4 PM. All sandwiches include lettuce, tomato, onion, and choice of steak fries, baked potato, rice, or broccoli.
                </p>
              )}
              {category === 'Wine' && (
                <p className="text-bn-cream/30 text-xs mb-4 tracking-wide">
                  Prices shown as glass / bottle where applicable.
                </p>
              )}
              {category === 'Bourbon' && (
                <p className="text-bn-cream/30 text-xs mb-4 tracking-wide">
                  Ask your server for current pricing.
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4 p-4 bg-bn-warm/20 border border-bn-gold/[0.06] rounded hover:border-bn-gold/20 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-bn-cream group-hover:text-bn-gold transition-colors font-medium truncate">
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="text-[9px] tracking-wider uppercase text-bn-gold/60 border border-bn-gold/20 px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-bn-cream/35 text-sm mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <span className="font-[var(--font-playfair)] text-bn-gold text-lg whitespace-nowrap flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Accompaniments after Steaks section */}
              {category === 'Steaks' && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-bn-warm/30 border border-bn-gold/10 rounded p-5">
                    <h3 className="font-[var(--font-playfair)] text-lg text-bn-gold mb-3">
                      Steak Accompaniments
                    </h3>
                    <div className="space-y-2">
                      {ACCOMPANIMENTS.map((a, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-bn-cream/50">{a.name}</span>
                          <span className="text-bn-gold/70">{a.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-bn-warm/30 border border-bn-gold/10 rounded p-5">
                    <h3 className="font-[var(--font-playfair)] text-lg text-bn-gold mb-3">
                      Add to Any Entr&eacute;e
                    </h3>
                    <div className="space-y-2">
                      {ADD_ONS.map((a, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-bn-cream/50">{a.name}</span>
                          <span className="text-bn-gold/70">{a.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 border-t border-bn-gold/10">
        <div className="section-container text-center">
          <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-bn-cream mb-4">
            Ready to Order?
          </h2>
          <p className="text-bn-cream/40 text-sm mb-8 max-w-md mx-auto">
            Place your order online for pickup, or give us a call to reserve your table.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/demos/bynums/order"
              className="bg-bn-gold text-bn-dark px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors"
            >
              Order Online
            </a>
            <a
              href="tel:317-784-9880"
              className="border border-bn-gold/40 text-bn-gold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-bn-gold/10 transition-colors"
            >
              Call (317) 784-9880
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
