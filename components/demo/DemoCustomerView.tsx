'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, X, Check } from 'lucide-react'
import { useDemoContext } from './DemoContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function DemoCustomerView() {
  const { state, dispatch, customerProducts, cartTotal, cartItemCount, getCartProduct } = useDemoContext()
  const { t } = useTranslation()
  const ti = (key: string) => t(`demo.interactive.${key}`) as string

  const [cartOpen, setCartOpen] = useState(false)
  const [justCheckedOut, setJustCheckedOut] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToCart = (productId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId } })
    setAddedId(productId)
    setTimeout(() => setAddedId(null), 800)
  }

  const handleCheckout = () => {
    dispatch({ type: 'CHECKOUT' })
    setJustCheckedOut(true)
    setTimeout(() => {
      setJustCheckedOut(false)
      setCartOpen(false)
    }, 2000)
  }

  return (
    <div className="relative h-full flex flex-col p-2 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <h4 className="text-sm font-bold text-primary-navy dark:text-white">{ti('shop')}</h4>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ShoppingCart className="w-4 h-4 text-primary-navy dark:text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent-purple text-white text-[9px] font-bold flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-auto">
        {customerProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-dark-gray/50 dark:text-gray-500">
            <p>{ti('noAvailableProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {customerProducts.map(product => {
              const currentPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
              const cartItem = state.cart.find(c => c.productId === product.id)
              const maxed = (cartItem?.quantity ?? 0) >= product.quantity
              const justAdded = addedId === product.id

              return (
                <div key={product.id} className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-2 flex flex-col">
                  {/* Sale Badge */}
                  {product.isOnSale && (
                    <div className="self-end px-1 py-0.5 text-[9px] font-bold bg-accent-purple text-white rounded mb-0.5">
                      {Math.round((1 - (product.salePrice! / product.price)) * 100)}% {ti('off')}
                    </div>
                  )}

                  <div className="text-center text-2xl mb-1">{product.image}</div>
                  <p className="font-medium text-primary-navy dark:text-white truncate text-[11px]">{product.name}</p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className={`font-semibold ${product.isOnSale ? 'text-accent-purple' : 'text-primary-navy dark:text-white'}`}>
                      ${currentPrice.toFixed(2)}
                    </span>
                    {product.isOnSale && (
                      <span className="text-[10px] text-dark-gray/40 line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={maxed}
                    className={`mt-auto pt-1.5 w-full py-1 rounded-md text-[10px] font-medium transition-all ${
                      justAdded
                        ? 'bg-green-500 text-white'
                        : maxed
                          ? 'bg-gray-100 dark:bg-slate-700 text-dark-gray/40 cursor-not-allowed'
                          : 'bg-accent-purple/10 text-accent-purple hover:bg-accent-purple hover:text-white'
                    }`}
                  >
                    {justAdded ? (
                      <span className="flex items-center justify-center gap-1"><Check className="w-3 h-3" /> {ti('added')}</span>
                    ) : maxed ? ti('maxQty') : (
                      <span className="flex items-center justify-center gap-1"><Plus className="w-3 h-3" /> {ti('addToCart')}</span>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div className="absolute inset-0 z-20 flex justify-end rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
          <div className="relative w-[70%] max-w-[240px] bg-white dark:bg-slate-800 shadow-xl flex flex-col h-full">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-slate-700 flex-shrink-0">
              <h5 className="text-xs font-bold text-primary-navy dark:text-white">{ti('cart')} ({cartItemCount})</h5>
              <button onClick={() => setCartOpen(false)} className="p-0.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
                <X className="w-3.5 h-3.5 text-dark-gray" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto p-2">
              {justCheckedOut ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-xs font-bold text-green-600 dark:text-green-400">{ti('orderConfirmed')}</p>
                </div>
              ) : state.cart.length === 0 ? (
                <div className="flex items-center justify-center h-full text-dark-gray/50 dark:text-gray-500">
                  <p className="text-[10px]">{ti('emptyCart')}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {state.cart.map(item => {
                    const product = getCartProduct(item.productId)
                    if (!product) return null
                    const price = product.isOnSale && product.salePrice ? product.salePrice : product.price
                    return (
                      <div key={item.productId} className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                        <span className="text-lg">{product.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-medium text-primary-navy dark:text-white truncate">{product.name}</p>
                          <p className="text-[10px] text-dark-gray/60">${price.toFixed(2)} {ti('each')}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => dispatch({ type: 'UPDATE_CART_QTY', payload: { productId: item.productId, quantity: item.quantity - 1 } })}
                            className="w-4 h-4 rounded flex items-center justify-center bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[10px] font-medium w-4 text-center text-primary-navy dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { productId: item.productId } })}
                            className="w-4 h-4 rounded flex items-center justify-center bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.productId })}
                          className="p-0.5 text-dark-gray/40 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {state.cart.length > 0 && !justCheckedOut && (
              <div className="border-t border-gray-100 dark:border-slate-700 p-2 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium text-dark-gray dark:text-gray-400">{ti('total')}</span>
                  <span className="text-xs font-bold text-primary-navy dark:text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-1.5 rounded-lg bg-accent-purple text-white text-[10px] font-medium hover:bg-accent-purple-light transition-colors"
                >
                  {ti('checkout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
