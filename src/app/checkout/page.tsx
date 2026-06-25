"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineLockClosed,
  HiOutlineTag,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const STEPS = [
  { label: "Cart Review", icon: HiOutlineShoppingBag },
  { label: "Shipping", icon: HiOutlineTruck },
  { label: "Payment", icon: HiOutlineCreditCard },
  { label: "Confirmation", icon: HiOutlineCheckCircle },
];

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  method: "standard" | "express";
}

interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
  sameAsBilling: boolean;
}

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, subtotal, tax, shipping, total, clearCart, itemCount } = useCart();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [trackingNotification, setTrackingNotification] = useState(false);

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    method: "standard",
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
    sameAsBilling: true,
  });

  const goTo = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsPlacingOrder(false);
    clearCart();
    goTo(3);
  };

  const shippingCost = shippingData.method === "express" ? 25 : shipping;
  const orderTotal = subtotal + tax + shippingCost;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // ── Empty cart ──
  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <HiOutlineShoppingBag className="w-16 h-16 text-whisper/40 mx-auto mb-6" />
          <h1 className="font-luxury text-3xl text-ivory mb-3">Your Cart is Empty</h1>
          <p className="text-smoke mb-8">Discover our exquisite collections and find your perfect piece.</p>
          <Link href="/" className="btn-luxury">
            <span>Continue Shopping</span>
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
          <div className="flex items-center gap-2 text-smoke">
            <HiOutlineLockClosed className="w-4 h-4" />
            <span className="text-xs tracking-wider uppercase">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isCompleted = i < step;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      borderColor: isActive || isCompleted ? "#C6A55C" : "rgba(184, 176, 164, 0.2)",
                      backgroundColor: isCompleted ? "#C6A55C" : "transparent",
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isCompleted ? "text-obsidian" : isActive ? "text-gold" : "text-whisper/40"
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`text-[10px] tracking-[0.15em] uppercase hidden sm:block ${
                      isActive ? "text-gold" : isCompleted ? "text-ivory" : "text-whisper/40"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-3 h-px bg-charcoal-light relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold"
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ════════ STEP 0: Cart Review ════════ */}
          {step === 0 && (
            <motion.div
              key="cart"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="font-luxury text-2xl text-ivory mb-6">
                  Your Cart <span className="text-smoke text-lg">({itemCount} items)</span>
                </h2>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex gap-5 p-4 border border-charcoal-light/50 rounded-sm group hover:border-gold/20 transition-colors duration-300"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-sm bg-charcoal">
                      <Image
                        src={item.product.images[0]?.src || ""}
                        alt={item.product.images[0]?.alt || item.product.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-luxury text-ivory text-sm sm:text-base">{item.product.name}</h3>
                          <p className="text-smoke text-xs mt-1">{item.product.material}</p>
                          {item.size && <p className="text-smoke text-xs">Size: {item.size}</p>}
                        </div>
                        <p className="text-gold font-luxury text-sm sm:text-base whitespace-nowrap">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 border border-whisper/20 rounded-sm flex items-center justify-center text-smoke hover:border-gold hover:text-gold transition-colors"
                          >
                            <HiOutlineMinus className="w-3 h-3" />
                          </button>
                          <span className="text-ivory text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 border border-whisper/20 rounded-sm flex items-center justify-center text-smoke hover:border-gold hover:text-gold transition-colors"
                          >
                            <HiOutlinePlus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-smoke hover:text-red-400 transition-colors"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Promo Code */}
                <div className="pt-4 border-t border-charcoal-light/30">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <HiOutlineTag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-whisper/40" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-transparent border border-whisper/20 pl-10 pr-4 py-3 text-ivory text-sm tracking-wider focus:border-gold focus:outline-none transition-colors placeholder:text-whisper/30"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (promoCode.trim()) setPromoApplied(true);
                      }}
                      className="px-6 border border-gold/50 text-gold text-xs tracking-[0.15em] uppercase hover:bg-gold/10 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-xs mt-2"
                    >
                      Promo code applied successfully
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shippingCost}
                  total={orderTotal}
                  promoApplied={promoApplied}
                />
                <button
                  onClick={() => goTo(1)}
                  className="w-full btn-luxury justify-center mt-6"
                >
                  <span>Continue to Shipping</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ STEP 1: Shipping ════════ */}
          {step === 1 && (
            <motion.div
              key="shipping"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              <div className="lg:col-span-2 space-y-8">
                <h2 className="font-luxury text-2xl text-ivory">Shipping Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  <ShippingInput
                    label="First Name"
                    value={shippingData.firstName}
                    onChange={(v) => setShippingData((p) => ({ ...p, firstName: v }))}
                  />
                  <ShippingInput
                    label="Last Name"
                    value={shippingData.lastName}
                    onChange={(v) => setShippingData((p) => ({ ...p, lastName: v }))}
                  />
                  <ShippingInput
                    label="Email"
                    type="email"
                    value={shippingData.email}
                    onChange={(v) => setShippingData((p) => ({ ...p, email: v }))}
                  />
                  <ShippingInput
                    label="Phone"
                    type="tel"
                    value={shippingData.phone}
                    onChange={(v) => setShippingData((p) => ({ ...p, phone: v }))}
                  />
                  <div className="sm:col-span-2">
                    <ShippingInput
                      label="Address"
                      value={shippingData.address}
                      onChange={(v) => setShippingData((p) => ({ ...p, address: v }))}
                    />
                  </div>
                  <ShippingInput
                    label="Apt / Suite (optional)"
                    value={shippingData.apt}
                    onChange={(v) => setShippingData((p) => ({ ...p, apt: v }))}
                  />
                  <ShippingInput
                    label="City"
                    value={shippingData.city}
                    onChange={(v) => setShippingData((p) => ({ ...p, city: v }))}
                  />
                  <ShippingInput
                    label="State"
                    value={shippingData.state}
                    onChange={(v) => setShippingData((p) => ({ ...p, state: v }))}
                  />
                  <ShippingInput
                    label="ZIP Code"
                    value={shippingData.zip}
                    onChange={(v) => setShippingData((p) => ({ ...p, zip: v }))}
                  />
                </div>

                {/* Shipping Method */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-ivory text-sm tracking-[0.15em] uppercase">Shipping Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: "standard" as const, label: "Standard Shipping", time: "5-7 business days", price: "Free" },
                      { id: "express" as const, label: "Express Shipping", time: "2-3 business days", price: "$25" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-colors duration-300 ${
                          shippingData.method === method.id
                            ? "border-gold bg-gold/5"
                            : "border-charcoal-light/50 hover:border-whisper/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              shippingData.method === method.id ? "border-gold" : "border-whisper/30"
                            }`}
                          >
                            {shippingData.method === method.id && (
                              <motion.div
                                layoutId="shipping-radio"
                                className="w-2 h-2 rounded-full bg-gold"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-ivory text-sm">{method.label}</p>
                            <p className="text-smoke text-xs">{method.time}</p>
                          </div>
                        </div>
                        <span className={`text-sm ${method.id === "standard" ? "text-green-400" : "text-ivory"}`}>
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => goTo(0)}
                    className="flex items-center gap-2 text-smoke hover:text-gold transition-colors text-sm tracking-wider"
                  >
                    <HiOutlineChevronLeft className="w-4 h-4" />
                    Back to Cart
                  </button>
                  <button onClick={() => goTo(2)} className="btn-luxury">
                    <span>Continue to Payment</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shippingCost}
                  total={orderTotal}
                  promoApplied={promoApplied}
                />
              </div>
            </motion.div>
          )}

          {/* ════════ STEP 2: Payment ════════ */}
          {step === 2 && (
            <motion.div
              key="payment"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              <div className="lg:col-span-2 space-y-8">
                <h2 className="font-luxury text-2xl text-ivory">Payment Details</h2>

                {/* Card Icons */}
                <div className="flex items-center gap-4">
                  <CardIcon type="visa" />
                  <CardIcon type="mastercard" />
                  <CardIcon type="amex" />
                </div>

                <div className="space-y-1">
                  <ShippingInput
                    label="Card Number"
                    value={paymentData.cardNumber}
                    onChange={(v) => setPaymentData((p) => ({ ...p, cardNumber: v }))}
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="grid grid-cols-2 gap-x-6">
                    <ShippingInput
                      label="Expiry Date"
                      value={paymentData.expiry}
                      onChange={(v) => setPaymentData((p) => ({ ...p, expiry: v }))}
                      placeholder="MM/YY"
                    />
                    <ShippingInput
                      label="CVV"
                      value={paymentData.cvv}
                      onChange={(v) => setPaymentData((p) => ({ ...p, cvv: v }))}
                      placeholder="123"
                    />
                  </div>
                  <ShippingInput
                    label="Name on Card"
                    value={paymentData.nameOnCard}
                    onChange={(v) => setPaymentData((p) => ({ ...p, nameOnCard: v }))}
                  />
                </div>

                {/* Alternative Payments */}
                <div className="space-y-4 pt-2">
                  <p className="text-smoke text-xs tracking-[0.15em] uppercase">Or pay with</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Apple Pay", "Google Pay", "PayPal", "Shop Pay"].map((method) => (
                      <button
                        key={method}
                        className="py-3 px-4 border border-charcoal-light/50 rounded-sm text-ivory text-xs tracking-wider hover:border-gold/30 hover:bg-gold/5 transition-colors duration-300"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Billing Address */}
                <label className="flex items-center gap-3 cursor-pointer pt-2">
                  <div
                    className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${
                      paymentData.sameAsBilling ? "border-gold bg-gold" : "border-whisper/30"
                    }`}
                    onClick={() => setPaymentData((p) => ({ ...p, sameAsBilling: !p.sameAsBilling }))}
                  >
                    {paymentData.sameAsBilling && (
                      <svg className="w-3 h-3 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-ivory text-sm">Billing address same as shipping</span>
                </label>

                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => goTo(1)}
                    className="flex items-center gap-2 text-smoke hover:text-gold transition-colors text-sm tracking-wider"
                  >
                    <HiOutlineChevronLeft className="w-4 h-4" />
                    Back to Shipping
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="btn-luxury relative"
                  >
                    {isPlacingOrder ? (
                      <span className="flex items-center gap-3">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-4 h-4 border-2 border-gold border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <HiOutlineLockClosed className="w-4 h-4" />
                        Place Order
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shippingCost}
                  total={orderTotal}
                  promoApplied={promoApplied}
                />
              </div>
            </motion.div>
          )}

          {/* ════════ STEP 3: Confirmation ════════ */}
          {step === 3 && (
            <motion.div
              key="confirmation"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              {/* Green Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-8"
              >
                <HiOutlineCheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="font-luxury text-3xl sm:text-4xl text-ivory mb-3"
              >
                Order Confirmed
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="text-smoke mb-2"
              >
                Thank you for your order
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
                className="text-gold font-luxury text-lg mb-8"
              >
                Order #MCG-2024-7842
              </motion.p>

              {/* Order Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
                className="border border-charcoal-light/50 rounded-sm p-6 mb-8 text-left"
              >
                <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-smoke">Subtotal</span>
                    <span className="text-ivory">--</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-smoke">Tax</span>
                    <span className="text-ivory">--</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-smoke">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="h-px bg-charcoal-light/30 my-2" />
                  <div className="flex justify-between">
                    <span className="text-ivory text-sm tracking-wider uppercase">Total</span>
                    <span className="text-gold font-luxury text-lg">--</span>
                  </div>
                </div>
                <p className="text-smoke text-xs mt-4">A confirmation email has been sent to your email address.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/" className="btn-luxury justify-center">
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={() => setTrackingNotification(true)}
                  className="px-8 py-4 border border-charcoal-light/50 text-ivory text-xs tracking-[0.2em] uppercase hover:border-gold/30 transition-colors"
                >
                  Track Order
                </button>
              </motion.div>

              {/* Tracking Notification */}
              <AnimatePresence>
                {trackingNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-6 p-4 border border-gold/20 bg-gold/5 rounded-sm"
                  >
                    <p className="text-gold text-sm">Tracking information has been sent to your email.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Order Summary Component ── */
function OrderSummary({
  subtotal,
  tax,
  shipping,
  total,
  promoApplied,
}: {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  promoApplied: boolean;
}) {
  return (
    <div className="border border-charcoal-light/50 rounded-sm p-6 sticky top-8">
      <h3 className="text-ivory text-sm tracking-[0.15em] uppercase mb-6">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-smoke">Subtotal</span>
          <span className="text-ivory">{formatPrice(subtotal)}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-green-400">Promo Discount</span>
            <span className="text-green-400">-{formatPrice(subtotal * 0.1)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-smoke">Tax (7%)</span>
          <span className="text-ivory">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-smoke">Shipping</span>
          <span className={shipping === 0 ? "text-green-400" : "text-ivory"}>
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        <div className="h-px bg-charcoal-light/30 my-2" />
        <div className="flex justify-between items-baseline">
          <span className="text-ivory text-sm tracking-wider uppercase">Total</span>
          <span className="text-gold font-luxury text-xl">
            {formatPrice(promoApplied ? total - subtotal * 0.1 : total)}
          </span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-charcoal-light/20">
        <div className="flex items-center gap-2 text-smoke text-xs">
          <HiOutlineLockClosed className="w-3 h-3" />
          <span>256-bit SSL encrypted payment</span>
        </div>
      </div>
    </div>
  );
}

/* ── Shipping Input Component ── */
function ShippingInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <label className="block text-whisper/60 text-[10px] tracking-[0.15em] uppercase mt-5 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold py-3 text-ivory text-sm tracking-wider focus:outline-none transition-colors duration-300 placeholder:text-whisper/20"
      />
    </div>
  );
}

/* ── Card Icon SVGs ── */
function CardIcon({ type }: { type: "visa" | "mastercard" | "amex" }) {
  const icons: Record<string, React.ReactNode> = {
    visa: (
      <svg viewBox="0 0 48 32" className="w-12 h-8" fill="none">
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <path d="M19.5 21H17L18.9 11H21.4L19.5 21ZM15.2 11L12.9 17.9L12.6 16.4L11.7 12C11.7 12 11.6 11 10.3 11H6.1L6 11.2C6 11.2 7.5 11.5 9.2 12.5L11.4 21H14L18 11H15.2ZM35 21H37.5L35.3 11H33.3C32.2 11 31.9 11.9 31.9 11.9L28 21H30.7L31.3 19.3H34.5L35 21ZM32 17.3L33.4 13.4L34.2 17.3H32ZM28.5 13.7L28.9 11.3C28.9 11.3 27.6 10.8 26.2 10.8C24.7 10.8 21.2 11.5 21.2 14.5C21.2 17.3 25.2 17.3 25.2 18.8C25.2 20.3 21.6 20 20.4 19L20 21.5C20 21.5 21.3 22.2 23.2 22.2C25.1 22.2 28.4 21.1 28.4 18.4C28.4 15.6 24.3 15.3 24.3 14.1C24.3 12.9 27.1 13.1 28.5 13.7Z" fill="white" />
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 48 32" className="w-12 h-8" fill="none">
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="8" fill="#EB001B" />
        <circle cx="29" cy="16" r="8" fill="#F79E1B" />
        <path d="M24 9.8C25.8 11.2 27 13.5 27 16C27 18.5 25.8 20.8 24 22.2C22.2 20.8 21 18.5 21 16C21 13.5 22.2 11.2 24 9.8Z" fill="#FF5F00" />
      </svg>
    ),
    amex: (
      <svg viewBox="0 0 48 32" className="w-12 h-8" fill="none">
        <rect width="48" height="32" rx="4" fill="#2E77BC" />
        <text x="24" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text>
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}
