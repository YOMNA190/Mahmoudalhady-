import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, MapPin, Clock, Instagram, Facebook, 
  ShoppingCart, Plus, Minus, X, Send, Star,
  Menu, ArrowUpRight, ArrowLeft
} from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { getItemsByCategory } from './data/menu';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Contact Information
const WHATSAPP_NUMBER = '201010757609';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Htg6hPvF83fNFaFs8';
const FACEBOOK_URL = 'https://www.facebook.com/share/1T2UpMS8bP/';

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

function AppContent() {
  const [menuCategory, setMenuCategory] = useState<'drinks' | 'food' | 'desserts'>('drinks');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, totalItems, totalPrice, isCartOpen, setIsCartOpen, addItem, removeItem, updateQuantity, clearCart } = useCart();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';
    let message = 'يا فاميليا، عايز أطلب:\n';
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.nameAr}\n`;
    });
    message += `\nالإجمالي: ${totalPrice} جنيه`;
    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    if (message) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }
  };

  const openWhatsAppSimple = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // One orchestrated hero entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.hero-kicker', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.hero-word', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.2')
        .fromTo('.hero-line', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');
    });

    return () => ctx.revert();
  }, []);

  const services = [
    { num: '01', title: 'Swim Academy', tagAr: 'أكاديمية السباحة', desc: 'حصص سباحة احترافية لكل الأعمار مع مدربين معتمدين.', image: '/hero_pool_right.jpg' },
    { num: '02', title: 'The Café', tagAr: 'الكافيه', desc: 'قهوة مختصة وعصائر طازة تفتحلك نهارك.', image: '/cafe_right.jpg' },
    { num: '03', title: 'Restaurant', tagAr: 'المطعم', desc: 'أكل شرقي وغربي بإيد شيفات خبرة.', image: '/food_left.jpg' },
    { num: '04', title: 'Kids Zone', tagAr: 'منطقة الأطفال', desc: 'ملعب آمن ومسلي، وإشراف كامل طول الوقت.', image: '/kids_left.jpg' },
    { num: '05', title: 'Game Room', tagAr: 'الترفيه', desc: 'بينج بونج، بلياردو، وبلايستيشن.', image: '/experience_right.jpg' },
    { num: '06', title: 'Events & Weddings', tagAr: 'المناسبات والأفراح', desc: 'خطوبتك، فرحك، أو كتب كتابك.. بأسلوب مختلف.', image: '/events_left.jpg' },
  ];

  return (
    <div className="min-h-screen bg-deepteal text-light overflow-x-hidden" dir="ltr">
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="font-display text-xl sm:text-2xl tracking-tight text-light"
          >
            FAMILIA
          </button>
          
          <div className="hidden md:flex items-center gap-9">
            <button onClick={() => scrollToSection('about')} className="text-sm text-light/80 hover:text-ember transition-colors">Story</button>
            <button onClick={() => scrollToSection('services')} className="text-sm text-light/80 hover:text-ember transition-colors">Deck Plan</button>
            <button onClick={() => scrollToSection('menu')} className="text-sm text-light/80 hover:text-ember transition-colors">المنيو</button>
            <button onClick={() => scrollToSection('gallery')} className="text-sm text-light/80 hover:text-ember transition-colors">Gallery</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm text-light/80 hover:text-ember transition-colors">Visit</button>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-light/10 rounded-full transition-colors active:scale-90"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-ember text-light text-xs font-bold rounded-full flex items-center justify-center animate-pop">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز طاولة')}
              className="hidden sm:flex items-center gap-1.5 bg-ember text-light text-sm font-bold py-2.5 px-5 rounded-full hover:scale-105 transition-transform"
            >
              احجز دلوقتي
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-light/10 rounded-full transition-colors active:scale-90"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-7xl bg-midteal rounded-3xl p-4 animate-slide-up border border-light/10">
            <div className="flex flex-col gap-1">
              <button onClick={() => scrollToSection('about')} className="text-left py-3 px-3 rounded-xl hover:bg-light/5 hover:text-ember transition-colors flex items-center justify-between">Story <ArrowUpRight className="w-4 h-4 opacity-40" /></button>
              <button onClick={() => scrollToSection('services')} className="text-left py-3 px-3 rounded-xl hover:bg-light/5 hover:text-ember transition-colors flex items-center justify-between">Deck Plan <ArrowUpRight className="w-4 h-4 opacity-40" /></button>
              <button onClick={() => scrollToSection('menu')} className="text-left py-3 px-3 rounded-xl hover:bg-light/5 hover:text-ember transition-colors flex items-center justify-between" dir="rtl">المنيو <ArrowLeft className="w-4 h-4 opacity-40" /></button>
              <button onClick={() => scrollToSection('gallery')} className="text-left py-3 px-3 rounded-xl hover:bg-light/5 hover:text-ember transition-colors flex items-center justify-between">Gallery <ArrowUpRight className="w-4 h-4 opacity-40" /></button>
              <button onClick={() => scrollToSection('contact')} className="text-left py-3 px-3 rounded-xl hover:bg-light/5 hover:text-ember transition-colors flex items-center justify-between">Visit <ArrowUpRight className="w-4 h-4 opacity-40" /></button>
              <button 
                onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز طاولة')}
                className="mt-2 bg-ember text-light font-bold text-sm py-3 rounded-full text-center"
                dir="rtl"
              >
                احجز دلوقتي
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero — the actual dusk pool photo, wordmark sits low like reflected light */}
      <section id="home" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/hero_bg.jpg" 
            alt="فاميليا عند الغروب" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deepteal via-deepteal/50 to-deepteal/10" />
        </div>
        
        <div className="relative z-10 px-5 sm:px-8 pb-10 sm:pb-16 w-full max-w-7xl mx-auto">
          <p className="hero-kicker text-ember text-xs sm:text-sm font-bold tracking-[0.15em] uppercase mb-3">
            Abu Kabir · Open Daily
          </p>
          <h1 className="hero-word headline-display text-[3.2rem] xs:text-7xl sm:text-8xl md:text-[9rem] text-light mb-4">
            FAMILIA
          </h1>
          <div className="hero-line h-1 bg-ember w-24 sm:w-36 mb-6 origin-left" />
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <p className="hero-sub text-lg sm:text-2xl text-light/90 max-w-md leading-snug" dir="rtl">
              حمام سباحة، أكل، ولعب — كل حاجة العيلة محتاجاها في مكان واحد
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز دلوقتي')}
                className="hero-cta bg-ember text-light font-bold py-3.5 px-7 rounded-full hover:scale-105 transition-transform text-sm sm:text-base"
                dir="rtl"
              >
                احجز دلوقتي
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="hero-cta border-2 border-light/40 text-light font-bold py-3.5 px-7 rounded-full hover:bg-light/10 transition-colors text-sm sm:text-base"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lane rope divider */}
      <div className="px-5 sm:px-8 -mt-1 relative z-20">
        <div className="max-w-7xl mx-auto lane-rope-track">
          <div className="lane-rope" />
        </div>
      </div>

      {/* About — asymmetric, not a centered block */}
      <section id="about" className="py-16 sm:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
          <div className="md:col-span-5 animate-on-scroll">
            <span className="text-ember text-xs font-bold tracking-[0.15em] uppercase block mb-4">The Story</span>
            <h2 className="headline-display text-4xl sm:text-5xl md:text-6xl text-light leading-[0.95]">
              Not just<br/>a pool.
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-2 animate-on-scroll">
            <p className="text-light/85 text-base sm:text-xl leading-relaxed mb-5" dir="rtl">
              فاميليا وجهة العيلة كلها. من المسبح الفخم وأكاديمية السباحة، للكافيه والمطعم 
              اللي هيرضي كل الأذواق — كل تفصيلة اتحسبت عشانك وعشان راحتك.
            </p>
            <p className="text-graytext text-base sm:text-lg leading-relaxed" dir="rtl">
              يوم هادي جنب المسبح، أكلة حلوة مع اللي بتحبهم، أو مناسبة غالية عليك — 
              فاميليا بتقدملك تجربة تفرح بيها كل الأجيال سوا.
            </p>
          </div>
        </div>
      </section>

      {/* Services — Deck Plan: asymmetric numbered list, not equal cards */}
      <section id="services" className="py-16 sm:py-28 px-5 sm:px-8 bg-midteal/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 sm:mb-16 animate-on-scroll">
            <h2 className="headline-display text-4xl sm:text-6xl md:text-7xl text-light">
              Deck<br/>Plan
            </h2>
            <span className="text-graytext text-sm hidden sm:block mb-2">06 things worth your day</span>
          </div>
          
          <div className="divide-y divide-light/10 border-y border-light/10">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group animate-on-scroll grid grid-cols-[auto_1fr] sm:grid-cols-[100px_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-7 hover:bg-light/5 transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-2xl"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="headline-display text-3xl sm:text-4xl text-ember/70 group-hover:text-ember transition-colors">
                  {service.num}
                </span>
                
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <h3 className="font-display text-lg sm:text-2xl text-light font-black">{service.title}</h3>
                    <span className="text-sun text-sm sm:text-base" dir="rtl">{service.tagAr}</span>
                  </div>
                  <p className="text-graytext text-sm sm:text-base" dir="rtl">{service.desc}</p>
                </div>
                
                <div className="hidden sm:block w-20 h-20 rounded-2xl overflow-hidden shrink-0 image-tile">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu — poolside chalkboard concept */}
      <section id="menu" className="py-16 sm:py-28 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 sm:mb-12 animate-on-scroll">
            <span className="text-ember text-xs font-bold tracking-[0.15em] uppercase block mb-4">Poolside Menu</span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="headline-display text-4xl sm:text-6xl text-light">
                What's<br className="sm:hidden"/> Cooking
              </h2>
              <div className="flex gap-2 flex-wrap" dir="rtl">
                {(['drinks', 'food', 'desserts'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMenuCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                      menuCategory === cat 
                        ? 'bg-ember border-ember text-light' 
                        : 'border-light/20 text-light/70 hover:border-light/40'
                    }`}
                  >
                    {cat === 'drinks' ? 'المشروبات' : cat === 'food' ? 'الأكل' : 'الحلويات'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Chalkboard */}
          <div className="bg-ink rounded-[28px] sm:rounded-[36px] p-5 sm:p-10 animate-on-scroll relative overflow-hidden border-4 border-midteal">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
            }} />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1 max-h-[480px] sm:max-h-[560px] overflow-y-auto custom-scrollbar pr-1 sm:pr-3" dir="rtl">
              {getItemsByCategory(menuCategory).map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-dashed border-light/15 group"
                >
                  <span className="text-light/90 group-hover:text-sun transition-colors truncate pr-3">
                    {item.nameAr}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sun font-bold text-sm">{item.price} ج.م</span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-7 h-7 rounded-full border border-ember/60 text-ember flex items-center justify-center hover:bg-ember hover:text-light active:scale-90 transition-all"
                      aria-label={`Add ${item.nameAr}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — pinned photo strip, not a grid */}
      <section id="gallery" className="py-16 sm:py-28 px-5 sm:px-8 bg-midteal/40 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16 animate-on-scroll">
            <span className="text-ember text-xs font-bold tracking-[0.15em] uppercase block mb-4">On the Board</span>
            <h2 className="headline-display text-4xl sm:text-6xl text-light">
              Pinned This Week
            </h2>
          </div>
          
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0">
            {[
              { img: '/hero_pool_left.jpg', rot: '-2deg' },
              { img: '/kids_right.jpg', rot: '1.5deg' },
              { img: '/food_right.jpg', rot: '-1deg' },
              { img: '/events_right.jpg', rot: '2deg' },
              { img: '/cafe_left.jpg', rot: '-1.5deg' },
              { img: '/experience_left.jpg', rot: '1deg' },
              { img: '/closing_left.jpg', rot: '-2deg' },
            ].map((item, index) => (
              <div 
                key={index}
                className="shrink-0 w-[220px] sm:w-[280px] aspect-[4/5] image-tile rounded-2xl snap-center bg-light p-2 pb-8"
                style={{ transform: `rotate(${item.rot})` }}
              >
                <img 
                  src={item.img} 
                  alt={`FAMILIA moment ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-ember text-xs font-bold tracking-[0.15em] uppercase block mb-4 animate-on-scroll">Real Talk</span>
          <h2 className="headline-display text-4xl sm:text-6xl text-light mb-10 sm:mb-16 animate-on-scroll">
            Guests Say
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { name: 'أحمد محمد', text: 'أحسن وجهة عائلية بجد! المسبح رائع والأكل تحفة. عملنا عيد ميلاد بنتي هناك وكانت تجربة مثالية.' },
              { name: 'سارة خليل', text: 'أكاديمية السباحة ممتازة جدًا. عيالي اتعلموا حاجات كتير في كام حصة بس.' },
              { name: 'عمر حسن', text: 'عملنا خطوبتنا في فاميليا وكانت سحر بجد. الفريق كله كان متعاون معانا.' }
            ].map((t, index) => (
              <div 
                key={index}
                className="animate-on-scroll border-t-2 border-ember pt-5"
                style={{ animationDelay: `${index * 80}ms` }}
                dir="rtl"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sun text-sun" />
                  ))}
                </div>
                <p className="text-light/85 mb-4 leading-relaxed text-base">{t.text}</p>
                <p className="text-graytext text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-28 px-5 sm:px-8 bg-sand text-ink">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-5 animate-on-scroll">
            <span className="text-ember text-xs font-bold tracking-[0.15em] uppercase block mb-4">Visit</span>
            <h2 className="headline-display text-4xl sm:text-6xl text-ink mb-6 leading-[0.95]">
              Come say hi
            </h2>
            <p className="text-ink/70 text-base sm:text-lg mb-8" dir="rtl">
              جاهز تعيش أحسن تجربة عائلية؟ احجز زيارتك دلوقتي أو كلمنا لأي استفسار.
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <button 
                onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز طاولة')}
                className="bg-ember text-light font-bold py-3.5 px-7 rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
                dir="rtl"
              >
                <Send className="w-4 h-4" />
                احجز على واتساب
              </button>
              <a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 text-ink font-bold py-3.5 px-7 rounded-full hover:bg-ink/5 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Directions
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7 animate-on-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="border-t-2 border-ember pt-4" dir="rtl">
                <MapPin className="w-5 h-5 text-ember mb-2" />
                <p className="font-bold mb-1">العنوان</p>
                <p className="text-ink/70 text-sm">الحي أبو كبير، طريق الفردية - ادخل من الفردية لحد باركينج السكاكرة</p>
              </div>
              <div className="border-t-2 border-ember pt-4" dir="rtl">
                <Clock className="w-5 h-5 text-ember mb-2" />
                <p className="font-bold mb-1">مواعيد الشغل</p>
                <p className="text-ink/70 text-sm">الأحد-الخميس: 10ص - 11م<br/>جمعة وسبت: 10ص - 12م</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden h-[240px] sm:h-[280px] relative border border-ink/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 px-5 sm:px-8 bg-ink border-t border-light/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl text-light mb-1">FAMILIA</h3>
            <p className="text-graytext text-sm">Abu Kabir · Open daily</p>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full border border-light/15 flex items-center justify-center hover:border-ember hover:text-ember transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-light/15 flex items-center justify-center hover:border-ember hover:text-ember transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-light/15 flex items-center justify-center hover:border-ember hover:text-ember transition-all">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-light/10 text-center">
          <p className="text-graytext text-sm">© 2026 FAMILIA — All rights reserved</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform animate-pulse-glow"
        style={{ width: '3.25rem', height: '3.25rem', backgroundColor: '#22c55e' }}
      >
        <Phone className="w-6 h-6 text-white" />
      </a>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md sm:max-w-2xl bg-deepteal h-full shadow-2xl animate-slide-in-right border-l border-light/10">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-light/10">
                <h2 className="font-display text-lg sm:text-xl">Your Order</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-light/10 rounded-full transition-colors active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 sm:p-6" dir="rtl">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-graytext mx-auto mb-4" />
                    <p className="text-graytext">السلة لسه فاضية</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); scrollToSection('menu'); }}
                      className="mt-4 text-ember hover:underline"
                    >
                      شوف المنيو
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="bg-midteal/50 border border-light/10 rounded-2xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold">{item.nameAr}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-light/10 flex items-center justify-center hover:bg-ember/30 active:scale-90 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-light/10 flex items-center justify-center hover:bg-ember/30 active:scale-90 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-sun font-bold">{item.price * item.quantity} ج.م</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-light/10 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-graytext">Total</span>
                    <span className="headline-display text-sun text-2xl">{totalPrice} ج.م</span>
                  </div>
                  <button
                    onClick={openWhatsApp}
                    className="w-full bg-ember text-light font-bold py-3.5 rounded-full hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span dir="rtl">أكد الطلب على واتساب</span>
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-graytext hover:text-red-400 transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
