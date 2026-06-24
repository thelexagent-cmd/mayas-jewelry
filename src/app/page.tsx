import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import SignatureProducts from "@/components/SignatureProducts";
import BrandStory from "@/components/BrandStory";
import Craftsmanship from "@/components/Craftsmanship";
import CustomerReviews from "@/components/CustomerReviews";
import LifestyleGallery from "@/components/LifestyleGallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain-overlay">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <SignatureProducts />
      <BrandStory />
      <Craftsmanship />
      <CustomerReviews />
      <LifestyleGallery />
      <WhyChooseUs />
      <Newsletter />
      <Footer />
    </main>
  );
}
