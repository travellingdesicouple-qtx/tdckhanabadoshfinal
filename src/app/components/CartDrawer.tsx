import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-hidden bg-white shadow-2xl dark:bg-gray-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <ShoppingCart className="mb-4 h-16 w-16 text-gray-300" />
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Add products to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mb-2 text-sm text-gray-500">{item.type}</p>
                        <p className="text-lg font-bold text-emerald-600">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-full bg-gray-100 p-1 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-full bg-gray-100 p-1 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <Button
                  onClick={() => {
                    onCheckout();
                    onClose();
                  }}
                  className="w-full bg-emerald-600 py-6 text-lg font-semibold hover:bg-emerald-700"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
