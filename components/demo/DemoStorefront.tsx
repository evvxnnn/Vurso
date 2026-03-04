'use client'

import { useDemoContext } from './DemoContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function DemoStorefront() {
  const { activeProducts } = useDemoContext()
  const { t } = useTranslation()
  const ti = (key: string) => t(`demo.interactive.${key}`) as string

  return (
    <div className="h-full flex flex-col p-2 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-primary-navy dark:text-white">{ti('yourStore')}</h4>
          <span className="text-[8px] font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">
            {ti('previewBadge')}
          </span>
        </div>
        <span className="text-[10px] text-dark-gray dark:text-gray-500">
          {activeProducts.length} {activeProducts.length !== 1 ? ti('productCount') : ti('productCountSingular')}
        </span>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-auto">
        {activeProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-dark-gray/50 dark:text-gray-500">
            <p>{ti('noActiveProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {activeProducts.map(product => {
              const currentPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
              const isOutOfStock = product.quantity === 0
              const isLowStock = product.quantity > 0 && product.quantity < 5

              return (
                <div
                  key={product.id}
                  className={`relative rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-2 transition-all ${
                    isOutOfStock ? 'opacity-60' : ''
                  }`}
                >
                  {/* Sale Badge */}
                  {product.isOnSale && (
                    <div className="absolute top-1 right-1 px-1 py-0.5 text-[9px] font-bold bg-accent-purple text-white rounded">
                      {Math.round((1 - (product.salePrice! / product.price)) * 100)}% {ti('off')}
                    </div>
                  )}

                  {/* Out of Stock Overlay */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-slate-900/60 rounded-lg z-10">
                      <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">
                        {ti('outOfStock')}
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="text-center text-2xl mb-1">{product.image}</div>

                  {/* Product Info */}
                  <p className="font-medium text-primary-navy dark:text-white truncate text-[11px]">{product.name}</p>
                  <p className="text-[10px] text-dark-gray/60 dark:text-gray-500 capitalize">{product.category}</p>

                  {/* Price */}
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className={`font-semibold ${product.isOnSale ? 'text-accent-purple' : 'text-primary-navy dark:text-white'}`}>
                      ${currentPrice.toFixed(2)}
                    </span>
                    {product.isOnSale && (
                      <span className="text-[10px] text-dark-gray/40 line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Stock Indicator */}
                  <div className="mt-1">
                    {isOutOfStock ? (
                      <span className="text-[10px] text-red-500">{ti('outOfStock')}</span>
                    ) : isLowStock ? (
                      <span className="text-[10px] text-amber-500">{ti('lowStock')} ({product.quantity})</span>
                    ) : (
                      <span className="text-[10px] text-green-500">{ti('inStock')}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
