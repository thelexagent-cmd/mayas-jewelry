import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import BestSellers from "@/components/BestSellers";
import SignatureProducts from "@/components/SignatureProducts";
import BrandStory from "@/components/BrandStory";
import Craftsmanship from "@/components/Craftsmanship";
import CustomerReviews from "@/components/CustomerReviews";
import LifestyleGallery from "@/components/LifestyleGallery";
import InstagramFeed from "@/components/InstagramFeed";
import WhyChooseUs from "@/components/WhyChooseUs";
import StoreLocation from "@/components/StoreLocation";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import CartDrawer from "@/components/CartDrawer";
import LoginModal from "@/components/LoginModal";
import CookieBanner from "@/components/CookieBanner";
import QuickViewModal from "@/components/QuickViewModal";
import ToastNotification from "@/components/ToastNotification";

export default function Home() {
  return (
    <main className="grain-overlay">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <SignatureProducts />
      <BrandStory />
      <Craftsmanship />
      <CustomerReviews />
      <LifestyleGallery />
      <InstagramFeed />
      <WhyChooseUs />
      <StoreLocation />
      <FAQ />
      <Newsletter />
      <Footer />

      {/* Global Overlays */}
      <SearchOverlay />
      <CartDrawer />
      <LoginModal />
      <QuickViewModal />
      <CookieBanner />
      <ToastNotification />
    </main>
  );
}
