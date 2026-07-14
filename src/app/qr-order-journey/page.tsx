"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import RoleSwitcher from "@/components/RoleSwitcher";
import { 
  QrCode, Smartphone, CreditCard, BellRing, Paintbrush, TrendingUp,
  ArrowRight, CheckCircle, Utensils, MessageSquare, Plus, Clock,
  MonitorSmartphone, ShieldCheck, UserCheck, Share2, MousePointerClick
} from "lucide-react";

// --- Custom Hook for Scroll Reveal ---
function useOnScreen(ref: React.RefObject<HTMLElement | null>, rootMargin = "0px", threshold = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIntersecting(true);
      },
      { rootMargin, threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin, threshold]);
  return isIntersecting;
}

export default function QrOrderJourneyPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const heroRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  const heroInView = useOnScreen(heroRef);
  const journeyInView = useOnScreen(journeyRef, "-100px");
  const featuresInView = useOnScreen(featuresRef);
  const ecosystemInView = useOnScreen(ecosystemRef);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>QR Code Ordering | Ordrji</title>
        <meta name="description" content="Seamless contactless dining. Let your guests scan, order, and pay right from their phones without downloading any apps." />
      </Head>

      <Navbar onBookDemo={() => setIsDemoOpen(true)} onRegister={() => setIsRegisterOpen(true)} />

      <main className="qr-main">
        {/* --- HERO SECTION --- */}
        <section className="qr-hero">
          <div className="qr-hero-bg">
            <div className="qr-circle qr-circle-1" />
            <div className="qr-circle qr-circle-2" />
          </div>
          
          <div className="container qr-hero-container" ref={heroRef}>
            <div className={`qr-hero-content ${heroInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="qr-hero-badge">
                <QrCode size={16} /> Contactless Dining
              </div>
              <h1 className="qr-hero-title">
                Scan. Order. Pay. <span className="qr-text-gradient">Enjoy.</span>
              </h1>
              <p className="qr-hero-subtitle">
                Provide a seamless dining experience. Your guests can browse rich digital menus, customize their meals, and pay instantly—no app downloads required.
              </p>
              <div className="qr-hero-actions">
                <button onClick={() => setIsDemoOpen(true)} className="btn-primary qr-btn-primary">
                  Book a Demo
                </button>
                <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-secondary qr-btn-secondary">
                  Start Free Trial <ArrowRight size={16} />
                </a>
              </div>
              <div className="qr-hero-trust">
                <p>Join 1,000+ cafes & restaurants upgrading their guest experience.</p>
              </div>
            </div>

            <div className={`qr-hero-visual ${heroInView ? 'reveal-up delay-2' : 'opacity-0'}`}>
              <div className="qr-phone-mockup">
                <div className="qr-phone-notch" />
                <div className="qr-phone-screen">
                  {/* Fake UI */}
                  <div className="qr-ui-header">
                    <div className="qr-ui-brand">Cafe Mocha</div>
                    <div className="qr-ui-table">Table 4</div>
                  </div>
                  <div className="qr-ui-banner">
                    <h3>Today's Special</h3>
                    <p>Flat 20% Off on Combos</p>
                  </div>
                  <div className="qr-ui-categories">
                    <span className="active">Coffee</span>
                    <span>Pastries</span>
                    <span>Snacks</span>
                  </div>
                  <div className="qr-ui-list">
                    <div className="qr-ui-item">
                      <div className="qr-ui-item-img" />
                      <div className="qr-ui-item-info">
                        <h4>Iced Latte</h4>
                        <p>₹180</p>
                      </div>
                      <div className="qr-ui-add">+</div>
                    </div>
                    <div className="qr-ui-item">
                      <div className="qr-ui-item-img" />
                      <div className="qr-ui-item-info">
                        <h4>Cappuccino</h4>
                        <p>₹150</p>
                      </div>
                      <div className="qr-ui-add">+</div>
                    </div>
                  </div>
                  <div className="qr-ui-bottom-bar">
                    <div className="qr-ui-cart-btn">View Cart • ₹180</div>
                  </div>
                </div>
                {/* Floating scan line animation overlay */}
                <div className="qr-scan-line-overlay">
                  <div className="qr-scan-line" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="qr-float-bubble qr-float-left">
                <BellRing size={20} color="#f59e0b" /> Waiter Called
              </div>
              <div className="qr-float-bubble qr-float-right">
                <Utensils size={20} color="#10b981" /> Order Sent to Kitchen
              </div>
            </div>
          </div>
        </section>

        {/* --- CUSTOMER JOURNEY TIMELINE --- */}
        <section className="qr-journey-section" ref={journeyRef}>
          <div className="container">
            <div className="qr-section-header">
              <h2 className="qr-section-title">The Perfect Guest Journey</h2>
              <p className="qr-section-desc">From seating to leaving, every step is designed for maximum convenience and delight.</p>
            </div>
            
            <div className="qr-timeline-wrapper">
              <div className={`qr-timeline-line ${journeyInView ? 'animate-line' : ''}`} />
              
              {[
                { icon: <QrCode />, title: "1. Scan the QR", desc: "Guest sits at the table and scans the branded QR standee." },
                { icon: <Smartphone />, title: "2. Browse Menu", desc: "Rich digital menu opens instantly in their mobile browser." },
                { icon: <Plus />, title: "3. Customize & Order", desc: "Guest adds notes and sends the order directly to the kitchen." },
                { icon: <Utensils />, title: "4. Enjoy the Meal", desc: "Food arrives faster because order taking is automated." },
                { icon: <CreditCard />, title: "5. Digital Payment", desc: "Guest pays the bill via UPI or Card without waiting for the waiter." },
                { icon: <MessageSquare />, title: "6. Leave Feedback", desc: "Prompted to leave a review right after payment." }
              ].map((step, idx) => (
                <div key={idx} className={`qr-timeline-step ${idx % 2 === 0 ? 'left' : 'right'} ${journeyInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="qr-timeline-content">
                    <div className="qr-timeline-icon">{step.icon}</div>
                    <div className="qr-timeline-text">
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                  <div className="qr-timeline-dot" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SMART FEATURES (Alternating Layouts) --- */}
        <section className="qr-features-section" ref={featuresRef}>
          <div className="container">
            {/* Feature 1 */}
            <div className={`qr-feature-row ${featuresInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="qr-feature-text">
                <div className="qr-feature-badge"><Paintbrush size={16}/> Brand Matching</div>
                <h2>Beautiful Digital Menus</h2>
                <p>Don't settle for boring PDF menus. Give your guests a rich, interactive catalog with high-quality images, detailed descriptions, and dietary tags (Vegan, Gluten-Free, Spicy).</p>
                <ul className="qr-feature-list">
                  <li><CheckCircle size={18}/> Update items & prices instantly</li>
                  <li><CheckCircle size={18}/> Mark items out-of-stock with one tap</li>
                  <li><CheckCircle size={18}/> Automatically matches your brand colors</li>
                </ul>
              </div>
              <div className="qr-feature-visual">
                <div className="qr-visual-card qr-card-light">
                  <div className="qr-mock-menu">
                    <div className="qr-mock-img-placeholder" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400)'}} />
                    <div className="qr-mock-details">
                      <h4>Margherita Pizza <span className="veg-tag"/></h4>
                      <p>Classic delight with 100% real mozzarella cheese.</p>
                      <strong>₹399</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 (Reverse) */}
            <div className={`qr-feature-row reverse ${featuresInView ? 'reveal-up delay-1' : 'opacity-0'}`}>
              <div className="qr-feature-text">
                <div className="qr-feature-badge"><TrendingUp size={16}/> Revenue Boost</div>
                <h2>Smart Upselling Engine</h2>
                <p>Increase your average order value effortlessly. When a guest adds a burger to their cart, our system automatically recommends fries and a beverage.</p>
                <ul className="qr-feature-list">
                  <li><CheckCircle size={18}/> Customizable combo suggestions</li>
                  <li><CheckCircle size={18}/> Multi-level add-ons (Extra cheese, toppings)</li>
                  <li><CheckCircle size={18}/> Highlight chef specials</li>
                </ul>
              </div>
              <div className="qr-feature-visual">
                <div className="qr-visual-card qr-card-gradient">
                  <div className="qr-upsell-mock">
                    <h4>Frequently bought together</h4>
                    <div className="qr-upsell-item">
                      <div className="ui-icon">🍟</div>
                      <div className="ui-txt">Salted Fries <span>+₹99</span></div>
                      <div className="ui-btn">Add</div>
                    </div>
                    <div className="qr-upsell-item">
                      <div className="ui-icon">🥤</div>
                      <div className="ui-txt">Coke Zero <span>+₹60</span></div>
                      <div className="ui-btn">Add</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={`qr-feature-row ${featuresInView ? 'reveal-up delay-2' : 'opacity-0'}`}>
              <div className="qr-feature-text">
                <div className="qr-feature-badge"><MonitorSmartphone size={16}/> Service Hub</div>
                <h2>Waiter Call & Assistance</h2>
                <p>Guests no longer need to wave down staff. With a tap on their screen, they can request water, extra cutlery, or ask for the bill, instantly notifying your team.</p>
                <ul className="qr-feature-list">
                  <li><CheckCircle size={18}/> Targeted alerts to specific waiters</li>
                  <li><CheckCircle size={18}/> Reduce table wait times</li>
                  <li><CheckCircle size={18}/> Improve overall dining satisfaction</li>
                </ul>
              </div>
              <div className="qr-feature-visual">
                <div className="qr-visual-card qr-card-dark">
                  <div className="qr-waiter-mock">
                    <BellRing size={40} color="#fff" />
                    <h3>Call Waiter</h3>
                    <div className="qr-waiter-options">
                      <span>💧 Water</span>
                      <span>🍴 Cutlery</span>
                      <span>🧾 Bill</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ECOSYSTEM DIAGRAM --- */}
        <section className="qr-ecosystem-section" ref={ecosystemRef}>
          <div className="container">
            <div className="qr-section-header center">
              <h2 className="qr-section-title">Fully Integrated Operations</h2>
              <p className="qr-section-desc">QR orders don't just float in the cloud. They plug directly into your restaurant's nervous system.</p>
            </div>
            
            <div className={`qr-ecosystem-diagram ${ecosystemInView ? 'reveal-up' : 'opacity-0'}`}>
              <div className="eco-node eco-center">
                <Smartphone size={32} />
                <span>Guest QR Order</span>
              </div>
              
              <div className="eco-line eco-line-1" />
              <div className="eco-line eco-line-2" />
              <div className="eco-line eco-line-3" />
              
              <div className="eco-node eco-target eco-t1">
                <MonitorSmartphone size={24} />
                <span>Kitchen Display (KDS)</span>
              </div>
              <div className="eco-node eco-target eco-t2">
                <MonitorSmartphone size={24} />
                <span>Billing Engine</span>
              </div>
              <div className="eco-node eco-target eco-t3">
                <TrendingUp size={24} />
                <span>Inventory & Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY RESTAURANTS LOVE IT (Grid) --- */}
        <section className="qr-benefits-section">
          <div className="container">
            <div className="qr-section-header">
              <h2 className="qr-section-title">The Bottom Line Benefits</h2>
            </div>
            <div className="qr-benefits-grid">
              <div className="qr-benefit-card">
                <div className="qr-b-icon"><Clock /></div>
                <h4>Faster Table Turnover</h4>
                <p>Guests order and pay at their own pace, reducing dwell time by up to 15% during peak hours.</p>
              </div>
              <div className="qr-benefit-card">
                <div className="qr-b-icon"><ShieldCheck /></div>
                <h4>Zero Order Errors</h4>
                <p>What the guest selects is exactly what the kitchen receives. No miscommunication or manual entry mistakes.</p>
              </div>
              <div className="qr-benefit-card">
                <div className="qr-b-icon"><UserCheck /></div>
                <h4>Lower Staff Workload</h4>
                <p>Free up your waitstaff to focus on hospitality and food delivery rather than running back and forth for menus.</p>
              </div>
              <div className="qr-benefit-card">
                <div className="qr-b-icon"><Share2 /></div>
                <h4>Easy Menu Updates</h4>
                <p>Out of chicken? Update it on the dashboard and it vanishes from the digital menu instantly. No reprints.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIAL --- */}
        <section className="qr-testimonial-section">
          <div className="container">
            <div className="qr-testimonial-box">
              <div className="qr-stars">★★★★★</div>
              <p className="qr-quote">"Implementing Ordrji's QR ordering changed our business. Our average order value went up by 18% because the visual menu and upsells are so enticing, and our servers are much less stressed on weekends."</p>
              <div className="qr-author">
                <div className="qr-author-av">AK</div>
                <div className="qr-author-info">
                  <strong>Arjun Kapoor</strong>
                  <span>Manager, Brew & Bites Cafe</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="qr-faq-section">
          <div className="container">
            <div className="qr-section-header center">
              <h2 className="qr-section-title">Frequently Asked Questions</h2>
            </div>
            <div className="qr-faq-list">
              {[
                { q: "Do customers need to download an app?", a: "No. The QR code opens a lightweight web app directly in their smartphone's native browser (Safari/Chrome). It is frictionless and instant." },
                { q: "Can guests still pay by cash?", a: "Yes. They can choose 'Pay by Cash' on their phone, which alerts the waiter to collect the cash, or they can pay digitally via UPI/Card right from the menu." },
                { q: "What happens if a guest's internet is slow?", a: "Our digital menu is highly optimized, loads in milliseconds, and caches assets locally. We also offer local-network ordering modules for venues with zero cellular reception." },
                { q: "Can I customize the look of the menu?", a: "Absolutely. You can upload your logo, set your exact brand colors, choose typography, and toggle between grid or list views for your items." }
              ].map((faq, idx) => (
                <div key={idx} className={`qr-faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button className="qr-faq-q" onClick={() => toggleFaq(idx)}>
                    {faq.q}
                    <Plus size={20} className="qr-faq-icon" />
                  </button>
                  <div className="qr-faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="qr-final-cta">
          <div className="container">
            <div className="qr-cta-card">
              <div className="qr-cta-content">
                <h2>Ready to modernize your dining experience?</h2>
                <p>Give your guests the convenience they expect and watch your operational efficiency soar.</p>
                <div className="qr-cta-buttons">
                  <button onClick={() => setIsDemoOpen(true)} className="btn-primary qr-btn-primary">Book a Free Demo</button>
                  <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-secondary qr-btn-secondary-light">Start 14-Day Trial</a>
                </div>
              </div>
              <div className="qr-cta-decor">
                <QrCode size={120} opacity={0.1} />
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
        .qr-main {
          overflow: hidden;
          background-color: #fff;
          color: var(--text-primary);
          font-family: inherit;
        }

        /* Utilities */
        .qr-text-gradient {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .reveal-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .opacity-0 { opacity: 0; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Hero Section --- */
        .qr-hero {
          position: relative;
          padding: 160px 0 100px;
          min-height: 90vh;
          display: flex; align-items: center;
          background: linear-gradient(180deg, #fffaf5 0%, #fff 100%);
        }
        .qr-hero-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .qr-circle { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; }
        .qr-circle-1 { width: 400px; height: 400px; background: #ffedd5; top: -100px; right: -50px; }
        .qr-circle-2 { width: 300px; height: 300px; background: #fce7f3; bottom: 50px; left: -50px; }

        .qr-hero-container {
          position: relative; z-index: 10;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center;
        }
        @media (max-width: 992px) {
          .qr-hero-container { grid-template-columns: 1fr; text-align: center; gap: 60px; }
        }

        .qr-hero-content { display: flex; flex-direction: column; gap: 24px; }
        @media (max-width: 992px) { .qr-hero-content { align-items: center; } }

        .qr-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #ffedd5; color: #ea580c; padding: 8px 16px; border-radius: 30px;
          font-weight: 700; font-size: 0.85rem; width: fit-content;
        }
        .qr-hero-title { font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 800; line-height: 1.1; letter-spacing: -1px; }
        .qr-hero-subtitle { font-size: 1.15rem; color: #555; line-height: 1.6; max-width: 520px; }
        
        .qr-hero-actions { display: flex; gap: 16px; margin-top: 10px; }
        .qr-btn-primary { background: #ea580c; color: white; padding: 14px 28px; border-radius: 30px; font-weight: 600; border: none; }
        .qr-btn-primary:hover { background: #c2410c; }
        .qr-btn-secondary { background: white; color: #333; padding: 14px 28px; border-radius: 30px; font-weight: 600; border: 2px solid #eaeaea; display: flex; align-items: center; gap: 8px; }
        .qr-btn-secondary:hover { border-color: #ccc; }

        .qr-hero-trust { margin-top: 20px; font-size: 0.9rem; color: #777; font-weight: 500; }

        /* Smartphone Mockup */
        .qr-hero-visual { position: relative; display: flex; justify-content: center; }
        .qr-phone-mockup {
          width: 280px; height: 580px; background: white; border-radius: 40px;
          border: 12px solid #111; box-shadow: 0 30px 60px rgba(234, 88, 12, 0.15);
          position: relative; overflow: hidden;
        }
        .qr-phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 25px; background: #111; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 10; }
        .qr-phone-screen { height: 100%; background: #f9fafb; display: flex; flex-direction: column; position: relative; }
        
        .qr-ui-header { padding: 40px 20px 15px; background: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; }
        .qr-ui-brand { font-weight: 800; font-size: 1.1rem; }
        .qr-ui-table { font-size: 0.75rem; background: #f1f5f9; padding: 4px 8px; border-radius: 10px; font-weight: 600; }
        .qr-ui-banner { margin: 15px; padding: 15px; background: linear-gradient(135deg, #f97316, #ea580c); color: white; border-radius: 12px; }
        .qr-ui-banner h3 { font-size: 0.9rem; margin: 0 0 5px; }
        .qr-ui-banner p { font-size: 0.75rem; margin: 0; opacity: 0.9; }
        .qr-ui-categories { display: flex; gap: 10px; padding: 0 15px 15px; overflow-x: auto; scrollbar-width: none; }
        .qr-ui-categories span { font-size: 0.75rem; padding: 6px 12px; background: white; border-radius: 20px; white-space: nowrap; font-weight: 600; color: #555; border: 1px solid #eee; }
        .qr-ui-categories span.active { background: #111; color: white; border-color: #111; }
        .qr-ui-list { padding: 0 15px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .qr-ui-item { display: flex; align-items: center; gap: 12px; background: white; padding: 10px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .qr-ui-item-img { width: 50px; height: 50px; border-radius: 8px; background: #e2e8f0; }
        .qr-ui-item-info { flex: 1; }
        .qr-ui-item-info h4 { margin: 0 0 4px; font-size: 0.85rem; }
        .qr-ui-item-info p { margin: 0; font-size: 0.8rem; color: #ea580c; font-weight: 700; }
        .qr-ui-add { width: 28px; height: 28px; border-radius: 50%; background: #fef08a; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #a16207; font-size: 1.1rem; }
        .qr-ui-bottom-bar { padding: 15px; background: white; border-top: 1px solid #eee; }
        .qr-ui-cart-btn { background: #ea580c; color: white; text-align: center; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; }

        .qr-scan-line-overlay { position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: 28px; z-index: 20; }
        .qr-scan-line { width: 100%; height: 3px; background: rgba(234, 88, 12, 0.8); box-shadow: 0 0 15px 3px rgba(234, 88, 12, 0.4); animation: scanLine 3s infinite linear; }
        @keyframes scanLine { 0% { transform: translateY(-10px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(580px); opacity: 0; } }

        .qr-float-bubble { position: absolute; background: white; padding: 12px 20px; border-radius: 30px; display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.85rem; box-shadow: 0 15px 30px rgba(0,0,0,0.1); animation: float 5s infinite ease-in-out; border: 1px solid #f8f8f8; z-index: 30; }
        .qr-float-left { top: 100px; left: -60px; animation-delay: 0s; }
        .qr-float-right { bottom: 120px; right: -80px; animation-delay: 2.5s; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @media (max-width: 768px) { .qr-float-bubble { display: none; } }

        /* --- Journey Timeline --- */
        .qr-journey-section { padding: 100px 0; background: #fff; }
        .qr-section-header { text-align: center; max-width: 600px; margin: 0 auto 60px; }
        .qr-section-header.center { margin: 0 auto 60px; }
        .qr-section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; line-height: 1.2; }
        .qr-section-desc { font-size: 1.1rem; color: #666; line-height: 1.6; }

        .qr-timeline-wrapper { position: relative; max-width: 800px; margin: 0 auto; padding: 40px 0; }
        .qr-timeline-line { position: absolute; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); width: 4px; background: #f1f5f9; border-radius: 4px; }
        .qr-timeline-line.animate-line::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; background: #ea580c; animation: drawLine 3s ease-out forwards; }
        @keyframes drawLine { from { height: 0; } to { height: 100%; } }
        
        .qr-timeline-step { display: flex; justify-content: flex-end; align-items: center; width: 50%; position: relative; margin-bottom: 40px; padding-right: 40px; }
        .qr-timeline-step.right { left: 50%; justify-content: flex-start; padding-right: 0; padding-left: 40px; }
        .qr-timeline-step:last-child { margin-bottom: 0; }

        .qr-timeline-content { background: white; padding: 24px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; display: flex; gap: 20px; align-items: flex-start; width: 100%; max-width: 380px; }
        .qr-timeline-icon { width: 48px; height: 48px; flex-shrink: 0; background: #fff7ed; color: #ea580c; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .qr-timeline-text h3 { font-size: 1.1rem; font-weight: 700; margin: 0 0 8px; }
        .qr-timeline-text p { font-size: 0.9rem; color: #666; margin: 0; line-height: 1.5; }
        
        .qr-timeline-dot { position: absolute; right: -10px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; border-radius: 50%; background: white; border: 4px solid #ea580c; z-index: 2; }
        .qr-timeline-step.right .qr-timeline-dot { right: auto; left: -10px; }

        @media (max-width: 768px) {
          .qr-timeline-line { left: 20px; }
          .qr-timeline-step, .qr-timeline-step.right { width: 100%; left: 0; padding-left: 60px; padding-right: 0; justify-content: flex-start; }
          .qr-timeline-dot, .qr-timeline-step.right .qr-timeline-dot { left: 10px; right: auto; }
        }

        /* --- Smart Features (Alternating) --- */
        .qr-features-section { padding: 80px 0; background: #f8fafc; }
        .qr-feature-row { display: flex; align-items: center; gap: 60px; margin-bottom: 100px; }
        .qr-feature-row.reverse { flex-direction: row-reverse; }
        @media (max-width: 992px) { .qr-feature-row, .qr-feature-row.reverse { flex-direction: column; gap: 40px; margin-bottom: 60px; } }

        .qr-feature-text { flex: 1; }
        .qr-feature-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .qr-feature-text h2 { font-size: 2.2rem; font-weight: 800; margin-bottom: 20px; }
        .qr-feature-text p { font-size: 1.1rem; color: #555; line-height: 1.6; margin-bottom: 24px; }
        .qr-feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .qr-feature-list li { display: flex; align-items: center; gap: 12px; font-weight: 500; font-size: 1rem; color: #333; }
        .qr-feature-list li svg { color: #10b981; }

        .qr-feature-visual { flex: 1; display: flex; justify-content: center; }
        .qr-visual-card { width: 100%; max-width: 400px; border-radius: 30px; padding: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .qr-card-light { background: white; }
        .qr-card-gradient { background: linear-gradient(135deg, #fdf4ff, #fae8ff); }
        .qr-card-dark { background: #1e293b; color: white; }

        /* Mocks */
        .qr-mock-menu { border: 1px solid #eee; border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .qr-mock-img-placeholder { height: 160px; background-size: cover; background-position: center; }
        .qr-mock-details { padding: 20px; }
        .qr-mock-details h4 { margin: 0 0 8px; display: flex; align-items: center; justify-content: space-between; font-size: 1.1rem; }
        .veg-tag { width: 12px; height: 12px; border: 1px solid #16a34a; border-radius: 2px; display: inline-block; position: relative; }
        .veg-tag::after { content:''; position: absolute; top:2px; left:2px; width:6px; height:6px; background:#16a34a; border-radius:50%; }
        .qr-mock-details p { font-size: 0.85rem; color: #666; margin: 0 0 12px; }
        .qr-mock-details strong { font-size: 1.2rem; color: #111; }

        .qr-upsell-mock { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .qr-upsell-mock h4 { font-size: 0.9rem; color: #666; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px; }
        .qr-upsell-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .qr-upsell-item:last-child { border: none; padding-bottom: 0; }
        .ui-icon { font-size: 1.5rem; background: #f8fafc; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
        .ui-txt { flex: 1; font-weight: 600; font-size: 0.95rem; }
        .ui-txt span { display: block; font-size: 0.8rem; color: #ea580c; }
        .ui-btn { padding: 6px 12px; background: #fff7ed; color: #ea580c; border-radius: 20px; font-weight: 700; font-size: 0.8rem; }

        .qr-waiter-mock { text-align: center; padding: 20px 0; }
        .qr-waiter-mock h3 { font-size: 1.5rem; margin: 20px 0; color: white; }
        .qr-waiter-options { display: flex; flex-direction: column; gap: 12px; }
        .qr-waiter-options span { background: #334155; padding: 16px; border-radius: 12px; font-weight: 600; font-size: 1rem; color: white; display: block; cursor: pointer; transition: background 0.2s; }
        .qr-waiter-options span:hover { background: #475569; }

        /* --- Ecosystem --- */
        .qr-ecosystem-section { padding: 100px 0; background: white; }
        .qr-ecosystem-diagram { display: flex; justify-content: center; align-items: center; flex-direction: column; position: relative; margin-top: 40px; height: 300px; }
        .eco-node { background: white; border: 2px solid #eaeaea; border-radius: 16px; padding: 16px 24px; display: flex; align-items: center; gap: 12px; font-weight: 700; box-shadow: 0 10px 20px rgba(0,0,0,0.05); z-index: 2; position: absolute; }
        .eco-center { top: 0; left: 50%; transform: translateX(-50%); border-color: #ea580c; color: #ea580c; }
        .eco-target { bottom: 0; }
        .eco-t1 { left: 10%; } .eco-t2 { left: 50%; transform: translateX(-50%); } .eco-t3 { right: 10%; }
        @media (max-width: 768px) {
          .qr-ecosystem-diagram { height: auto; flex-direction: column; gap: 40px; }
          .eco-node { position: relative; left: auto !important; right: auto !important; transform: none !important; width: 100%; justify-content: center; }
          .eco-line { display: none; }
        }
        .eco-line { position: absolute; border: 2px dashed #cbd5e1; z-index: 1; }
        .eco-line-1 { width: 30%; height: 200px; top: 40px; left: 25%; border-bottom: none; border-right: none; border-radius: 20px 0 0 0; }
        .eco-line-2 { width: 2px; height: 200px; top: 40px; left: 50%; }
        .eco-line-3 { width: 30%; height: 200px; top: 40px; right: 25%; border-bottom: none; border-left: none; border-radius: 0 20px 0 0; }

        /* --- Benefits Grid --- */
        .qr-benefits-section { padding: 100px 0; background: #fff7ed; }
        .qr-benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; margin-top: 50px; }
        .qr-benefit-card { background: white; padding: 30px; border-radius: 24px; text-align: center; box-shadow: 0 10px 20px rgba(234,88,12,0.05); transition: transform 0.3s; }
        .qr-benefit-card:hover { transform: translateY(-5px); }
        .qr-b-icon { width: 60px; height: 60px; margin: 0 auto 20px; background: #ffedd5; color: #ea580c; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .qr-benefit-card h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; }
        .qr-benefit-card p { font-size: 0.95rem; color: #666; line-height: 1.5; margin: 0; }

        /* --- Testimonial --- */
        .qr-testimonial-section { padding: 100px 0; background: white; }
        .qr-testimonial-box { max-width: 800px; margin: 0 auto; text-align: center; }
        .qr-stars { color: #fbbf24; font-size: 2rem; letter-spacing: 4px; margin-bottom: 24px; }
        .qr-quote { font-size: 1.5rem; font-weight: 600; line-height: 1.6; color: #111; margin-bottom: 40px; font-style: italic; }
        .qr-author { display: flex; align-items: center; justify-content: center; gap: 16px; }
        .qr-author-av { width: 50px; height: 50px; background: #1e293b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; }
        .qr-author-info { text-align: left; }
        .qr-author-info strong { display: block; font-size: 1rem; }
        .qr-author-info span { font-size: 0.85rem; color: #666; }

        /* --- FAQ --- */
        .qr-faq-section { padding: 80px 0; background: #f8fafc; }
        .qr-faq-list { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
        .qr-faq-item { background: white; border-radius: 16px; overflow: hidden; transition: all 0.3s; border: 1px solid #eaeaea; }
        .qr-faq-item.open { border-color: #ea580c; box-shadow: 0 10px 25px rgba(234,88,12,0.08); }
        .qr-faq-q { width: 100%; padding: 24px; display: flex; justify-content: space-between; align-items: center; background: transparent; border: none; font-size: 1.05rem; font-weight: 700; text-align: left; cursor: pointer; color: var(--text-primary); }
        .qr-faq-icon { transition: transform 0.3s; color: #ea580c; flex-shrink: 0; }
        .qr-faq-item.open .qr-faq-icon { transform: rotate(45deg); }
        .qr-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; padding: 0 24px; }
        .qr-faq-item.open .qr-faq-a { max-height: 300px; padding-bottom: 24px; }
        .qr-faq-a p { color: #555; line-height: 1.6; margin: 0; }

        /* --- Final CTA --- */
        .qr-final-cta { padding: 100px 0; background: white; }
        .qr-cta-card { background: #ea580c; border-radius: 30px; padding: 80px 40px; text-align: center; color: white; position: relative; overflow: hidden; }
        .qr-cta-content { position: relative; z-index: 10; max-width: 600px; margin: 0 auto; }
        .qr-cta-content h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; }
        .qr-cta-content p { font-size: 1.15rem; opacity: 0.9; margin-bottom: 40px; }
        .qr-cta-buttons { display: flex; justify-content: center; gap: 16px; }
        .qr-cta-buttons .qr-btn-primary { background: white; color: #ea580c; }
        .qr-cta-buttons .qr-btn-primary:hover { background: #f8f8f8; }
        .qr-btn-secondary-light { border: 2px solid rgba(255,255,255,0.4); color: white; padding: 14px 28px; border-radius: 30px; font-weight: 600; text-decoration: none; display: inline-block; transition: background 0.2s; }
        .qr-btn-secondary-light:hover { background: rgba(255,255,255,0.1); }
        @media (max-width: 600px) { .qr-cta-buttons { flex-direction: column; } }
        .qr-cta-decor { position: absolute; bottom: -30px; right: 20px; z-index: 1; transform: rotate(-15deg); }
      `}</style>
    </>
  );
}
