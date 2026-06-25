import Link from "next/link";
import { COLLECTIONS, PRODUCTS } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionsHero from "./CollectionsHero";

export const metadata = {
  title: "Collections | MAYA'S Fine Jewelry",
  description:
    "Explore our curated jewelry collections — Heritage Gold, The Diamond Edit, Miami Luxe, and Bespoke Atelier. Four decades of excellence in Miami.",
};

export default function CollectionsPage() {
  const collectionsWithCounts = COLLECTIONS.map((collection) => ({
    ...collection,
    actualCount: PRODUCTS.filter((p) => p.collection === collection.slug).length,
  }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] mb-10">
              <Link
                href="/"
                className="text-smoke hover:text-gold transition-colors duration-300"
              >
                Home
              </Link>
              <span className="text-smoke/30">/</span>
              <span className="text-ivory">Collections</span>
            </nav>

            <CollectionsHero />
          </div>
        </section>

        {/* Collections Grid */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collectionsWithCounts.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[4/3] overflow-hidden block"
              >
                {/* Image */}
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                    {collection.actualCount} Pieces
                  </span>
                  <h2 className="font-luxury text-3xl sm:text-4xl text-ivory font-light mb-3">
                    {collection.name}
                  </h2>
                  <p className="text-sm text-whisper/80 leading-relaxed max-w-md mb-6">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
                    <span>Explore Collection</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="transition-transform duration-500 group-hover:translate-x-2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Gold accent lines */}
                <div className="absolute top-0 right-0 w-0 h-px bg-gold transition-all duration-700 group-hover:w-full" />
                <div className="absolute top-0 right-0 h-0 w-px bg-gold transition-all duration-700 delay-200 group-hover:h-full" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
