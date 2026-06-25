import { notFound } from "next/navigation";
import Link from "next/link";
import {
  COLLECTIONS,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import CollectionHeroBanner from "./CollectionHeroBanner";

export async function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found | MAYA'S" };

  return {
    title: `${collection.name} | MAYA'S Fine Jewelry`,
    description: collection.description,
  };
}

export default async function CollectionPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6">
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
              <Link
                href="/collections"
                className="text-smoke hover:text-gold transition-colors duration-300"
              >
                Collections
              </Link>
              <span className="text-smoke/30">/</span>
              <span className="text-ivory">{collection.name}</span>
            </nav>

            <CollectionHeroBanner collection={collection} />
          </div>
        </section>

        {/* Products Section */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <CollectionGrid products={products} showCategoryFilter={true} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
