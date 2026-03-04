'use client'

import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, Tag } from 'lucide-react'
import { useDemoContext } from './DemoContext'
import { DemoProduct } from './demoData'
import DemoProductModal from './DemoProductModal'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function DemoInventory() {
  const { state, dispatch } = useDemoContext()
  const { t } = useTranslation()
  const ti = (key: string) => t(`demo.interactive.${key}`) as string

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<DemoProduct | undefined>()

  const filtered = state.products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditingProduct(undefined)
    setModalOpen(true)
  }

  const openEdit = (product: DemoProduct) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const stockColor = (qty: number) => {
    if (qty === 0) return 'text-red-500'
    if (qty < 5) return 'text-amber-500'
    return 'text-green-500'
  }

  const stockBg = (qty: number) => {
    if (qty === 0) return 'bg-red-500/10'
    if (qty < 5) return 'bg-amber-500/10'
    return 'bg-green-500/10'
  }

  return (
    <div className="relative h-full flex flex-col p-2 text-xs">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-gray/50" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={ti('search')}
            className="w-full pl-6 pr-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple placeholder:text-dark-gray/40"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-accent-purple text-white hover:bg-accent-purple-light transition-colors whitespace-nowrap"
        >
          <Plus className="w-3 h-3" />
          <span className="hidden sm:inline">{ti('addProduct')}</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-slate-700">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 dark:bg-slate-700/80 text-dark-gray dark:text-gray-400 text-[10px] uppercase tracking-wider">
              <th className="text-left py-1.5 px-2 font-medium">{ti('name')}</th>
              <th className="text-left py-1.5 px-2 font-medium hidden md:table-cell">{ti('sku')}</th>
              <th className="text-right py-1.5 px-2 font-medium">{ti('price')}</th>
              <th className="text-center py-1.5 px-2 font-medium">{ti('quantity')}</th>
              <th className="text-center py-1.5 px-2 font-medium">{ti('status')}</th>
              <th className="text-center py-1.5 px-2 font-medium w-20">{ti('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
            {filtered.map(product => {
              const currentPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
              return (
                <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{product.image}</span>
                      <span className="font-medium text-primary-navy dark:text-white truncate max-w-[100px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-1.5 px-2 text-dark-gray dark:text-gray-500 hidden md:table-cell font-mono text-[10px]">
                    {product.sku}
                  </td>
                  <td className="py-1.5 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {product.isOnSale && (
                        <span className="px-1 py-0.5 text-[9px] font-bold bg-accent-purple/15 text-accent-purple rounded">
                          {ti('sale')}
                        </span>
                      )}
                      <span className={product.isOnSale ? 'text-accent-purple font-semibold' : 'text-primary-navy dark:text-white'}>
                        ${currentPrice.toFixed(2)}
                      </span>
                      {product.isOnSale && (
                        <span className="text-[10px] text-dark-gray/50 line-through">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-1.5 px-2 text-center">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md font-medium text-[10px] ${stockBg(product.quantity)} ${stockColor(product.quantity)}`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-center">
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_ACTIVE', payload: product.id })}
                      className="inline-flex items-center gap-1 group cursor-pointer"
                      title={product.isActive ? ti('clickToUnlist') : ti('clickToList')}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors ${product.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className={`text-[10px] ${product.isActive ? 'text-green-600 dark:text-green-400' : 'text-dark-gray/50'}`}>
                        {product.isActive ? ti('active') : ti('inactive')}
                      </span>
                    </button>
                  </td>
                  <td className="py-1.5 px-2">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_SALE', payload: { id: product.id } })}
                        className={`p-1 rounded transition-colors ${product.isOnSale ? 'text-accent-purple bg-accent-purple/10' : 'text-dark-gray/40 hover:text-accent-purple hover:bg-accent-purple/10'}`}
                        title={product.isOnSale ? ti('endSale') : ti('putOnSale')}
                      >
                        <Tag className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1 rounded text-dark-gray/40 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                        title={ti('edit')}
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'DELETE_PRODUCT', payload: product.id })}
                        className="p-1 rounded text-dark-gray/40 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title={ti('delete')}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-dark-gray/50 dark:text-gray-500">
                  {ti('noProducts')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DemoProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editProduct={editingProduct} />
    </div>
  )
}
