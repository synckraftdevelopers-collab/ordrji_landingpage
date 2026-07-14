"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import RoleSwitcher from "@/components/RoleSwitcher";
import { 
  Zap, Shield, Smartphone, CloudLightning, Activity, 
  CreditCard, Scissors, Receipt, CheckCircle, ChevronDown, ArrowRight,
  TrendingUp, Clock, FileText, Database, Plus, Users, WifiOff
} from "lucide-react";

// --- Custom Hooks ---

function useOnScreen(ref: React.RefObject<HTMLElement | null>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIntersecting(true);
      },
      { rootMargin, threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useOnScreen(ref);

  useEffect(() => {
    if (!inView) return;
    if (target === 0) { setCount(0); return; }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <div ref={ref} className="be-stat-number">{count}{suffix}</div>;
}

// --- Main Page Component ---

export default function BillingEnginePage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  const heroInView = useOnScreen(heroRef);
  const featuresInView = useOnScreen(featuresRef);
  const comparisonInView = useOnScreen(comparisonRef);
  const workflowInView = useOnScreen(workflowRef);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  if (!mounted) return null; // Avoid hydration mismatch on initial render due to complex DOM

  return (
    <>
      <Head>
        <title>Restaurant Billing Engine | Ordrji</title>
        <meta name="description" content="Enterprise-grade lightning fast restaurant POS and billing software. Handle complex orders, split bills, and generate GST invoices with ease." />
      </Head>

      <Navbar onBookDemo={() => setIsDemoOpen(true)} onRegister={() => setIsRegisterOpen(true)} />

      <main className="be-main">
        {/* --- HERO SECTION --- */}
        <section className="be-hero">
          <div className="be-glow-blob be-blob-1" />
          <div className="be-glow-blob be-blob-2" />
          
          <div className="container be-hero-container" ref={heroRef}>
            <div className={`be-hero-content ${heroInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="be-hero-badge">
                <span className="be-badge-dot" /> POS & Billing Engine
              </div>
              <h1 className="be-hero-title">
                Lightning Fast Billing Engine for <span className="be-text-gradient">Modern Restaurants</span>
              </h1>
              <p className="be-hero-subtitle">
                Built for speed, stability, and scale. Settle bills in under 3 seconds, manage complex tables, and keep operations flowing smoothly—even completely offline.
              </p>
              <div className="be-hero-actions">
                <button onClick={() => setIsDemoOpen(true)} className="btn-primary btn-red be-hero-btn">
                  Book a Demo
                </button>
                <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-secondary be-hero-btn">
                  Start Free Trial <ArrowRight size={16} />
                </a>
              </div>
              <div className="be-trust-bar">
                <p>Trusted by Modern Restaurants</p>
                <div className="be-trust-logos">
                  <div className="be-trust-logo">
                    <img src="/images/logos/virsa.jpg" alt="Virsa Restro" />
                    <span>Virsa Restro</span>
                  </div>
                  <div className="be-trust-logo">
                    <img src="/images/logos/mirabel.jpg" alt="Mirabel" />
                    <span>Mirabel</span>
                  </div>
                  <div className="be-trust-logo">
                    <img src="/images/logos/kitchen365.jpg" alt="Kitchen 365" />
                    <span>Kitchen 365</span>
                  </div>
                  <div className="be-trust-logo">
                    <img src="/images/logos/mansarovar.jpg" alt="Point Mansarovar" />
                    <span>Point Mansarovar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`be-hero-visual ${heroInView ? 'reveal-up delay-2' : 'opacity-0'}`}>
              <div className="be-glass-panel be-main-dashboard">
                {/* CSS Mockup of POS Interface */}
                <div className="be-mockup-header">
                  <div className="be-mockup-search">🔍 Search items, order id...</div>
                  <div className="be-mockup-user"><Users size={12}/> Cashier 01</div>
                </div>
                <div className="be-mockup-body">
                  <div className="be-mockup-sidebar">
                    <div className="be-mock-item active">🍔 Burgers</div>
                    <div className="be-mock-item">🍕 Pizza</div>
                    <div className="be-mock-item">🍹 Drinks</div>
                    <div className="be-mock-item">🍰 Desserts</div>
                  </div>
                  <div className="be-mockup-grid">
                    <div className="be-mock-card"><div className="be-mock-img"/><div className="be-mock-txt">Classic Burger<br/><span>₹199</span></div></div>
                    <div className="be-mock-card"><div className="be-mock-img"/><div className="be-mock-txt">Cheese Fries<br/><span>₹149</span></div></div>
                    <div className="be-mock-card"><div className="be-mock-img"/><div className="be-mock-txt">Coke Zero<br/><span>₹60</span></div></div>
                  </div>
                  <div className="be-mockup-cart">
                    <div className="be-mock-cart-title">Table 12 (Dine-In)</div>
                    <div className="be-mock-cart-item"><span>1x Classic Burger</span><span>₹199</span></div>
                    <div className="be-mock-cart-item"><span>1x Cheese Fries</span><span>₹149</span></div>
                    <div className="be-mock-cart-total">
                      <span>Total (incl. Taxes)</span>
                      <span className="be-total-amt">₹365.40</span>
                    </div>
                    <div className="be-mock-cart-btn">Charge ₹365.40</div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="be-float-card be-float-1">
                <Receipt size={20} color="#e30613" />
                <div>
                  <h4>Bill Split Complete</h4>
                  <p>Equal split: 3 ways</p>
                </div>
              </div>
              <div className="be-float-card be-float-2">
                <CheckCircle size={20} color="#059669" />
                <div>
                  <h4>Payment Received</h4>
                  <p>UPI • ₹365.40</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PRODUCT SHOWCASE (ALTERNATE LAYOUTS) --- */}
        <section className="be-features-section" ref={featuresRef}>
          <div className="container">
            <div className="be-section-header">
              <h2 className="be-section-title">Everything you need to <br/>run a high-volume outlet</h2>
              <p className="be-section-desc">We've engineered every pixel of the billing experience to save your staff precious seconds during peak rush hours.</p>
            </div>

            {/* Feature 1: Image Right */}
            <div className={`be-feature-row ${featuresInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="be-feature-text">
                <div className="be-feature-icon-box"><Zap size={24} /></div>
                <h3>Lightning Fast Checkout</h3>
                <p>Process orders, modify items, and generate bills in less than 3 seconds. Our highly optimized interface ensures zero UI lag, even with 10,000+ items in your menu database.</p>
                <ul className="be-feature-list">
                  <li><CheckCircle size={16} /> Instant search & barcode scanning</li>
                  <li><CheckCircle size={16} /> Quick-tap category navigation</li>
                  <li><CheckCircle size={16} /> Hotkeys for desktop users</li>
                </ul>
              </div>
              <div className="be-feature-visual">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" alt="Fast Checkout POS" className="be-feature-img" />
                <div className="be-visual-overlay-card">
                  <Clock size={16} color="#e30613" /> Avg billing time: 2.8s
                </div>
              </div>
            </div>

            {/* Feature 2: Image Left */}
            <div className={`be-feature-row be-row-reverse ${featuresInView ? 'reveal-up delay-1' : 'opacity-0'}`}>
              <div className="be-feature-text">
                <div className="be-feature-icon-box"><CloudLightning size={24} /></div>
                <h3>100% Offline Capable</h3>
                <p>Internet downtime shouldn't stop your business. The Ordrji Billing Engine runs flawlessly offline. Keep punching orders, printing KOTs, and settling bills locally.</p>
                <ul className="be-feature-list">
                  <li><CheckCircle size={16} /> Auto-syncs when internet restores</li>
                  <li><CheckCircle size={16} /> No data loss guarantee</li>
                  <li><CheckCircle size={16} /> Local server fallback mode</li>
                </ul>
              </div>
              <div className="be-feature-visual">
                <div className="be-offline-mockup">
                  <div className="be-offline-pulse">
                    <WifiOff size={48} color="#e30613" />
                  </div>
                  <h4>Offline Mode Active</h4>
                  <p>14 bills waiting to sync</p>
                </div>
              </div>
            </div>

            {/* Feature 3: Image Right */}
            <div className={`be-feature-row ${featuresInView ? 'reveal-up delay-2' : 'opacity-0'}`}>
              <div className="be-feature-text">
                <div className="be-feature-icon-box"><Scissors size={24} /></div>
                <h3>Advanced Bill Splitting</h3>
                <p>Handling large groups is no longer a nightmare. Split checks evenly, by specific items, or by custom amounts in a matter of seconds.</p>
                <ul className="be-feature-list">
                  <li><CheckCircle size={16} /> Drag & drop item splitting</li>
                  <li><CheckCircle size={16} /> Multi-tender payments (Cash + UPI + Card)</li>
                  <li><CheckCircle size={16} /> Generate separate GST invoices instantly</li>
                </ul>
              </div>
              <div className="be-feature-visual">
                <div className="be-split-mockup">
                  <div className="be-split-header">Table 4 • ₹1,200 Total</div>
                  <div className="be-split-guests">
                    <div className="be-guest-card">
                      <div className="be-guest-av">G1</div>
                      <div className="be-guest-amt">₹400 <span>Paid</span></div>
                    </div>
                    <div className="be-guest-card">
                      <div className="be-guest-av">G2</div>
                      <div className="be-guest-amt">₹500 <span>Pending</span></div>
                    </div>
                    <div className="be-guest-card">
                      <div className="be-guest-av">G3</div>
                      <div className="be-guest-amt">₹300 <span>Pending</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WORKFLOW SECTION --- */}
        <section className="be-workflow-section" ref={workflowRef}>
          <div className="container">
            <div className="be-section-header">
              <h2 className="be-section-title">The Perfect Order Flow</h2>
              <p className="be-section-desc">A unified pipeline from the moment a guest sits down to the moment they leave.</p>
            </div>
            
            <div className={`be-workflow-pipeline ${workflowInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="be-flow-step">
                <div className="be-flow-icon"><FileText size={24} /></div>
                <h4>Take Order</h4>
                <p>Punch via POS or Guest QR</p>
              </div>
              <div className="be-flow-connector" />
              <div className="be-flow-step">
                <div className="be-flow-icon"><Activity size={24} /></div>
                <h4>Auto KOT</h4>
                <p>Routes to correct kitchen prep station</p>
              </div>
              <div className="be-flow-connector" />
              <div className="be-flow-step">
                <div className="be-flow-icon"><Receipt size={24} /></div>
                <h4>Generate Bill</h4>
                <p>Apply discounts & calculate GST</p>
              </div>
              <div className="be-flow-connector" />
              <div className="be-flow-step">
                <div className="be-flow-icon"><CreditCard size={24} /></div>
                <h4>Payment</h4>
                <p>Accept via Integrated UPI/Card</p>
              </div>
              <div className="be-flow-connector" />
              <div className="be-flow-step">
                <div className="be-flow-icon"><Database size={24} /></div>
                <h4>Sync Ops</h4>
                <p>Updates Inventory & Analytics</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMPARISON (Why Choose Ordrji) --- */}
        <section className="be-comparison-section" ref={comparisonRef}>
          <div className="container">
            <div className="be-section-header">
              <h2 className="be-section-title">Why choose Ordrji Billing?</h2>
              <p className="be-section-desc">Legacy POS systems are bloated and slow. We rebuilt the billing engine from scratch.</p>
            </div>

            <div className={`be-grid-cards ${comparisonInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="be-grid-card">
                <div className="be-card-icon"><TrendingUp size={24} /></div>
                <h4>Faster Operations</h4>
                <p>Save an average of 45 minutes per day on billing and reconciliation tasks.</p>
              </div>
              <div className="be-grid-card">
                <div className="be-card-icon"><Shield size={24} /></div>
                <h4>Fewer Errors</h4>
                <p>Automated tax calculations, inventory deduction, and zero manual entry errors.</p>
              </div>
              <div className="be-grid-card">
                <div className="be-card-icon"><CloudLightning size={24} /></div>
                <h4>Cloud Synchronized</h4>
                <p>Access live sales data from anywhere in the world on your smartphone dashboard.</p>
              </div>
              <div className="be-grid-card">
                <div className="be-card-icon"><Smartphone size={24} /></div>
                <h4>Hardware Agnostic</h4>
                <p>Runs perfectly on Windows PCs, Android Tablets, iPads, and mobile devices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATISTICS --- */}
        <section className="be-stats-section">
          <div className="container be-stats-container">
            <div className="be-stat-box">
              <AnimatedCounter target={3000} suffix="+" />
              <div className="be-stat-label">Restaurants Served</div>
            </div>
            <div className="be-stat-box">
              <AnimatedCounter target={1.2} suffix="M+" />
              <div className="be-stat-label">Bills Generated Daily</div>
            </div>
            <div className="be-stat-box">
              <AnimatedCounter target={99.9} suffix="%" />
              <div className="be-stat-label">System Uptime</div>
            </div>
            <div className="be-stat-box">
              <AnimatedCounter target={0} suffix="s" />
              <div className="be-stat-label">Sync Lag Time</div>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIAL --- */}
        <section className="be-testimonial-section">
          <div className="container">
            <div className="be-testimonial-card">
              <div className="be-quote-mark">"</div>
              <p className="be-testimonial-text">
                "We used to struggle with massive queues on weekends. Since switching to Ordrji's billing engine, our checkout time dropped from 2 minutes to literally seconds. The offline sync is a lifesaver during network drops."
              </p>
              <div className="be-testimonial-author">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=150" alt="Restaurant Owner" />
                <div>
                  <strong>Vikram Sharma</strong>
                  <span>Owner, The Spice Route (3 Outlets)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="be-faq-section">
          <div className="container be-faq-container">
            <div className="be-section-header">
              <h2 className="be-section-title">Frequently Asked Questions</h2>
            </div>
            <div className="be-faq-list">
              {[
                { q: "Does the billing system work without internet?", a: "Yes, completely! Ordrji is built with a local-first architecture. You can punch orders, print bills, and manage tables while completely offline. Data syncs automatically once the internet returns." },
                { q: "Can I use my existing thermal printer and cash drawer?", a: "Yes. Ordrji is hardware-agnostic and connects seamlessly via USB, LAN, or Bluetooth to standard ESC/POS thermal printers, barcode scanners, and electronic cash drawers." },
                { q: "How does it handle GST and custom taxes?", a: "It is fully compliant with Indian tax laws. You can easily configure GST (inclusive or exclusive), apply CESS, and set up dynamic service charges. HSN codes are printed directly on the invoices." },
                { q: "Can I manage Swiggy/Zomato orders on the same screen?", a: "Yes. Our ecosystem aggregates orders from Swiggy, Zomato, and your direct website straight into the same billing interface, so you don't need multiple tablets." }
              ].map((faq, idx) => (
                <div key={idx} className={`be-faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button className="be-faq-q" onClick={() => toggleFaq(idx)}>
                    {faq.q}
                    <Plus size={20} className="be-faq-icon" />
                  </button>
                  <div className="be-faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="be-final-cta">
          <div className="container">
            <div className="be-cta-box">
              <h2>Ready to upgrade your restaurant's billing?</h2>
              <p>Join thousands of modern restaurants streamlining their operations with Ordrji.</p>
              <div className="be-cta-actions">
                <button onClick={() => setIsDemoOpen(true)} className="btn-primary btn-red be-cta-btn">Book a Free Demo</button>
                <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-secondary be-cta-btn-alt">Start 14-Day Trial</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <RoleSwitcher />

      {/* --- STYLES --- */}
      <style jsx global>{`
        /* Reset & Base variables for this page */
        .be-main {
          overflow: hidden;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: inherit;
        }

        /* Utilities */
        .be-text-gradient {
          background: linear-gradient(135deg, #e30613 0%, #ff4b55 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .reveal-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .opacity-0 { opacity: 0; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Hero Section --- */
        .be-hero {
          position: relative;
          padding: 180px 0 100px;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        .be-glow-blob {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          opacity: 0.4;
          pointer-events: none;
        }
        .be-blob-1 {
          top: -100px; right: -100px;
          background: rgba(227, 6, 19, 0.15);
        }
        .be-blob-2 {
          bottom: 100px; left: -200px;
          background: rgba(5, 150, 105, 0.1);
        }

        .be-hero-container {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .be-hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
        }

        .be-hero-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (max-width: 992px) {
          .be-hero-content { align-items: center; }
        }

        .be-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(227, 6, 19, 0.08);
          color: #e30613;
          padding: 6px 16px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.85rem;
          width: fit-content;
        }
        .be-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #e30613;
        }

        .be-hero-title {
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .be-hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 500px;
        }

        .be-hero-actions {
          display: flex; gap: 16px; margin-top: 10px;
        }
        .be-hero-btn {
          padding: 14px 28px;
          font-size: 1.05rem;
          border-radius: 12px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-secondary.be-hero-btn {
          background: #fff;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .be-trust-bar {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid var(--border-color);
        }
        .be-trust-bar p {
          font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
        }
        .be-trust-logos {
          display: flex; gap: 30px;
          flex-wrap: wrap;
        }
        .be-trust-logo {
          display: flex; align-items: center; gap: 10px;
          opacity: 0.8;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .be-trust-logo img {
          width: 40px; height: 40px; border-radius: 8px; object-fit: contain;
          background: white; border: 1px solid rgba(0,0,0,0.05);
        }
        @media (max-width: 992px) {
          .be-trust-logos { justify-content: center; }
        }

        /* Mockup */
        .be-hero-visual {
          position: relative;
          perspective: 1000px;
        }
        .be-glass-panel {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
          overflow: hidden;
          transform: rotateY(-5deg) rotateX(5deg);
          transition: transform 0.3s ease;
        }
        .be-glass-panel:hover {
          transform: rotateY(0deg) rotateX(0deg);
        }

        .be-mockup-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 15px 20px; border-bottom: 1px solid rgba(0,0,0,0.05); background: #fbfbfb;
        }
        .be-mockup-search { color: #999; font-size: 0.85rem; }
        .be-mockup-user { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; }
        
        .be-mockup-body { display: flex; height: 350px; }
        .be-mockup-sidebar {
          width: 100px; border-right: 1px solid rgba(0,0,0,0.05); padding: 10px; display: flex; flex-direction: column; gap: 10px;
        }
        .be-mock-item {
          padding: 12px 5px; font-size: 0.75rem; font-weight: 600; text-align: center; border-radius: 8px; cursor: pointer;
        }
        .be-mock-item.active { background: #e30613; color: white; }
        
        .be-mockup-grid {
          flex: 1; padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; align-content: start; background: #fafafa;
        }
        .be-mock-card {
          background: white; border-radius: 12px; border: 1px solid #eee; overflow: hidden; display: flex; flex-direction: column;
        }
        .be-mock-img { height: 60px; background: #f0f0f0; }
        .be-mock-txt { padding: 10px; font-size: 0.8rem; font-weight: 600; }
        .be-mock-txt span { color: #e30613; }

        .be-mockup-cart {
          width: 180px; background: white; border-left: 1px solid rgba(0,0,0,0.05); padding: 15px; display: flex; flex-direction: column;
        }
        .be-mock-cart-title { font-weight: 700; font-size: 0.85rem; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed #ccc; }
        .be-mock-cart-item { display: flex; justify-content: space-between; font-size: 0.7rem; margin-bottom: 10px; color: #555; }
        .be-mock-cart-total { margin-top: auto; padding-top: 15px; border-top: 1px solid #eee; display: flex; flex-direction: column; gap: 5px; font-size: 0.75rem; font-weight: 600; }
        .be-total-amt { font-size: 1.1rem; color: #e30613; font-weight: 800; }
        .be-mock-cart-btn { margin-top: 15px; background: #059669; color: white; text-align: center; padding: 10px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }

        /* Float Cards */
        .be-float-card {
          position: absolute;
          background: white; border-radius: 12px; box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          padding: 12px 16px; display: flex; align-items: center; gap: 12px;
          animation: float 6s ease-in-out infinite;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .be-float-card h4 { margin: 0; font-size: 0.85rem; font-weight: 700; }
        .be-float-card p { margin: 0; font-size: 0.75rem; color: #666; }
        
        .be-float-1 { bottom: -20px; left: -40px; animation-delay: 0s; }
        .be-float-2 { top: 40px; right: -30px; animation-delay: 2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* --- Features Section --- */
        .be-features-section { padding: 120px 0; background: #fff; }
        .be-section-header { text-align: center; max-width: 600px; margin: 0 auto 80px; }
        .be-section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; line-height: 1.2; }
        .be-section-desc { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; }

        .be-feature-row {
          display: flex; align-items: center; gap: 80px; margin-bottom: 120px;
        }
        .be-row-reverse { flex-direction: row-reverse; }
        @media (max-width: 992px) {
          .be-feature-row, .be-row-reverse { flex-direction: column; gap: 40px; margin-bottom: 80px; }
        }

        .be-feature-text { flex: 1; }
        .be-feature-icon-box {
          width: 56px; height: 56px; border-radius: 16px; background: rgba(227, 6, 19, 0.08);
          color: #e30613; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
        }
        .be-feature-text h3 { font-size: 2rem; font-weight: 700; margin-bottom: 16px; }
        .be-feature-text p { font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; }
        .be-feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .be-feature-list li { display: flex; align-items: center; gap: 12px; font-weight: 600; color: var(--text-primary); font-size: 0.95rem; }
        .be-feature-list li svg { color: #059669; }

        .be-feature-visual { flex: 1; position: relative; }
        .be-feature-img { width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .be-visual-overlay-card {
          position: absolute; bottom: 30px; left: -30px; background: white; padding: 15px 24px; border-radius: 12px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.12); font-weight: 700; display: flex; align-items: center; gap: 10px;
        }

        .be-offline-mockup {
          background: #111; color: white; border-radius: 24px; padding: 60px 40px; text-align: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }
        .be-offline-pulse {
          width: 100px; height: 100px; border-radius: 50%; background: rgba(227,6,19,0.1); margin: 0 auto 30px;
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .be-offline-pulse::before {
          content: ''; position: absolute; inset: -20px; border-radius: 50%; border: 2px solid #e30613; opacity: 0;
          animation: pulseRing 2s infinite;
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .be-offline-mockup h4 { font-size: 1.5rem; margin-bottom: 10px; }
        .be-offline-mockup p { color: #aaa; font-size: 1rem; }

        .be-split-mockup {
          background: #f8f9fa; border-radius: 24px; padding: 40px; border: 1px solid #eaeaea; box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        .be-split-header { font-size: 1.2rem; font-weight: 800; text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #ddd; }
        .be-split-guests { display: flex; flex-direction: column; gap: 15px; }
        .be-guest-card { display: flex; align-items: center; justify-content: space-between; background: white; padding: 15px 20px; border-radius: 12px; border: 1px solid #eee; }
        .be-guest-av { width: 40px; height: 40px; border-radius: 50%; background: #ffe4e6; color: #e30613; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .be-guest-amt { font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 15px; }
        .be-guest-amt span { font-size: 0.75rem; padding: 4px 10px; border-radius: 20px; background: #f1f5f9; color: #64748b; }
        .be-guest-card:first-child .be-guest-amt span { background: #dcfce7; color: #166534; }

        /* --- Workflow --- */
        .be-workflow-section { padding: 100px 0; background: #fafafa; }
        .be-workflow-pipeline { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 60px; position: relative; }
        @media (max-width: 768px) {
          .be-workflow-pipeline { flex-direction: column; gap: 30px; align-items: center; }
        }
        .be-flow-step { text-align: center; width: 140px; z-index: 2; }
        .be-flow-icon { 
          width: 70px; height: 70px; margin: 0 auto 20px; border-radius: 20px; background: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: center; color: #e30613;
          transition: transform 0.3s;
        }
        .be-flow-step:hover .be-flow-icon { transform: translateY(-5px); }
        .be-flow-step h4 { font-weight: 700; font-size: 1rem; margin-bottom: 8px; }
        .be-flow-step p { font-size: 0.8rem; color: #666; line-height: 1.4; }
        .be-flow-connector { flex: 1; height: 2px; background: repeating-linear-gradient(90deg, #ccc, #ccc 5px, transparent 5px, transparent 10px); margin-top: 35px; }
        @media (max-width: 768px) { .be-flow-connector { display: none; } }

        /* --- Comparison Grid --- */
        .be-comparison-section { padding: 120px 0; background: white; }
        .be-grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 60px; }
        .be-grid-card {
          padding: 40px 30px; border-radius: 24px; border: 1px solid #eaeaea; background: #fff;
          transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }
        .be-grid-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: transparent; }
        .be-card-icon { width: 50px; height: 50px; border-radius: 12px; background: #fef2f2; color: #e30613; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .be-grid-card h4 { font-weight: 700; font-size: 1.25rem; margin-bottom: 12px; }
        .be-grid-card p { font-size: 0.95rem; color: #666; line-height: 1.6; }

        /* --- Stats --- */
        .be-stats-section { padding: 80px 0; background: #111; color: white; }
        .be-stats-container { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; text-align: center; }
        @media (max-width: 768px) { .be-stats-container { grid-template-columns: 1fr 1fr; gap: 40px; } }
        .be-stat-number { font-size: 3.5rem; font-weight: 800; color: #e30613; margin-bottom: 10px; line-height: 1; }
        .be-stat-label { font-size: 1rem; font-weight: 600; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }

        /* --- Testimonial --- */
        .be-testimonial-section { padding: 120px 0; background: #fafafa; }
        .be-testimonial-card {
          max-width: 800px; margin: 0 auto; background: white; padding: 60px; border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.05); position: relative; text-align: center;
        }
        .be-quote-mark { position: absolute; top: 20px; left: 40px; font-size: 120px; line-height: 1; color: #f1f1f1; font-family: serif; font-weight: 900; }
        .be-testimonial-text { font-size: 1.4rem; font-weight: 500; line-height: 1.6; color: #111; margin-bottom: 40px; position: relative; z-index: 2; font-style: italic; }
        .be-testimonial-author { display: flex; align-items: center; justify-content: center; gap: 20px; text-align: left; }
        .be-testimonial-author img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; }
        .be-testimonial-author strong { display: block; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
        .be-testimonial-author span { color: #666; font-size: 0.9rem; }

        /* --- FAQ --- */
        .be-faq-section { padding: 100px 0; background: white; }
        .be-faq-container { max-width: 800px; margin: 0 auto; }
        .be-faq-list { display: flex; flex-direction: column; gap: 16px; }
        .be-faq-item { border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden; transition: all 0.3s; }
        .be-faq-item.open { border-color: #e30613; box-shadow: 0 10px 25px rgba(227,6,19,0.05); }
        .be-faq-q {
          width: 100%; padding: 24px; display: flex; justify-content: space-between; align-items: center;
          background: transparent; border: none; font-size: 1.1rem; font-weight: 700; text-align: left; cursor: pointer; color: var(--text-primary);
        }
        .be-faq-icon { transition: transform 0.3s; color: #e30613; flex-shrink: 0; }
        .be-faq-item.open .be-faq-icon { transform: rotate(45deg); }
        .be-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; padding: 0 24px; }
        .be-faq-item.open .be-faq-a { max-height: 300px; padding-bottom: 24px; }
        .be-faq-a p { color: #666; line-height: 1.6; margin: 0; }

        /* --- Final CTA --- */
        .be-final-cta { padding: 100px 0; background: white; }
        .be-cta-box {
          background: linear-gradient(135deg, #111 0%, #222 100%);
          border-radius: 30px; padding: 80px 40px; text-align: center; color: white;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        .be-cta-box h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; }
        .be-cta-box p { font-size: 1.2rem; color: #ccc; margin-bottom: 40px; max-width: 600px; margin-inline: auto; }
        .be-cta-actions { display: flex; justify-content: center; gap: 16px; }
        .be-cta-btn { padding: 16px 32px; font-size: 1.1rem; border-radius: 12px; }
        .be-cta-btn-alt { padding: 16px 32px; font-size: 1.1rem; border-radius: 12px; background: rgba(255,255,255,0.1); color: white; transition: background 0.3s; }
        .be-cta-btn-alt:hover { background: rgba(255,255,255,0.2); }
        @media (max-width: 600px) { .be-cta-actions { flex-direction: column; } }
      `}</style>
    </>
  );
}
