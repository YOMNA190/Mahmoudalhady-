import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, MapPin, Clock, Instagram, Facebook, 
  Gamepad2, Utensils, Coffee, Waves, PartyPopper,
  ShoppingCart, Plus, Minus, X, Send, Star,
  Menu, Sparkles, ArrowLeft
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
  const [, setActiveSection] = useState('home');
  const [menuCategory, setMenuCategory] = useState<'drinks' | 'food' | 'desserts'>('drinks');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, totalItems, totalPrice, isCartOpen, setIsCartOpen, addItem, removeItem, updateQuantity, clearCart } = useCart();

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';
    
    let message = 'يا فاميليا، عايز أطلب:\n';
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.nameAr}\n`;
    });
    message += `\nالإجمالي: ${totalPrice} جنيه`;
    return encodeURIComponent(message);
  };

  // Open WhatsApp
  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    if (message) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }
  };

  // Simple WhatsApp click
  const openWhatsAppSimple = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light overflow-x-hidden" dir="ltr">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
            <button 
              onClick={() => scrollToSection('home')}
              className="font-display font-black text-lg sm:text-xl text-gold tracking-tight"
            >
              FAMILIA
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-sm hover:text-gold transition-colors">Our Story</button>
              <button onClick={() => scrollToSection('services')} className="text-sm hover:text-gold transition-colors">Services</button>
              <button onClick={() => scrollToSection('menu')} className="text-sm hover:text-gold transition-colors">المنيو</button>
              <button onClick={() => scrollToSection('gallery')} className="text-sm hover:text-gold transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-gold transition-colors">تعالوا عندنا</button>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-dark text-xs font-bold rounded-full flex items-center justify-center animate-pop">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز طاولة')}
                className="hidden sm:block btn-primary text-sm py-2 px-5 md:px-6"
              >
                احجز دلوقتي
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 glass-card rounded-3xl p-4 animate-slide-up">
              <div className="flex flex-col gap-1">
                <button onClick={() => scrollToSection('about')} className="text-left py-3 px-3 rounded-xl hover:bg-white/5 hover:text-gold transition-colors flex items-center justify-between">Our Story <ArrowLeft className="w-4 h-4 opacity-40 rotate-180" /></button>
                <button onClick={() => scrollToSection('services')} className="text-left py-3 px-3 rounded-xl hover:bg-white/5 hover:text-gold transition-colors flex items-center justify-between">Services <ArrowLeft className="w-4 h-4 opacity-40 rotate-180" /></button>
                <button onClick={() => scrollToSection('menu')} className="text-left py-3 px-3 rounded-xl hover:bg-white/5 hover:text-gold transition-colors flex items-center justify-between" dir="rtl">المنيو <ArrowLeft className="w-4 h-4 opacity-40" /></button>
                <button onClick={() => scrollToSection('gallery')} className="text-left py-3 px-3 rounded-xl hover:bg-white/5 hover:text-gold transition-colors flex items-center justify-between">Gallery <ArrowLeft className="w-4 h-4 opacity-40 rotate-180" /></button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-3 px-3 rounded-xl hover:bg-white/5 hover:text-gold transition-colors flex items-center justify-between" dir="rtl">تعالوا عندنا <ArrowLeft className="w-4 h-4 opacity-40" /></button>
                <button 
                  onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز طاولة')}
                  className="mt-2 btn-primary text-sm py-3 text-center"
                  dir="rtl"
                >
                  احجز دلوقتي
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero_bg.jpg" 
            alt="فاميليا - الحمام والمسبح" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/55 to-dark" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-5 sm:px-6 pt-16 sm:pt-20 w-full">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-5 text-xs sm:text-sm animate-float">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-graytext">One place. Every mood. زيارة واحدة تكفي</span>
          </div>
          <h1 className="font-display font-black text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-gradient-gold mb-3 sm:mb-4 tracking-tight leading-none">
            FAMILIA
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-light/95 mb-2 font-display font-bold px-2">
            Pool. Food. Play. Repeat.
          </p>
          <p className="text-sm sm:text-lg text-graytext mb-8 sm:mb-10 max-w-2xl mx-auto px-4" dir="rtl">
            سباحة، أكل، ترفيه ومناسبات.. كل اللي العيلة محتاجاه، من غير ما تدوّر على حتة تانية
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 justify-center px-4">
            <button 
              onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز دلوقتي')}
              className="btn-primary text-base sm:text-lg w-full xs:w-auto"
              dir="rtl"
            >
              احجز دلوقتي
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="btn-secondary text-base sm:text-lg w-full xs:w-auto"
            >
              See the Menu
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-light/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 block">The Story</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-6 leading-tight">
                Where Family Moments <span className="text-gold">Come to Life</span>
              </h2>
              <p className="text-graytext text-base sm:text-lg leading-relaxed mb-5 sm:mb-6" dir="rtl">
                فاميليا مش مجرد مكان.. ده وجهة العيلة كلها. من المسبح الفخم وأكاديمية السباحة، 
                للكافيه والمطعم اللي هيرضي كل الأذواق، كل تفصيلة اتحسبت عشانك انت وعشان راحتك.
              </p>
              <p className="text-graytext text-base sm:text-lg leading-relaxed" dir="rtl">
                عايز يوم هادي جنب المسبح؟ ولا أكلة حلوة مع اللي بتحبهم؟ ولا مكان يليق 
                بمناسبتك الغالية؟ فاميليا بتقدملك تجربة مفيش زيها، تفرح بيها كل الأجيال سوا.
              </p>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="image-tile aspect-[3/4]">
                <img src="/hero_pool_left.jpg" alt="The Pool" className="w-full h-full object-cover" />
              </div>
              <div className="image-tile aspect-[3/4] mt-6 sm:mt-8">
                <img src="/cafe_left.jpg" alt="The Café" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-5 sm:px-6 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 block">What's Here</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Everything You Need <span className="text-gold">In One Place</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { 
                icon: Waves, 
                title: 'Swim Academy',
                tagAr: 'أكاديمية السباحة',
                desc: 'حصص سباحة احترافية لكل الأعمار، مع مدربين معتمدين وخبرة تحسها من أول يوم.',
                image: '/hero_pool_right.jpg'
              },
              { 
                icon: Coffee, 
                title: 'The Café',
                tagAr: 'الكافيه',
                desc: 'قهوة مختصة وعصائر طازة ومشروبات بتفتحلك نهارك.',
                image: '/cafe_right.jpg'
              },
              { 
                icon: Utensils, 
                title: 'The Restaurant',
                tagAr: 'المطعم',
                desc: 'أكل شرقي وغربي بإيد شيفات خبرة، بطعم يخليك ترجع تاني.',
                image: '/food_left.jpg'
              },
              { 
                icon: Gamepad2, 
                title: 'Kids Zone',
                tagAr: 'منطقة الأطفال',
                desc: 'ملعب آمن ومسلي، وإشراف كامل عشان تطمن على عيالك وانت مرتاح.',
                image: '/kids_left.jpg'
              },
              { 
                icon: PartyPopper, 
                title: 'Game Room',
                tagAr: 'الترفيه',
                desc: 'بينج بونج، بلياردو، وبلايستيشن.. متعة من غير حدود.',
                image: '/experience_right.jpg'
              },
              { 
                icon: Star, 
                title: 'Events & Weddings',
                tagAr: 'المناسبات والأفراح',
                desc: 'أحسن مكان لخطوبتك، فرحك، أو كتب كتابك.. بأسلوب مختلف.',
                image: '/events_left.jpg'
              },
            ].map((service, index) => (
              <div 
                key={index}
                className="group glass-card rounded-3xl sm:rounded-4xl overflow-hidden hover:border-gold/30 hover:-translate-y-1 transition-all duration-500 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-dark/70 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <service.icon className="w-5 h-5 text-gold" />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                    <h3 className="font-display font-bold text-lg sm:text-xl">{service.title}</h3>
                    <span className="text-gold text-sm" dir="rtl">{service.tagAr}</span>
                  </div>
                  <p className="text-graytext text-sm leading-relaxed" dir="rtl">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 block">Taste the Vibe</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 leading-tight">
              Our <span className="text-gold">Menu</span>
            </h2>
            
            {/* Category Tabs */}
            <div className="flex justify-center gap-2 flex-wrap px-2" dir="rtl">
              {(['drinks', 'food', 'desserts'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMenuCategory(cat)}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold transition-all ${
                    menuCategory === cat 
                      ? 'bg-gold text-dark shadow-lg shadow-gold/20' 
                      : 'bg-white/5 text-light hover:bg-white/10'
                  }`}
                >
                  {cat === 'drinks' ? 'المشروبات' : cat === 'food' ? 'الأكل' : 'الحلويات'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="glass-card rounded-3xl sm:rounded-4xl p-4 sm:p-6 md:p-8 animate-on-scroll" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-2 sm:gap-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto custom-scrollbar pl-1 sm:pl-4">
              {getItemsByCategory(menuCategory).map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-light group-hover:text-gold transition-colors truncate">
                      {item.nameAr}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="text-gold font-bold text-sm sm:text-base">{item.price} ج.م</span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold hover:text-dark active:scale-90 transition-all"
                      aria-label={`ضيف ${item.nameAr}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 px-5 sm:px-6 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 block">Moments</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Live the <span className="text-gold">FAMILIA</span> Feeling
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {[
              '/hero_pool_left.jpg', '/cafe_left.jpg', '/kids_left.jpg', '/food_left.jpg',
              '/events_left.jpg', '/allinone_left.jpg', '/experience_left.jpg', '/closing_left.jpg',
              '/hero_pool_right.jpg', '/cafe_right.jpg', '/kids_right.jpg', '/food_right.jpg',
            ].map((img, index) => (
              <div 
                key={index}
                className={`image-tile overflow-hidden group aspect-square ${
                  index === 0 || index === 5 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : ''
                }`}
              >
                <img 
                  src={img} 
                  alt={`FAMILIA moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 block">Real Talk</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
              What Our <span className="text-gold">Guests Say</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                name: 'أحمد محمد',
                text: 'أحسن وجهة عائلية بجد! المسبح رائع والأكل تحفة. عملنا عيد ميلاد بنتي هناك وكانت تجربة مثالية.',
                rating: 5
              },
              {
                name: 'سارة خليل',
                text: 'أكاديمية السباحة ممتازة جدًا. عيالي اتعلموا حاجات كتير في كام حصة بس. أنصح بيها بجد.',
                rating: 5
              },
              {
                name: 'عمر حسن',
                text: 'عملنا خطوبتنا في فاميليا وكانت سحر بجد. الفريق كله كان متعاون معانا لأبعد درجة.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="glass-card rounded-3xl sm:rounded-4xl p-6 sm:p-8 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
                dir="rtl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-light/90 mb-6 leading-relaxed text-sm sm:text-base">"{testimonial.text}"</p>
                <p className="text-gold font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-5 sm:px-6 bg-lightbg text-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="animate-on-scroll">
              <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 block">Let's Talk</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-6 leading-tight">
                Visit <span className="text-gold">FAMILIA</span> Today
              </h2>
              <p className="text-dark/70 text-base sm:text-lg mb-6 sm:mb-8" dir="rtl">
                جاهز تعيش أحسن تجربة عائلية؟ احجز زيارتك دلوقتي أو كلمنا لأي استفسار.
              </p>
              
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div dir="rtl">
                    <p className="font-semibold">العنوان</p>
                    <p className="text-dark/70 text-sm sm:text-base">الحي أبو كبير، طريق الفردية - ادخل من الفردية لحد ما توصل لباركينج السكاكرة</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div dir="rtl">
                    <p className="font-semibold">مواعيد الشغل</p>
                    <p className="text-dark/70 text-sm sm:text-base">من الأحد للخميس: 10 ص - 11 م | جمعة وسبت: 10 ص - 12 بالليل</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-dark/70 text-sm sm:text-base" dir="ltr">+20 101 075 7609</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-7 sm:mt-8">
                <button 
                  onClick={() => openWhatsAppSimple('مرحبا يا فاميليا، عايز أحجز طاولة')}
                  className="btn-primary flex items-center justify-center gap-2"
                  dir="rtl"
                >
                  <Send className="w-4 h-4" />
                  احجز عن طريق واتساب
                </button>
                <a 
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="animate-on-scroll">
              <div className="glass-card-light rounded-3xl sm:rounded-4xl overflow-hidden h-full min-h-[280px] sm:min-h-[400px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 px-5 sm:px-6 bg-dark border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-gold mb-2">FAMILIA</h3>
              <p className="text-graytext text-sm">One place. All ages. لا مقارنة.</p>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-7 sm:mt-8 pt-7 sm:pt-8 border-t border-white/5 text-center">
            <p className="text-graytext text-sm">
              © 2026 FAMILIA — All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
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
          <div className="relative w-full max-w-md sm:max-w-2xl bg-dark h-full shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10">
                <h2 className="font-display font-bold text-lg sm:text-xl">Your Order</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6" dir="rtl">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-graytext mx-auto mb-4" />
                    <p className="text-graytext">السلة لسه فاضية</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); scrollToSection('menu'); }}
                      className="mt-4 text-gold hover:underline"
                    >
                      شوف المنيو
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="glass-card rounded-2xl p-4">
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
                              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 active:scale-90 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 active:scale-90 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-gold font-bold">{item.price * item.quantity} ج.م</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-graytext">Total</span>
                    <span className="font-display font-bold text-gold text-2xl">{totalPrice} ج.م</span>
                  </div>
                  <button
                    onClick={openWhatsApp}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span dir="rtl">أكد الطلب عن طريق واتساب</span>
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-3 text-graytext hover:text-red-400 transition-colors text-sm"
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
