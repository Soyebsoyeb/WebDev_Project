import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InventoryItem } from './data/inventory.mock';

export interface CartItem {
  inventory: InventoryItem;
  quantity: number;
  tier: 'flex' | 'steady' | 'lock';
  hasSwapProtection: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  clearCart: () => void;
  totalMonthly: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.inventory.sku === item.inventory.sku);
        if (existing) {
          return {
            items: state.items.map(i => i.inventory.sku === item.inventory.sku ? { ...i, quantity: i.quantity + item.quantity } : i)
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (sku) => set((state) => ({
        items: state.items.filter((i) => i.inventory.sku !== sku),
      })),
      clearCart: () => set({ items: [] }),
      totalMonthly: () => get().items.reduce((total, item) => total + (item.inventory.monthly_price * item.quantity), 0),
    }),
    {
      name: 'rentique-cart',
    }
  )
);
