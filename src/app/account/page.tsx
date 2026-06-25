"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlineCreditCard,
  HiOutlineCog6Tooth,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineArrowRightOnRectangle,
  HiOutlineExclamationTriangle,
  HiOutlineCheckBadge,
  HiOutlineTruck,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type Section = "profile" | "orders" | "wishlist" | "addresses" | "payment" | "settings";

const NAV_ITEMS: { id: Section; label: string; icon: typeof HiOutlineUser }[] = [
  { id: "profile", label: "Profile", icon: HiOutlineUser },
  { id: "orders", label: "Orders", icon: HiOutlineShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: HiOutlineHeart },
  { id: "addresses", label: "Addresses", icon: HiOutlineMapPin },
  { id: "payment", label: "Payment Methods", icon: HiOutlineCreditCard },
  { id: "settings", label: "Settings", icon: HiOutlineCog6Tooth },
];

/* ── Mock Data ── */
const MOCK_ORDERS = [
  {
    id: "MCG-2024-7842",
    date: "June 15, 2024",
    total: 4800,
    status: "Delivered" as const,
    items: [
      { name: "Cuban Link Heritage Chain", price: 4800, quantity: 1, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop&q=80" },
    ],
  },
  {
    id: "MCG-2024-6531",
    date: "May 2, 2024",
    total: 2800,
    status: "In Transit" as const,
    items: [
      { name: "Cuban Link Bracelet", price: 2800, quantity: 1, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop&q=80" },
    ],
  },
  {
    id: "MCG-2024-5219",
    date: "March 18, 2024",
    total: 1200,
    status: "Delivered" as const,
    items: [
      { name: "Oversized Gold Hoops", price: 1200, quantity: 1, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=200&h=200&fit=crop&q=80" },
    ],
  },
  {
    id: "MCG-2024-4100",
    date: "January 8, 2024",
    total: 890,
    status: "Delivered" as const,
    items: [
      { name: "Custom Initial Pendant", price: 890, quantity: 1, image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=200&h=200&fit=crop&q=80" },
    ],
  },
];

const MOCK_ADDRESSES = [
  { id: "1", label: "Home", street: "542 SW 12th Ave", city: "Miami", state: "FL", zip: "33130", isDefault: true },
  { id: "2", label: "Office", street: "1200 Brickell Ave", city: "Miami", state: "FL", zip: "33131", isDefault: false },
];

const MOCK_CARDS = [
  { id: "1", type: "Visa", last4: "4242", exp: "12/25", isDefault: true },
  { id: "2", type: "Amex", last4: "1001", exp: "08/26", isDefault: false },
];

export default function AccountPage() {
  const { user, isAuthenticated, openLogin, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("profile");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full border-2 border-whisper/20 flex items-center justify-center mx-auto mb-6">
            <HiOutlineUser className="w-10 h-10 text-whisper/40" />
          </div>
          <h1 className="font-luxury text-3xl text-ivory mb-3">Please Sign In</h1>
          <p className="text-smoke mb-8">Access your account to view orders, manage your wishlist, and more.</p>
          <button onClick={openLogin} className="btn-luxury mx-auto">
            <span>Sign In</span>
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-smoke hover:text-gold transition-colors mt-6 text-sm"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* ── Top Bar ── */}
      <div className="border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-smoke hover:text-gold transition-colors duration-300">
            <HiOutlineArrowLeft className="w-4 h-4" />
            <span className="text-xs tracking-[0.2em] uppercase">Back to Shop</span>
          </Link>
          <h1 className="font-luxury text-xl text-gold-gradient">MAYA&apos;S</h1>
          <span className="text-smoke text-xs tracking-wider uppercase">My Account</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Mobile Tabs ── */}
        <div className="lg:hidden mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${
                    activeSection === item.id
                      ? "bg-gold/10 text-gold border border-gold/30"
                      : "text-smoke border border-charcoal-light/30 hover:border-whisper/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-10">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-1">
              {/* User Card */}
              <div className="border border-charcoal-light/50 rounded-sm p-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold font-luxury text-lg">
                      {user?.name?.charAt(0)?.toUpperCase() || "G"}
                    </span>
                  </div>
                  <div>
                    <p className="text-ivory text-sm font-medium">{user?.name || "Guest"}</p>
                    <p className="text-smoke text-xs">{user?.email}</p>
                  </div>
                </div>
              </div>

              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm tracking-wider transition-colors duration-300 text-left ${
                      activeSection === item.id
                        ? "bg-gold/10 text-gold border-l-2 border-gold"
                        : "text-smoke hover:text-ivory hover:bg-charcoal-light/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── Content Area ── */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {activeSection === "profile" && <ProfileSection user={user} />}
                {activeSection === "orders" && <OrdersSection />}
                {activeSection === "wishlist" && <WishlistSection />}
                {activeSection === "addresses" && <AddressesSection />}
                {activeSection === "payment" && <PaymentSection />}
                {activeSection === "settings" && <SettingsSection logout={logout} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROFILE SECTION
   ══════════════════════════════════════════════════ */
function ProfileSection({ user }: { user: { id: string; name: string; email: string; avatar?: string } | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div>
      <h2 className="font-luxury text-2xl text-ivory mb-8">My Profile</h2>

      {/* Avatar + Info */}
      <div className="border border-charcoal-light/50 rounded-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="text-gold font-luxury text-3xl">
              {user?.name?.charAt(0)?.toUpperCase() || "G"}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-ivory text-xl font-luxury mb-1">{user?.name || "Guest User"}</h3>
            <p className="text-smoke text-sm">{user?.email}</p>
            <p className="text-whisper/40 text-xs mt-2">Member since 2024</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-5 max-w-md">
            <div>
              <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-luxury text-xs"
              >
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-charcoal-light/50 text-smoke text-xs tracking-[0.15em] uppercase hover:text-ivory transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-gold text-sm tracking-wider hover:text-gold-light transition-colors"
          >
            <HiOutlinePencilSquare className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ORDERS SECTION
   ══════════════════════════════════════════════════ */
function OrdersSection() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-luxury text-2xl text-ivory mb-8">Order History</h2>
      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => (
          <motion.div
            key={order.id}
            layout
            className="border border-charcoal-light/50 rounded-sm overflow-hidden"
          >
            {/* Order Header */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-charcoal-light/20 transition-colors"
            >
              <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
                <div className="text-left">
                  <p className="text-ivory text-sm font-medium">#{order.id}</p>
                  <p className="text-smoke text-xs mt-0.5">{order.date}</p>
                </div>
                <p className="text-gold font-luxury">{formatPrice(order.total)}</p>
                <StatusBadge status={order.status} />
              </div>
              {expandedOrder === order.id ? (
                <HiOutlineChevronUp className="w-5 h-5 text-smoke" />
              ) : (
                <HiOutlineChevronDown className="w-5 h-5 text-smoke" />
              )}
            </button>

            {/* Order Details */}
            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-charcoal-light/30 p-5 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-charcoal">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-ivory text-sm">{item.name}</p>
                          <p className="text-smoke text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-gold text-sm font-luxury">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "Delivered" | "In Transit" }) {
  const isDelivered = status === "Delivered";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wider ${
        isDelivered
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
      }`}
    >
      {isDelivered ? (
        <HiOutlineCheckBadge className="w-3.5 h-3.5" />
      ) : (
        <HiOutlineTruck className="w-3.5 h-3.5" />
      )}
      {status}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   WISHLIST SECTION
   ══════════════════════════════════════════════════ */
function WishlistSection() {
  const { items, removeItem } = useWishlist();

  if (items.length === 0) {
    return (
      <div>
        <h2 className="font-luxury text-2xl text-ivory mb-8">My Wishlist</h2>
        <div className="text-center py-16 border border-charcoal-light/30 rounded-sm">
          <HiOutlineHeart className="w-12 h-12 text-whisper/30 mx-auto mb-4" />
          <p className="text-smoke mb-2">Your wishlist is empty</p>
          <p className="text-whisper/40 text-sm">Browse our collections and save your favorite pieces.</p>
          <Link href="/" className="btn-luxury mt-6 inline-flex">
            <span>Explore Collections</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-luxury text-2xl text-ivory mb-8">
        My Wishlist <span className="text-smoke text-lg">({items.length})</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="border border-charcoal-light/50 rounded-sm overflow-hidden group"
          >
            <div className="relative aspect-square overflow-hidden bg-charcoal">
              <Image
                src={product.images[0]?.src || ""}
                alt={product.images[0]?.alt || product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-obsidian/80 backdrop-blur-sm rounded-full flex items-center justify-center text-smoke hover:text-red-400 transition-colors"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-whisper/50 text-[10px] tracking-[0.2em] uppercase mb-1">{product.collection}</p>
              <h3 className="text-ivory text-sm font-luxury mb-2">{product.name}</h3>
              <p className="text-gold font-luxury">{formatPrice(product.price)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ADDRESSES SECTION
   ══════════════════════════════════════════════════ */
function AddressesSection() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", street: "", city: "", state: "", zip: "" });

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAdd = () => {
    if (newAddress.label && newAddress.street) {
      setAddresses((prev) => [
        ...prev,
        { ...newAddress, id: Date.now().toString(), isDefault: false },
      ]);
      setNewAddress({ label: "", street: "", city: "", state: "", zip: "" });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-luxury text-2xl text-ivory">Saved Addresses</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-gold text-sm tracking-wider hover:text-gold-light transition-colors"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add New Address
        </button>
      </div>

      {/* Add Address Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden mb-6"
          >
            <div className="border border-gold/20 rounded-sm p-6 space-y-4">
              <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-4">New Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "Label (e.g. Home)", key: "label" as const },
                  { label: "Street Address", key: "street" as const },
                  { label: "City", key: "city" as const },
                  { label: "State", key: "state" as const },
                  { label: "ZIP Code", key: "zip" as const },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={newAddress[field.key]}
                      onChange={(e) => setNewAddress((p) => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={handleAdd} className="btn-luxury text-xs">
                  <span>Save Address</span>
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-charcoal-light/50 text-smoke text-xs tracking-[0.15em] uppercase hover:text-ivory transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <motion.div
            key={addr.id}
            layout
            className={`border rounded-sm p-5 relative ${
              addr.isDefault ? "border-gold/30 bg-gold/5" : "border-charcoal-light/50"
            }`}
          >
            {addr.isDefault && (
              <span className="absolute top-3 right-3 text-[10px] tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
            <p className="text-ivory text-sm font-medium mb-2">{addr.label}</p>
            <p className="text-smoke text-sm">{addr.street}</p>
            <p className="text-smoke text-sm">
              {addr.city}, {addr.state} {addr.zip}
            </p>
            <div className="flex gap-4 mt-4">
              <button className="text-gold text-xs tracking-wider hover:text-gold-light transition-colors flex items-center gap-1">
                <HiOutlinePencilSquare className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-smoke text-xs tracking-wider hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <HiOutlineTrash className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAYMENT METHODS SECTION
   ══════════════════════════════════════════════════ */
function PaymentSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-luxury text-2xl text-ivory">Payment Methods</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-gold text-sm tracking-wider hover:text-gold-light transition-colors"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add New Card
        </button>
      </div>

      {/* Add Card Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden mb-6"
          >
            <div className="border border-gold/20 rounded-sm p-6 space-y-4">
              <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-4">Add Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="sm:col-span-2">
                  <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors placeholder:text-whisper/20"
                  />
                </div>
                <div>
                  <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors placeholder:text-whisper/20"
                  />
                </div>
                <div>
                  <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors placeholder:text-whisper/20"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowForm(false)} className="btn-luxury text-xs">
                  <span>Save Card</span>
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-charcoal-light/50 text-smoke text-xs tracking-[0.15em] uppercase hover:text-ivory transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {MOCK_CARDS.map((card) => (
          <div
            key={card.id}
            className={`flex items-center justify-between p-5 border rounded-sm ${
              card.isDefault ? "border-gold/30 bg-gold/5" : "border-charcoal-light/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 border border-charcoal-light/50 rounded-sm flex items-center justify-center">
                {card.type === "Visa" ? (
                  <svg viewBox="0 0 48 32" className="w-10 h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="#1A1F71" />
                    <text x="24" y="19" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">VISA</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 48 32" className="w-10 h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="#2E77BC" />
                    <text x="24" y="19" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text>
                  </svg>
                )}
              </div>
              <div>
                <p className="text-ivory text-sm">
                  {card.type} ending in {card.last4}
                </p>
                <p className="text-smoke text-xs">Exp. {card.exp}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {card.isDefault && (
                <span className="text-[10px] tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
              <button className="text-smoke hover:text-red-400 transition-colors">
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SETTINGS SECTION
   ══════════════════════════════════════════════════ */
function SettingsSection({ logout }: { logout: () => void }) {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    priceAlerts: true,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div>
      <h2 className="font-luxury text-2xl text-ivory mb-8">Settings</h2>

      {/* Email Notifications */}
      <div className="border border-charcoal-light/50 rounded-sm p-6 mb-6">
        <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-6">Email Notifications</h3>
        <div className="space-y-5">
          {[
            { id: "orderUpdates" as const, label: "Order Updates", desc: "Shipping, delivery, and return notifications" },
            { id: "promotions" as const, label: "Promotions", desc: "Exclusive offers and seasonal sales" },
            { id: "newsletter" as const, label: "Newsletter", desc: "Weekly curated content and style guides" },
            { id: "priceAlerts" as const, label: "Price Alerts", desc: "Get notified when wishlist items go on sale" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-ivory text-sm">{item.label}</p>
                <p className="text-smoke text-xs">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((p) => ({ ...p, [item.id]: !p[item.id] }))}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                  notifications[item.id] ? "bg-gold" : "bg-charcoal-light"
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.id] ? 20 : 2 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="border border-charcoal-light/50 rounded-sm p-6 mb-6">
        <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-6">Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-2">Currency</label>
            <select className="w-full bg-charcoal border border-charcoal-light/50 px-4 py-3 text-ivory text-sm rounded-sm focus:border-gold focus:outline-none appearance-none cursor-pointer">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (&euro;)</option>
              <option value="GBP">GBP (&pound;)</option>
            </select>
          </div>
          <div>
            <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mb-2">Language</label>
            <select className="w-full bg-charcoal border border-charcoal-light/50 px-4 py-3 text-ivory text-sm rounded-sm focus:border-gold focus:outline-none appearance-none cursor-pointer">
              <option value="en">English</option>
              <option value="es">Espa&ntilde;ol</option>
              <option value="fr">Fran&ccedil;ais</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-500/20 rounded-sm p-6">
        <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-6">Account Actions</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-charcoal-light/50 text-ivory text-xs tracking-[0.15em] uppercase hover:border-gold/30 transition-colors"
          >
            <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
            Log Out
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-red-500/30 text-red-400 text-xs tracking-[0.15em] uppercase hover:bg-red-500/10 transition-colors"
          >
            <HiOutlineExclamationTriangle className="w-4 h-4" />
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-5 border border-red-500/20 bg-red-500/5 rounded-sm">
                <p className="text-ivory text-sm mb-1">Are you sure?</p>
                <p className="text-smoke text-xs mb-4">
                  This action is permanent and cannot be undone. All your data, orders, and preferences will be deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-5 py-2.5 border border-red-500/50 text-red-400 text-xs tracking-[0.15em] uppercase hover:bg-red-500/20 transition-colors"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-5 py-2.5 border border-charcoal-light/50 text-smoke text-xs tracking-[0.15em] uppercase hover:text-ivory transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
