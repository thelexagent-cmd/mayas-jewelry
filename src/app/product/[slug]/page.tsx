import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
  getCollectionBySlug,
  formatPrice,
} from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | MAYA'S" };

  return {
    title: `${product.name} | MAYA'S Fine Jewelry`,
    description: product.shortDescription,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const collection = getCollectionBySlug(product.collection);
  const collectionName = collection?.name ?? product.collection
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian">
        {/* Breadcrumb */}
        <section className="pt-32 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] mb-10">
              <Link
                href="/"
                className="text-smoke hover:text-gold transition-colors duration-300"
              >
                Home
              </Link>
              <span className="text-smoke/30">/</span>
              <Link
                href={`/collections/${product.collection}`}
                className="text-smoke hover:text-gold transition-colors duration-300"
              >
                {collectionName}
              </Link>
              <span className="text-smoke/30">/</span>
              <span className="text-ivory">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Section */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left - Gallery (55%) */}
              <div className="w-full lg:w-[55%]">
                <ProductGallery images={product.images} name={product.name} />
              </div>

              {/* Right - Details (45%) */}
              <div className="w-full lg:w-[45%]">
                <ProductDetails
                  product={product}
                  collectionName={collectionName}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="px-6 pb-32 border-t border-white/5">
            <div className="max-w-7xl mx-auto pt-20">
              <div className="text-center mb-16">
                <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
                  Curated for You
                </p>
                <h2 className="font-luxury text-3xl md:text-4xl text-ivory">
                  You May Also Like
                </h2>
                <div className="luxury-divider mx-auto mt-6" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {relatedProducts.map((rp, i) => (
                  <ProductCard key={rp.id} product={rp} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
