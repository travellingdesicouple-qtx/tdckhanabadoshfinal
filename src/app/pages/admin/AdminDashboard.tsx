import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart3, FileText, Image, Video, ShoppingBag, TrendingUp, Users, DollarSign, User, Layout, MessageSquare, Check, X as XIcon, Clock } from 'lucide-react';
import AboutEditor from './AboutEditor';
import { HeroManager } from './HeroManager';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ordersApi, commentsApi, blogsApi, adventuresApi, productsApi, Order, Comment } from '../../../lib/api';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'blogs' | 'adventures' | 'reels' | 'shop' | 'orders' | 'ads' | 'about' | 'hero'>('dashboard');

  // Data State
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [unreadComments, setUnreadComments] = useState<Comment[]>([]);
  const [stats, setStats] = useState([
    { label: 'Total Blogs', value: '-', icon: FileText, color: 'bg-blue-500' },
    { label: 'Adventures', value: '-', icon: Video, color: 'bg-emerald-500' },
    { label: 'Products', value: '-', icon: ShoppingBag, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$0', icon: DollarSign, color: 'bg-yellow-500' },
  ]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Parallel data fetching
      const [blogs, adventures, products, orders, comments] = await Promise.all([
        blogsApi.getAll(),
        adventuresApi.getAll(),
        productsApi.getAll(),
        ordersApi.getAll(),
        commentsApi.getUnread()
      ]);

      // Calculate Revenue
      const totalRevenue = orders.reduce((sum: number, order: Order) => sum + (order.amount || 0), 0);

      // Update Stats
      setStats([
        { label: 'Total Blogs', value: blogs.length.toString(), icon: FileText, color: 'bg-blue-500' },
        { label: 'Adventures', value: adventures.length.toString(), icon: Video, color: 'bg-emerald-500' },
        { label: 'Products', value: products.length.toString(), icon: ShoppingBag, color: 'bg-purple-500' },
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-yellow-500' },
      ]);

      // Set Recent Data
      setRecentOrders(orders.slice(0, 5)); // Top 5 recent
      setUnreadComments(comments);

    } catch (error) {
      console.error('Failed to load dashboard data', error);
    }
  };

  const handleMarkCommentRead = async (id: string) => {
    await commentsApi.markAsRead(id);
    // Remove from UI instanly
    setUnreadComments(unreadComments.filter(c => c.id !== id));
  };

  const handleDeleteComment = async (id: string) => {
    if (!window.confirm('Delete this comment?')) return;
    await commentsApi.delete(id);
    setUnreadComments(unreadComments.filter(c => c.id !== id));
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500">The Khanabadosh</p>
          </div>

          <nav className="space-y-1 px-3 pb-6">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'dashboard'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-semibold">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSection('hero')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'hero'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <Layout className="h-5 w-5" />
              <span className="font-semibold">Hero Slider</span>
            </button>

            <button
              onClick={() => setActiveSection('adventures')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'adventures'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <Video className="h-5 w-5" />
              <span className="font-semibold">Adventures</span>
            </button>

            <button
              onClick={() => setActiveSection('blogs')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'blogs'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <FileText className="h-5 w-5" />
              <span className="font-semibold">Manage Blogs</span>
            </button>

            <button
              onClick={() => setActiveSection('shop')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'shop'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">Shop Products</span>
            </button>

            <button
              onClick={() => setActiveSection('orders')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'orders'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Orders</span>
            </button>

            <button
              onClick={() => setActiveSection('reels')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'reels'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <Video className="h-5 w-5" />
              <span className="font-semibold">Reels/Shorts</span>
            </button>

            <button
              onClick={() => setActiveSection('ads')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'ads'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <Image className="h-5 w-5" />
              <span className="font-semibold">Advertisements</span>
            </button>

            <button
              onClick={() => setActiveSection('about')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${activeSection === 'about'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <User className="h-5 w-5" />
              <span className="font-semibold">About Section</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {activeSection === 'hero' && (
            <HeroManager />
          )}
          {activeSection === 'about' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Edit About Section
              </h2>
              <AboutEditor />
            </div>
          )}
          {activeSection === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard Overview
              </h2>

              {/* Stats Grid */}
              <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.color} rounded-lg p-3`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2 mb-8">
                {/* Unread Comments Widget */}
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                    New Comments
                    {unreadComments.length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadComments.length}</span>
                    )}
                  </h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {unreadComments.length === 0 ? (
                      <p className="text-gray-500 italic">No new comments to read.</p>
                    ) : (
                      unreadComments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-semibold text-gray-900 dark:text-white">{comment.name}</div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleMarkCommentRead(comment.id)}
                                className="p-1 hover:bg-emerald-100 text-emerald-600 rounded"
                                title="Mark as Read"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="p-1 hover:bg-red-100 text-red-500 rounded"
                                title="Delete"
                              >
                                <XIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{comment.content}</p>
                          <div className="text-xs text-gray-400">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>

                {/* Recent Orders Widget */}
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-purple-600" />
                    Recent Orders
                  </h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {recentOrders.length === 0 ? (
                      <p className="text-gray-500 italic">No orders yet.</p>
                    ) : (
                      recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{order.product_title || 'Product'}</div>
                            <div className="text-sm text-gray-500">by {order.customer_name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-600">${order.amount}</div>
                            <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${order.status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                              {order.status}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Quick Actions
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button
                    onClick={() => setActiveSection('blogs')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Create New Blog
                  </Button>
                  <Button
                    onClick={() => window.location.hash = 'admin-adventure-editor'}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Create Adventure
                  </Button>
                  <Button
                    onClick={() => setActiveSection('shop')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeSection === 'blogs' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Manage Blogs
              </h2>
              <Button
                onClick={() => window.location.hash = 'admin-blog-editor'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Create New Blog
              </Button>
            </div>
          )}

          {activeSection === 'adventures' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Manage Adventures
              </h2>
              <Button
                onClick={() => window.location.hash = 'admin-adventure-editor'}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Video className="mr-2 h-4 w-4" />
                Add New Adventure
              </Button>
            </div>
          )}

          {activeSection === 'reels' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Manage Reels/Shorts
              </h2>
              <Button
                onClick={() => window.location.hash = 'admin-reel-editor'}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Video className="mr-2 h-4 w-4" />
                Add New Reel
              </Button>
            </div>
          )}

          {activeSection === 'shop' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Manage Products
              </h2>
              <Button
                onClick={() => window.location.hash = 'admin-product-editor'}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Orders Management
              </h2>
              <Button
                onClick={() => window.location.hash = 'admin-orders'}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                View All Orders
              </Button>
            </div>
          )}

          {activeSection === 'ads' && (
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Advertisement Management
              </h2>
              <Button
                onClick={() => window.location.hash = 'admin-ad-editor'}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <Image className="mr-2 h-4 w-4" />
                Create New Ad
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
