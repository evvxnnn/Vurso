'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useDemoContext } from './DemoContext'
import { DemoProduct } from './demoData'
import { useTranslation } from '@/lib/i18n/useTranslation'

interface Props {
  isOpen: boolean
  onClose: () => void
  editProduct?: DemoProduct
}

const categories: DemoProduct['category'][] = ['tops', 'bottoms', 'footwear', 'outerwear', 'dresses']

export default function DemoProductModal({ isOpen, onClose, editProduct }: Props) {
  const { dispatch } = useDemoContext()
  const { t } = useTranslation()
  const ti = (key: string) => t(`demo.interactive.${key}`) as string

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [cost, setCost] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState<DemoProduct['category']>('tops')
  const [isOnSale, setIsOnSale] = useState(false)
  const [salePrice, setSalePrice] = useState('')

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name)
      setPrice(editProduct.price.toString())
      setCost(editProduct.cost.toString())
      setQuantity(editProduct.quantity.toString())
      setCategory(editProduct.category)
      setIsOnSale(editProduct.isOnSale)
      setSalePrice(editProduct.salePrice?.toString() ?? '')
    } else {
      setName('')
      setPrice('')
      setCost('')
      setQuantity('10')
      setCategory('tops')
      setIsOnSale(false)
      setSalePrice('')
    }
  }, [editProduct, isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    const p = parseFloat(price)
    const c = parseFloat(cost)
    const q = parseInt(quantity)
    if (!name.trim() || isNaN(p) || p <= 0 || isNaN(c) || isNaN(q) || q < 0) return

    const sp = isOnSale ? parseFloat(salePrice) : null
    if (isOnSale && (isNaN(sp!) || sp! <= 0)) return

    if (editProduct) {
      dispatch({
        type: 'EDIT_PRODUCT',
        payload: {
          id: editProduct.id,
          updates: { name: name.trim(), price: p, cost: c, quantity: q, category, isOnSale, salePrice: sp, isActive: editProduct.isActive },
        },
      })
    } else {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { name: name.trim(), price: p, cost: c, quantity: q, category, isOnSale, salePrice: sp, isActive: true },
      })
    }
    onClose()
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 rounded-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-[90%] max-w-[320px] max-h-[90%] overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-primary-navy dark:text-white">
            {editProduct ? ti('editProduct') : ti('addProduct')}
          </h4>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
            <X className="w-3.5 h-3.5 text-dark-gray" />
          </button>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-medium text-dark-gray dark:text-gray-400 mb-0.5">{ti('name')}</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
              placeholder={ti('productName')}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-medium text-dark-gray dark:text-gray-400 mb-0.5">{ti('price')} ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-dark-gray dark:text-gray-400 mb-0.5">{ti('cost')} ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={cost}
                onChange={e => setCost(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-medium text-dark-gray dark:text-gray-400 mb-0.5">{ti('quantity')}</label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-dark-gray dark:text-gray-400 mb-0.5">{ti('category')}</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as DemoProduct['category'])}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{ti(`categories.${c}`)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-700 pt-2">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={isOnSale}
                onChange={e => setIsOnSale(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-accent-purple"
              />
              <span className="font-medium text-dark-gray dark:text-gray-300">{ti('onSale')}</span>
            </label>
            {isOnSale && (
              <div className="mt-2">
                <label className="block text-[10px] font-medium text-dark-gray dark:text-gray-400 mb-0.5">{ti('salePrice')} ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={salePrice}
                  onChange={e => setSalePrice(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-slate-600 text-dark-gray dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            {ti('cancel')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-accent-purple text-white hover:bg-accent-purple-light transition-colors"
          >
            {ti('save')}
          </button>
        </div>
      </div>
    </div>
  )
}
