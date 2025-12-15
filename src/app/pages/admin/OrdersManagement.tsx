import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface Order {
  id: string;
  customerName: string;
  email: string;
  product: string;
  amount: string;
  paymentMethod: string;
  transactionProof: string;
  status: 'pending' | 'verified' | 'rejected';
  date: string;
  downloadLink?: string;
}

export function OrdersManagement() {
  const [editingDownloadLink, setEditingDownloadLink] = useState<string | null>(null);
  const [downloadLinkInput, setDownloadLinkInput] = useState('');

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Ali Khan',
      email: 'ali@example.com',
      product: 'Lightroom Presets Pack',
      amount: '$29.99',
      paymentMethod: 'JazzCash',
      transactionProof: 'https://placehold.co/400x600',
      status: 'pending',
      date: '2025-12-13',
    },
    {
      id: 'ORD-002',
      customerName: 'Sara Ahmed',
      email: 'sara@example.com',
      product: 'Travel Guide E-Book',
      amount: '$19.99',
      paymentMethod: 'Easypaisa',
      transactionProof: 'https://placehold.co/400x600',
      status: 'pending',
      date: '2025-12-12',
    },
  ]);

  const handleVerify = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'verified' } : order
    ));
    setEditingDownloadLink(orderId);
    alert(`Order ${orderId} verified! Now add download link for the customer.`);
  };

  const handleReject = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    alert(`Order ${orderId} rejected!`);
  };

  const handleSaveDownloadLink = (orderId: string) => {
    if (!downloadLinkInput.trim()) {
      alert('Please enter a download link!');
      return;
    }
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, downloadLink: downloadLinkInput } : order
    ));
    setEditingDownloadLink(null);
    setDownloadLinkInput('');
    alert(`Download link saved! Email sent to customer with download access.`);
  };

  const handleEditDownloadLink = (orderId: string, currentLink?: string) => {
    setEditingDownloadLink(orderId);
    setDownloadLinkInput(currentLink || '');
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
          <Clock className="h-3 w-3" />
          Pending
        </span>;
      case 'verified':
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="h-3 w-3" />
          Verified
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="h-3 w-3" />
          Rejected
        </span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => window.location.hash = 'adminpanel'} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Orders Management
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Orders</p>
                <p className="mt-2 text-3xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Verified</p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'verified').length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                <p className="mt-2 text-3xl font-bold text-red-600">
                  {orders.filter(o => o.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Customer:</span>
                        <span className="text-gray-600 dark:text-gray-400">{order.customerName}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
                        <span className="text-gray-600 dark:text-gray-400">{order.email}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Product:</span>
                        <span className="text-gray-600 dark:text-gray-400">{order.product}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Amount:</span>
                        <span className="font-bold text-emerald-600">{order.amount}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Payment Method:</span>
                        <span className="text-gray-600 dark:text-gray-400">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Proof */}
                  <div className="lg:w-64">
                    <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Transaction Proof:
                    </p>
                    <img
                      src={order.transactionProof}
                      alt="Transaction proof"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700"
                    />
                    <Button
                      variant="outline"
                      className="mt-2 w-full"
                      onClick={() => window.open(order.transactionProof, '_blank')}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Full Size
                    </Button>
                  </div>

                  {/* Actions */}
                  {order.status === 'pending' && (
                    <div className="flex flex-col gap-3 lg:w-40">
                      <Button
                        onClick={() => handleVerify(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                      <Button
                        onClick={() => handleReject(order.id)}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {order.status === 'verified' && (
                    <div className="flex flex-col gap-3 lg:w-64">
                      {/* Download Link Input */}
                      {editingDownloadLink === order.id ? (
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            Download Link:
                          </label>
                          <input
                            type="url"
                            value={downloadLinkInput}
                            onChange={(e) => setDownloadLinkInput(e.target.value)}
                            placeholder="https://drive.google.com/..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSaveDownloadLink(order.id)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              size="sm"
                            >
                              Save Link
                            </Button>
                            <Button
                              onClick={() => {
                                setEditingDownloadLink(null);
                                setDownloadLinkInput('');
                              }}
                              variant="outline"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {order.downloadLink ? (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                              <p className="mb-1 text-xs font-semibold text-green-800 dark:text-green-300">
                                Download Link Active:
                              </p>
                              <p className="mb-2 truncate text-xs text-green-600 dark:text-green-400">
                                {order.downloadLink}
                              </p>
                              <Button
                                onClick={() => handleEditDownloadLink(order.id, order.downloadLink)}
                                variant="outline"
                                size="sm"
                                className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30"
                              >
                                Edit Link
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleEditDownloadLink(order.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Add Download Link
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
