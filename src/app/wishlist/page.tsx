import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistContent from "./WishlistContent";

export const metadata = {
  title: "Your Wishlist | MAYA'S Fine Jewelry",
  description:
    "Your curated selection of saved pieces from MAYA'S Fine Jewelry.",
};

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian">
        <WishlistContent />
      </main>
      <Footer />
    </>
  );
}
