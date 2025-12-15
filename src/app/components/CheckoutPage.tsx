import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface CheckoutPageProps {
  onBack: () => void;
}

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'payoneer' | 'binance' | 'trustwallet' | 'metamask' | 'easypaisa' | 'jazzcash'>('bank');
  const [transactionProof, setTransactionProof] = useState<File | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-emerald-100 p-6 dark:bg-emerald-900">
                <CheckCircle2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Order Successful!
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Thank you for your purchase. Check your email for download links and receipts.
            </p>
            <Button
              onClick={() => window.location.hash = 'shop-page'}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Shop
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'info' ? 'text-emerald-600' : 'text-gray-400'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 'info' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  1
                </div>
                <span className="font-semibold">Information</span>
              </div>
              <div className="h-px w-12 bg-gray-300 dark:bg-gray-700" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-emerald-600' : 'text-gray-400'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 'payment' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  2
                </div>
                <span className="font-semibold">Payment</span>
              </div>
            </div>

            {/* Information Form */}
            {step === 'info' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Contact Information
                  </h2>
                  
                  <form onSubmit={handleInfoSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Country
                      </label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="PK">Pakistan</option>
                        <option value="IN">India</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 py-6 text-lg font-semibold hover:bg-emerald-700"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Payment Method
                    </h2>
                  </div>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">🏦</div>
                      <p className="text-xs font-semibold">Bank</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('payoneer')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'payoneer'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">💳</div>
                      <p className="text-xs font-semibold">Payoneer</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('binance')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'binance'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">₿</div>
                      <p className="text-xs font-semibold">Binance</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('trustwallet')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'trustwallet'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">🔷</div>
                      <p className="text-xs font-semibold">Trust</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('metamask')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'metamask'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">🦊</div>
                      <p className="text-xs font-semibold">MetaMask</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('easypaisa')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'easypaisa'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">📱</div>
                      <p className="text-xs font-semibold">Easypaisa</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('jazzcash')}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        paymentMethod === 'jazzcash'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="mx-auto mb-1 text-2xl">💰</div>
                      <p className="text-xs font-semibold">JazzCash</p>
                    </button>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Merchant Payment Details */}
                    <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
                      <h3 className="mb-3 font-bold text-emerald-900 dark:text-emerald-100">
                        📋 Payment Instructions
                      </h3>
                      <p className="mb-3 text-sm text-emerald-800 dark:text-emerald-200">
                        Please transfer <strong>${cartTotal.toFixed(2)}</strong> to the following account and upload the transaction proof below:
                      </p>
                      
                      {/* Bank Transfer */}
                      {paymentMethod === 'bank' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                            <span className="font-semibold">Bank Name:</span>
                            <span>HBL Bank Limited</span>
                          </div>
                          <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                            <span className="font-semibold">Account Title:</span>
                            <span>The Khanabadosh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Account Number:</span>
                            <span className="font-mono">01234567890123</span>
                          </div>
                        </div>
                      )}

                      {/* Payoneer */}
                      {paymentMethod === 'payoneer' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between">
                            <span className="font-semibold">Payoneer Email:</span>
                            <span>thekhanabadosh@payoneer.com</span>
                          </div>
                        </div>
                      )}

                      {/* Binance */}
                      {paymentMethod === 'binance' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                            <span className="font-semibold">Binance Pay ID:</span>
                            <span className="font-mono">123456789</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Email:</span>
                            <span>thekhanabadosh@binance.com</span>
                          </div>
                          <p className="text-xs text-amber-800 dark:text-amber-400">
                            💡 Accept: USDT, BTC, ETH, BNB
                          </p>
                        </div>
                      )}

                      {/* TrustWallet */}
                      {paymentMethod === 'trustwallet' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between">
                            <span className="font-semibold">Wallet Address:</span>
                            <span className="font-mono text-xs">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            BSC/ETH Network supported
                          </p>
                        </div>
                      )}

                      {/* MetaMask */}
                      {paymentMethod === 'metamask' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between">
                            <span className="font-semibold">Wallet Address:</span>
                            <span className="font-mono text-xs">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Ethereum Mainnet
                          </p>
                        </div>
                      )}

                      {/* Easypaisa */}
                      {paymentMethod === 'easypaisa' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                            <span className="font-semibold">Account Name:</span>
                            <span>The Khanabadosh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Mobile Number:</span>
                            <span className="font-mono">03001234567</span>
                          </div>
                        </div>
                      )}

                      {/* JazzCash */}
                      {paymentMethod === 'jazzcash' && (
                        <div className="space-y-2 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                            <span className="font-semibold">Account Name:</span>
                            <span>The Khanabadosh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Mobile Number:</span>
                            <span className="font-mono">03001234567</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Transaction Proof Upload */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Upload Transaction Proof / Screenshot *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setTransactionProof(e.target.files?.[0] || null)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Please upload a clear screenshot of your payment confirmation
                      </p>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                          required
                        />
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            I agree to the Terms & Conditions *
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                            <li>• Product will be sent after payment verification (24-48 hours)</li>
                            <li>• Digital products are non-refundable after delivery</li>
                            <li>• Ensure payment details are correct before submission</li>
                            <li>• Keep your transaction receipt for reference</li>
                            <li>• For queries, contact: support@thekhanabadosh.com</li>
                          </ul>
                          <button
                            type="button"
                            onClick={() => window.location.hash = 'terms'}
                            className="mt-2 text-emerald-600 hover:underline dark:text-emerald-400"
                          >
                            Read full Terms & Conditions →
                          </button>
                        </div>
                      </label>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                      <div className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
                        <Lock className="h-5 w-5" />
                        <p className="text-sm font-semibold">
                          Your payment information is secure and encrypted
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={() => setStep('info')}
                        variant="outline"
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-emerald-600 py-6 text-lg font-semibold hover:bg-emerald-700"
                      >
                        Complete Purchase
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Order Summary
              </h3>
              
              <div className="mb-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-semibold text-emerald-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="mb-2 flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="mb-4 flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-emerald-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
