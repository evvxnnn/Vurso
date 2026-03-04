'use client'

import { Package, DollarSign, TrendingUp, AlertTriangle, RotateCcw, BarChart3, ShoppingCart, Percent, RefreshCw } from 'lucide-react'
import { useDemoContext } from './DemoContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function DemoSellerView() {
  const { state, dispatch, inventoryValue, retailValue, lowStockProducts } = useDemoContext()
  const { t } = useTranslation()
  const ti = (key: string) => t(`demo.interactive.${key}`) as string

  const totalProducts = state.products.length
  const activeProducts = state.products.filter(p => p.isActive).length

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`
    return `$${val.toFixed(2)}`
  }

  // Sales metrics computed from salesHistory
  const totalRevenue = state.salesHistory.reduce((s, sale) => s + sale.total, 0)
  const totalCost = state.salesHistory.reduce((s, sale) => s + sale.totalCost, 0)
  const totalOrders = state.salesHistory.length
  const totalItemsSold = state.salesHistory.reduce((s, sale) => s + sale.items.reduce((si, i) => si + i.quantity, 0), 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0

  // Retail KPIs
  const currentTotalQty = state.products.reduce((s, p) => s + p.quantity, 0)
  const totalStockHandled = currentTotalQty + totalItemsSold
  const sellThroughRate = totalStockHandled > 0 ? (totalItemsSold / totalStockHandled) * 100 : 0
  const turnoverRate = currentTotalQty > 0 ? totalItemsSold / currentTotalQty : 0

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 10) return ti('justNow')
    if (seconds < 60) return `${seconds}${ti('timeAgoSec')}`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}${ti('timeAgoMin')}`
    return `${Math.floor(minutes / 60)}${ti('timeAgoHour')}`
  }

  const actionIcons: Record<string, string> = {
    added: '+',
    edited: '~',
    toggled_sale: '$',
    toggled_status: '!',
    purchased: '*',
    deleted: '-',
    stock_changed: '#',
  }

  return (
    <div className="h-full overflow-auto p-2 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-primary-navy dark:text-white">{ti('dashboard')}</h4>
        <button
          onClick={() => dispatch({ type: 'RESET_DEMO' })}
          className="flex items-center gap-1 px-2 py-1 text-[10px] text-dark-gray/60 dark:text-gray-500 hover:text-accent-purple dark:hover:text-accent-purple transition-colors rounded-md hover:bg-accent-purple/5"
          title={ti('resetDemo')}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{ti('resetDemo')}</span>
        </button>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        <div className="rounded-lg bg-gray-50 dark:bg-slate-700/50 p-2 text-center">
          <Package className="w-3.5 h-3.5 mx-auto mb-0.5 text-accent-purple" />
          <p className="text-base font-bold text-primary-navy dark:text-white">{totalProducts}</p>
          <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('totalProducts')}</p>
          <p className="text-[9px] text-green-500">{activeProducts} {ti('activeCount')}</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-slate-700/50 p-2 text-center">
          <DollarSign className="w-3.5 h-3.5 mx-auto mb-0.5 text-blue-500" />
          <p className="text-base font-bold text-primary-navy dark:text-white">{formatCurrency(inventoryValue)}</p>
          <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('inventoryValue')}</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-slate-700/50 p-2 text-center">
          <TrendingUp className="w-3.5 h-3.5 mx-auto mb-0.5 text-green-500" />
          <p className="text-base font-bold text-accent-purple">{formatCurrency(retailValue)}</p>
          <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('retailValue')}</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-slate-700/50 p-2 text-center">
          <AlertTriangle className={`w-3.5 h-3.5 mx-auto mb-0.5 ${lowStockProducts.length > 0 ? 'text-amber-500' : 'text-green-500'}`} />
          <p className={`text-base font-bold ${lowStockProducts.length > 0 ? 'text-amber-500' : 'text-green-500'}`}>
            {lowStockProducts.length}
          </p>
          <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('lowStockCount')}</p>
        </div>
      </div>

      {/* Sales Reports */}
      <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-2 mb-2">
        <h5 className="text-[10px] font-bold text-primary-navy dark:text-white mb-1.5 flex items-center gap-1">
          <BarChart3 className="w-3 h-3 text-accent-purple" />
          {ti('salesReports')}
        </h5>
        {totalOrders === 0 ? (
          <p className="text-[10px] text-dark-gray/50 dark:text-gray-500 py-2 text-center">{ti('noSalesYet')}</p>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-1.5 text-center">
              <p className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(totalRevenue)}</p>
              <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('todaySales')}</p>
            </div>
            <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-1.5 text-center">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{totalOrders}</p>
              <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('orders')}</p>
            </div>
            <div className="rounded-md bg-purple-50 dark:bg-purple-900/20 p-1.5 text-center">
              <p className="text-sm font-bold text-accent-purple">{formatCurrency(avgOrderValue)}</p>
              <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('avgOrder')}</p>
            </div>
            <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 p-1.5 text-center">
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400">{totalItemsSold}</p>
              <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">Items Sold</p>
            </div>
          </div>
        )}
      </div>

      {/* Retail KPIs */}
      <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-2 mb-2">
        <h5 className="text-[10px] font-bold text-primary-navy dark:text-white mb-1.5 flex items-center gap-1">
          <Percent className="w-3 h-3 text-blue-500" />
          {ti('kpis')}
        </h5>
        <div className="grid grid-cols-4 gap-1.5">
          <div className="text-center">
            <p className={`text-sm font-bold ${grossMargin >= 40 ? 'text-green-600 dark:text-green-400' : grossMargin > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-dark-gray/40 dark:text-gray-600'}`}>
              {grossMargin > 0 ? `${grossMargin.toFixed(0)}%` : '--'}
            </p>
            <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('grossMargin')}</p>
          </div>
          <div className="text-center">
            <p className={`text-sm font-bold ${sellThroughRate > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-dark-gray/40 dark:text-gray-600'}`}>
              {sellThroughRate > 0 ? `${sellThroughRate.toFixed(0)}%` : '--'}
            </p>
            <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('sellThrough')}</p>
          </div>
          <div className="text-center">
            <p className={`text-sm font-bold ${turnoverRate > 0 ? 'text-accent-purple' : 'text-dark-gray/40 dark:text-gray-600'}`}>
              {turnoverRate > 0 ? `${turnoverRate.toFixed(1)}x` : '--'}
            </p>
            <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('turnoverRate')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-dark-gray/40 dark:text-gray-600">--</p>
            <p className="text-[9px] text-dark-gray/60 dark:text-gray-500">{ti('conversionRate')}</p>
          </div>
        </div>
      </div>

      {/* Low Stock + Activity in 2-col layout */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Low Stock */}
        <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-2">
          <h5 className="text-[10px] font-bold text-primary-navy dark:text-white mb-1.5">
            <AlertTriangle className="w-3 h-3 inline mr-1 text-amber-500" />
            {ti('lowStockItems')}
          </h5>
          <div className="space-y-1">
            {lowStockProducts.length === 0 && state.products.filter(p => p.isActive && p.quantity === 0).length === 0 ? (
              <p className="text-[10px] text-green-500">{ti('allStocked')}</p>
            ) : (
              <>
                {lowStockProducts.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-xs">{p.image}</span>
                      <span className="text-[10px] text-primary-navy dark:text-white truncate">{p.name}</span>
                    </div>
                    <span className={`text-[10px] font-medium flex-shrink-0 ml-1 ${p.quantity === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                      {p.quantity} {ti('left')}
                    </span>
                  </div>
                ))}
                {state.products.filter(p => p.isActive && p.quantity === 0).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-xs">{p.image}</span>
                      <span className="text-[10px] text-primary-navy dark:text-white truncate">{p.name}</span>
                    </div>
                    <span className="text-[10px] font-medium text-red-500 flex-shrink-0 ml-1">{ti('outOfStock')}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-2">
          <h5 className="text-[10px] font-bold text-primary-navy dark:text-white mb-1.5">{ti('recentActivity')}</h5>
          <div className="space-y-1">
            {state.activityLog.length === 0 ? (
              <p className="text-[10px] text-dark-gray/50 dark:text-gray-500">{ti('noActivity')}</p>
            ) : (
              state.activityLog.slice(0, 10).map(entry => (
                <div key={entry.id} className="flex items-start gap-1.5 py-0.5">
                  <span className="text-[10px] font-mono text-accent-purple bg-accent-purple/10 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    {actionIcons[entry.action] || '?'}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-primary-navy dark:text-white truncate">
                      <span className="font-medium">{entry.productName}</span>
                    </p>
                    <p className="text-[9px] text-dark-gray/50 dark:text-gray-500">
                      {entry.details} &middot; {timeAgo(entry.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
