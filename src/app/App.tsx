import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorldMap } from './components/WorldMap';
import { Adventures } from './components/Adventures';
import { RecentPosts } from './components/RecentPosts';
import { CountryPlaylists } from './components/CountryPlaylists';
import { GalleryPreview } from './components/GalleryPreview';
import { ShopShowcase } from './components/ShopShowcase';
import { About } from './components/About';
import { BlogPostLayout } from './components/BlogPostLayout';
import { AdventurePostLayout } from './components/AdventurePostLayout';
import { AdventuresPage } from './pages/AdventuresPage';
import { GalleryPage } from './pages/GalleryPage';
import { ShopPage } from './pages/ShopPage';
import { WorkWithUsPage } from './pages/WorkWithUsPage';
import { ReelsPage } from './pages/ReelsPage';
import { BlogsPage } from './pages/BlogsPage';
import { CheckoutPage } from './components/CheckoutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { CookiesPage } from './pages/CookiesPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { BlogEditor } from './pages/admin/BlogEditor';
import { AdventureEditor } from './pages/admin/AdventureEditor';
import { ProductEditor } from './pages/admin/ProductEditor';
import { ReelEditor } from './pages/admin/ReelEditor';
import { AdEditor } from './pages/admin/AdEditor';
import { OrdersManagement } from './pages/admin/OrdersManagement';
import { Footer } from './components/Footer';
import { blogPosts } from './data/sampleData';

type PageView = 'home' | 'adventures' | 'gallery' | 'shop' | 'blog-post' | 'work-with-us' | 'reels' | 'blogs' | 'checkout' | 'terms' | 'privacy' | 'disclaimer' | 'cookies' | 'admin' | 'admin-blog-editor' | 'admin-adventure-editor' | 'admin-product-editor' | 'admin-reel-editor' | 'admin-ad-editor' | 'admin-orders';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  // Listen for hash changes to navigate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      
      // Check if it's a blog post
      const post = blogPosts.find(p => p.slug === hash);
      if (post) {
        setCurrentView('blog-post');
        setSelectedPost(post.slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Check for page routes
      switch (hash) {
        case 'all-adventures':
          setCurrentView('adventures');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'gallery':
          setCurrentView('gallery');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'shop-page':
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'reels':
          setCurrentView('reels');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'blogs':
          setCurrentView('blogs');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'checkout':
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'work-with-us':
          setCurrentView('work-with-us');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'terms':
          setCurrentView('terms');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'privacy':
          setCurrentView('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'disclaimer':
          setCurrentView('disclaimer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'cookies':
          setCurrentView('cookies');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'adminpanel':
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'admin-blog-editor':
          setCurrentView('admin-blog-editor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'admin-adventure-editor':
          setCurrentView('admin-adventure-editor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'admin-product-editor':
          setCurrentView('admin-product-editor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'admin-reel-editor':
          setCurrentView('admin-reel-editor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'admin-ad-editor':
          setCurrentView('admin-ad-editor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'admin-orders':
          setCurrentView('admin-orders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'home':
        case '':
          setCurrentView('home');
          setSelectedPost(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        default:
          // If hash is a section on homepage (like #about, #map, etc.)
          if (['about', 'map', 'adventures', 'shop'].includes(hash)) {
            setCurrentView('home');
            setSelectedPost(null);
            // Let the browser handle scrolling to the section
          }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentPost = selectedPost ? blogPosts.find(p => p.slug === selectedPost) : null;

  // Render based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'blog-post':
        if (!currentPost) return null;
        // Use AdventurePostLayout if it has youtubeVideoId, otherwise BlogPostLayout
        if (currentPost.youtubeVideoId) {
          return (
            <AdventurePostLayout
              title={currentPost.title}
              date={currentPost.date}
              readTime={currentPost.readTime}
              coverImage={currentPost.coverImage}
              content={currentPost.content}
              category={currentPost.category}
              youtubeVideoId={currentPost.youtubeVideoId}
              contentImages={currentPost.gallery || currentPost.contentImages}
            />
          );
        }
        return (
          <BlogPostLayout
            title={currentPost.title}
            date={currentPost.date}
            readTime={currentPost.readTime}
            coverImage={currentPost.coverImage}
            content={currentPost.content}
            category={currentPost.category}
            contentImages={currentPost.gallery || currentPost.contentImages}
          />
        );

      case 'adventures':
        return <AdventuresPage />;

      case 'gallery':
        return <GalleryPage />;

      case 'shop':
        return <ShopPage />;

      case 'reels':
        return <ReelsPage />;

      case 'blogs':
        return <BlogsPage />;

      case 'checkout':
        return <CheckoutPage onBack={() => setCurrentView('shop')} />;

      case 'work-with-us':
        return <WorkWithUsPage />;

      case 'terms':
        return <TermsPage />;

      case 'privacy':
        return <PrivacyPage />;

      case 'disclaimer':
        return <DisclaimerPage />;

      case 'cookies':
        return <CookiesPage />;

      case 'admin':
        return <AdminDashboard />;

      case 'admin-blog-editor':
        return <BlogEditor />;

      case 'admin-adventure-editor':
        return <AdventureEditor />;

      case 'admin-product-editor':
        return <ProductEditor />;

      case 'admin-reel-editor':
        return <ReelEditor />;

      case 'admin-ad-editor':
        return <AdEditor />;

      case 'admin-orders':
        return <OrdersManagement />;

      case 'home':
      default:
        return (
          <main id="home">
            <Hero />
            <RecentPosts />
            <CountryPlaylists />
            <Adventures />
            <WorldMap />
            <GalleryPreview />
            <ShopShowcase />
            <About />
          </main>
        );
    }
  };

  // Hide navbar and footer for admin pages
  const isAdminPage = currentView.startsWith('admin');

  return (
    <div className="min-h-screen">
      {!isAdminPage && <Navbar />}
      {renderContent()}
      {!isAdminPage && <Footer />}
    </div>
  );
}
