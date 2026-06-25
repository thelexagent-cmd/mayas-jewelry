"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";
import {
  HiXMark,
  HiEye,
  HiEyeSlash,
  HiEnvelope,
  HiLockClosed,
  HiUser,
} from "react-icons/hi2";

type Tab = "signin" | "register";

export default function LoginModal() {
  const { isLoginOpen, closeLogin, login, register } = useAuth();
  const { showNotification } = useUI();

  const [activeTab, setActiveTab] = useState<Tab>("signin");
  const [loading, setLoading] = useState(false);

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register fields
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const resetFields = () => {
    setSignInEmail("");
    setSignInPassword("");
    setShowSignInPassword(false);
    setRememberMe(false);
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterConfirm("");
    setShowRegisterPassword(false);
    setLoading(false);
    setActiveTab("signin");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) return;
    setLoading(true);
    const success = await login(signInEmail, signInPassword);
    setLoading(false);
    if (success) {
      showNotification("Welcome back! You are now signed in.", "success");
      resetFields();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerConfirm) return;
    if (registerPassword !== registerConfirm) {
      showNotification("Passwords do not match.", "error");
      return;
    }
    setLoading(true);
    const success = await register(registerName, registerEmail, registerPassword);
    setLoading(false);
    if (success) {
      showNotification("Account created successfully. Welcome!", "success");
      resetFields();
    }
  };

  const handleForgotPassword = () => {
    showNotification("Password reset link has been sent to your email.", "info");
  };

  const handleSocialLogin = (provider: string) => {
    showNotification(`${provider} login coming soon.`, "info");
  };

  const handleClose = () => {
    closeLogin();
    resetFields();
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-obsidian/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
          >
            <div
              className="relative w-full max-w-md bg-charcoal border border-whisper/10 p-8 md:p-10 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-ivory/50 hover:text-gold transition-colors duration-300"
                aria-label="Close login"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="text-center mb-8">
                <h2
                  className="font-luxury text-2xl text-gold-gradient tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  MAYA&apos;S
                </h2>
              </div>

              {/* Tabs */}
              <div className="relative flex mb-8 border-b border-whisper/15">
                <button
                  onClick={() => setActiveTab("signin")}
                  className={`flex-1 pb-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    activeTab === "signin" ? "text-gold" : "text-whisper/50 hover:text-ivory/70"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 pb-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    activeTab === "register" ? "text-gold" : "text-whisper/50 hover:text-ivory/70"
                  }`}
                >
                  Create Account
                </button>

                {/* Animated Underline */}
                <motion.div
                  className="absolute bottom-0 h-[1px] bg-gold"
                  animate={{
                    left: activeTab === "signin" ? "0%" : "50%",
                    width: "50%",
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>

              {/* Sign In Form */}
              <AnimatePresence mode="wait">
                {activeTab === "signin" ? (
                  <motion.form
                    key="signin"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSignIn}
                    className="space-y-6"
                  >
                    {/* Email */}
                    <div className="relative">
                      <HiEnvelope className="absolute left-0 top-3 w-4 h-4 text-whisper/40" />
                      <input
                        type="email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="Email address"
                        required
                        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory text-sm py-3 pl-7 pr-3 outline-none placeholder:text-whisper/30 transition-colors duration-300"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <HiLockClosed className="absolute left-0 top-3 w-4 h-4 text-whisper/40" />
                      <input
                        type={showSignInPassword ? "text" : "password"}
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory text-sm py-3 pl-7 pr-10 outline-none placeholder:text-whisper/30 transition-colors duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className="absolute right-0 top-3 text-whisper/40 hover:text-ivory transition-colors"
                        aria-label={showSignInPassword ? "Hide password" : "Show password"}
                      >
                        {showSignInPassword ? (
                          <HiEyeSlash className="w-4 h-4" />
                        ) : (
                          <HiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 border transition-all duration-300 flex items-center justify-center ${
                              rememberMe
                                ? "bg-gold border-gold"
                                : "border-whisper/30 group-hover:border-whisper/50"
                            }`}
                          >
                            {rememberMe && (
                              <svg className="w-3 h-3 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-whisper/60">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-gold/70 hover:text-gold transition-colors duration-300"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-luxury w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2">
                        {loading ? (
                          <svg className="animate-spin w-4 h-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : null}
                        {loading ? "Signing In..." : "Sign In"}
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-whisper/15" />
                      <span className="text-xs text-whisper/40 uppercase tracking-[0.1em]">
                        or continue with
                      </span>
                      <div className="flex-1 h-px bg-whisper/15" />
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("Google")}
                        className="flex items-center justify-center gap-2 py-3 border border-whisper/20 text-ivory/70 hover:border-gold/40 hover:text-ivory transition-all duration-300 text-xs uppercase tracking-[0.1em]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("Apple")}
                        className="flex items-center justify-center gap-2 py-3 border border-whisper/20 text-ivory/70 hover:border-gold/40 hover:text-ivory transition-all duration-300 text-xs uppercase tracking-[0.1em]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Apple
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleRegister}
                    className="space-y-6"
                  >
                    {/* Full Name */}
                    <div className="relative">
                      <HiUser className="absolute left-0 top-3 w-4 h-4 text-whisper/40" />
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="Full name"
                        required
                        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory text-sm py-3 pl-7 pr-3 outline-none placeholder:text-whisper/30 transition-colors duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <HiEnvelope className="absolute left-0 top-3 w-4 h-4 text-whisper/40" />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="Email address"
                        required
                        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory text-sm py-3 pl-7 pr-3 outline-none placeholder:text-whisper/30 transition-colors duration-300"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <HiLockClosed className="absolute left-0 top-3 w-4 h-4 text-whisper/40" />
                      <input
                        type={showRegisterPassword ? "text" : "password"}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory text-sm py-3 pl-7 pr-10 outline-none placeholder:text-whisper/30 transition-colors duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-0 top-3 text-whisper/40 hover:text-ivory transition-colors"
                        aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                      >
                        {showRegisterPassword ? (
                          <HiEyeSlash className="w-4 h-4" />
                        ) : (
                          <HiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <HiLockClosed className="absolute left-0 top-3 w-4 h-4 text-whisper/40" />
                      <input
                        type={showRegisterPassword ? "text" : "password"}
                        value={registerConfirm}
                        onChange={(e) => setRegisterConfirm(e.target.value)}
                        placeholder="Confirm password"
                        required
                        className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory text-sm py-3 pl-7 pr-3 outline-none placeholder:text-whisper/30 transition-colors duration-300"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-luxury w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2">
                        {loading ? (
                          <svg className="animate-spin w-4 h-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : null}
                        {loading ? "Creating Account..." : "Create Account"}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
