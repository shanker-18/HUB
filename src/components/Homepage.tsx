import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Menu,
  X,
  ShoppingCart,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Leaf,
  Award,
  Users,
  ChevronLeft,
  Package,
  Sparkles,
  Crown,
  Gift,
  Zap,
  Coffee
} from 'lucide-react';

// Custom CSS for enhanced styling
const customStyles = `
  .corporate-blue {
    color: #1e40af;
  }
  .corporate-blue-bg {
    background-color: #1e40af;
  }
  .corporate-blue-border {
    border-color: #1e40af;
  }
  .corporate-blue-gradient {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  }
  .fast-moving-label {
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
  }
  .special-dish-label {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 4px rgba(30, 64, 175, 0.3);
  }
  .enhanced-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
  .enhanced-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #1e40af;
  }
  .product-image-container {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
  }
  .product-image {
    transition: transform 0.3s ease;
  }
  .product-image-container:hover .product-image {
    transform: scale(1.05);
  }
  .label-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
  }
  .enhanced-header {
    background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(220, 38, 38, 0.1);
  }
  .enhanced-button {
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
    box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
    transition: all 0.3s ease;
  }
  .enhanced-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(220, 38, 38, 0.4);
  }
  .enhanced-section {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  }
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Homepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: 'Traditional Mango Pickle',
      price: '₹299',
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
      label: 'Fast Moving'
    },
    {
      id: 2,
      name: 'Aromatic Garam Masala',
      price: '₹199',
      image: 'https://images.pexels.com/photos/4198793/pexels-photo-4198793.jpeg?auto=compress&cs=tinysrgb&w=500',
      label: 'Fast Moving'
    },
    {
      id: 3,
      name: 'Pure Chekku Oil',
      price: '₹599',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500',
      label: 'Special Dish'
    },
    {
      id: 4,
      name: 'Homemade Ghee',
      price: '₹449',
      image: 'https://images.pexels.com/photos/8751142/pexels-photo-8751142.jpeg?auto=compress&cs=tinysrgb&w=500',
      label: 'Fast Moving'
    },
    {
      id: 5,
      name: 'Premium Coffee Powder',
      price: '₹399',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=500',
      label: 'Special Dish'
    }
  ];

  const categories = [
    {
      title: 'Sweets & Snacks',
      description: 'Traditional delicacies made with authentic recipes',
      icon: Gift,
      gradient: 'from-yellow-400 to-orange-500',
      items: [
        'Boondi Appalam', 'Arisi Appalam', 'Milagu Appalam', 'Pappad Appalam', 
        'Seeni Appalam', 'Thenkuzhal Vadam', 'Vadai Vadam', 'Sago Vadam',
        'Omappodi Vadam', 'Rice Flour Murukku', 'Besan Flour Murukku',
        'Pottu Minappappu Murukku', 'Pottu Minappappu Vathal', 'Vathal with Red Chillies',
        'Vathal without Chillies', 'Maavathal', 'Vadam with Salt', 'Fried Appalam',
        'Thin Boondi', 'Small Boondi'
      ],
      image: 'https://images.pexels.com/photos/4110003/pexels-photo-4110003.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Spice Powders & Cooking Essentials',
      description: 'Aromatic powders for authentic flavors',
      icon: Sparkles,
      gradient: 'from-red-400 to-pink-500',
      items: [
        'Munthiri Podi', 'Sambar Podi', 'Angaya Podi', 'Rasam Podi',
        'Dried Coriander Powder', 'Chilli Powder', 'Pepper Powder',
        'Jeera Powder', 'Turmeric Powder'
      ],
      image: 'https://images.pexels.com/photos/4198793/pexels-photo-4198793.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Pickles & Preserves',
      description: 'Tangy homemade pickles bursting with traditional flavors',
      icon: Crown,
      gradient: 'from-green-400 to-blue-500',
      items: [
        'Elumichai Oorugai', 'Uppili Kothamalli Oorugai', 'Kara Narthangai Oorugai',
        'Boondi Oorugai', 'Mango Pickle', 'Mango Thokku', 'Vadu Mangai',
        'Inji Oorugai', 'Lemon Oorugai', 'Pudina Oorugai', 'Thakkali Oorugai',
        'Mango Avakkai', 'Garlic Pickle', 'Fresh Boondi Pickle', 'Boondi with Curd'
      ],
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Premium Coffee Powder',
      description: 'Freshly ground coffee powder for authentic taste',
      icon: Coffee,
      gradient: 'from-amber-400 to-brown-500',
      items: [
        'Filter Coffee Powder', 'Traditional Coffee Blend', 'Premium Arabica Coffee',
        'South Indian Coffee Mix', 'Organic Coffee Powder', 'Spiced Coffee Blend',
        'Cardamom Coffee Powder', 'Ginger Coffee Mix', 'Masala Coffee Powder'
      ],
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'The authentic taste reminds me of my grandmother\'s cooking. Pure quality!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      text: 'Best pickles I\'ve ever tasted. The spice powders are incredibly fresh.',
      rating: 5
    },
    {
      name: 'Meera Patel',
      text: 'Traditional flavors with modern packaging. Excellent quality products.',
      rating: 5
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Header */}
      <header className="fixed top-0 w-full enhanced-header shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Shree Raga SWAAD GHAR Logo" 
                  className="h-16 w-16 object-contain drop-shadow-lg"
                  onError={(e) => {
                    // Fallback to icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden relative bg-white p-2 rounded-full shadow-lg">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold corporate-blue">Shree Raaga</span>
                <div className="text-sm font-semibold text-red-600 -mt-1 tracking-wide">SWAAD GHAR</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Categories', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300 font-semibold"
                >
                  {item}
                </a>
              ))}
              <button className="flex items-center space-x-1 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </button>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-2">
              {['Home', 'Categories', 'About', 'Contact'].map((item) => (
                                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-300 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
              ))}
              <button className="w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url(/b86eea1b-b30b-4dae-bcf5-f0ab33bb633b.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative text-center px-4 max-w-4xl mx-auto z-10"
        >
          {/* Centered Logo Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <img 
              src="/logo.png" 
              alt="Shree Raga SWAAD GHAR Logo" 
              className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-2xl"
              onError={(e) => {
                // Fallback to icon if logo fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden h-20 w-20 md:h-24 md:w-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center drop-shadow-2xl">
              <Leaf className="h-10 w-10 md:h-12 md:w-12 text-green-300" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-amber-900"
          >
            Welcome to <br />
            <span className="corporate-blue">Shree Raaga SWAAD GHAR</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto corporate-blue"
          >
            At Shree Raaga Swaad Ghar, we bring the timeless taste of tradition to your table. From tangy homemade pickles and aromatic podis to fresh ready-mix powders, pure chekku oils, rich ghee, handcrafted masala's, and premium coffee powder— every product is made with purity, care, and love.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#categories" className="inline-block">
              <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Products
              </button>
            </a>
            <a href="#about" className="inline-block">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                Our Story
              </button>
            </a>
          </motion.div>
        </motion.div>

      </section>



      {/* Premium Brand Values Section */}
      <section className="py-16 enhanced-section relative overflow-hidden">
        <div className="watermark-logo">SWAAD</div>
        <div className="pattern-dots absolute inset-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold corporate-blue mb-4">
              Why Choose Shree Raaga SWAAD GHAR?
            </h2>
            <p className="text-red-600 max-w-2xl mx-auto font-medium">
              Experience the perfect blend of tradition and quality in every product
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Crown,
                title: "Premium Quality",
                description: "Handpicked ingredients with no artificial additives",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: Leaf,
                title: "100% Natural",
                description: "Pure, organic, and traditionally prepared",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: Award,
                title: "Heritage Recipes",
                description: "Time-tested recipes passed down generations",
                color: "from-amber-400 to-yellow-500"
              },
              {
                icon: Heart,
                title: "Made with Love",
                description: "Every product crafted with care and passion",
                color: "from-red-400 to-pink-500"
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform duration-300 shimmer`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold corporate-blue mb-2">{value.title}</h3>
                  <p className="text-sm text-red-600 leading-relaxed font-medium">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" ref={categoriesRef} className="py-20 bg-gradient-to-b from-amber-50 to-green-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold corporate-blue mb-4">
              Our Categories
            </h2>
            <p className="text-lg text-red-600 max-w-2xl mx-auto font-medium">
              Discover our carefully curated collection of authentic Indian flavors
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate={categoriesInView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white border border-gray-100 hover:border-red-400"
                >
                  {/* Header with Gradient Background */}
                  <div className={`relative h-40 bg-gradient-to-br ${category.gradient} p-4 flex flex-col justify-between`}>
                    {/* Decorative Pattern */}
                                          <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 w-12 h-12 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border border-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/50 rounded-full"></div>
                      </div>
                    
                    {/* Icon and Title */}
                    <div className="relative z-10">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <Crown className="h-4 w-4 text-yellow-300" />
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{category.title}</h3>
                    </div>
                    
                    {/* Badge */}
                    <div className="relative z-10 self-start">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                        {category.items.length} Products
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    <p className="text-red-600 leading-relaxed font-medium">{category.description}</p>
                    
                    {/* Product Preview */}
                    <div className="space-y-2">
                      <h4 className="font-semibold corporate-blue text-xs uppercase tracking-wide">Featured Items:</h4>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {category.items.slice(0, 6).map((item, itemIndex) => {
                          const isFastMoving = ['Boondi Appalam', 'Sambar Podi', 'Mango Pickle', 'Coffee Powder'].includes(item);
                          const isSpecialDish = ['Pure Chekku Oil', 'Homemade Ghee', 'Premium Coffee Powder'].includes(item);
                                                      return (
                              <div key={itemIndex} className="flex items-center justify-between p-1 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200">
                                <div className="flex items-center space-x-1 flex-1">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-700 truncate text-xs font-medium">{item}</span>
                                </div>
                                {isFastMoving && (
                                  <span className="fast-moving-label text-xs ml-1 flex-shrink-0">Fast</span>
                                )}
                                {isSpecialDish && (
                                  <span className="special-dish-label text-xs ml-1 flex-shrink-0">Special</span>
                                )}
                              </div>
                            );
                        })}
                      </div>
                      {category.items.length > 6 && (
                        <p className="text-xs text-red-600 font-medium">+{category.items.length - 6} more</p>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <div className="pt-2">
                      <button className={`w-full bg-gradient-to-r ${category.gradient} hover:shadow-lg text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group text-sm`}>
                        <Package className="h-3 w-3" />
                        <span>Explore</span>
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* Brand Story Section */}
      <section id="about" ref={storyRef} className="py-20 bg-gradient-to-r from-amber-50 via-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-green-100 rounded-2xl shadow-lg flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Shree Raga SWAAD GHAR Logo"
                  className="h-48 w-48 object-contain drop-shadow-xl"
                  onError={(e) => {
                    // Fallback to icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden h-48 w-48 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center drop-shadow-xl">
                  <Leaf className="h-24 w-24 text-green-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold corporate-blue">
                Our Heritage Story
              </h2>
              <p className="text-lg text-red-600 leading-relaxed font-medium">
                Prepared the age-old way with handpicked ingredients and no artificial additives, our foods carry the true flavor of our heritage, straight from our kitchen to yours.
              </p>
              <p className="text-lg text-red-600 leading-relaxed font-medium">
                Every product at Shree Raaga Swaad Ghar tells a story of tradition, passed down through generations of culinary expertise and refined with modern care.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                  <p className="font-semibold corporate-blue">Premium Quality</p>
                </div>
                <div className="text-center">
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold corporate-blue">Natural Ingredients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 corporate-blue-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium">
              Ready to experience authentic flavors? Contact us today!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-red-300" />
                    <span className="text-white text-lg font-medium">+91 12345 67890</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-red-300" />
                    <span className="text-white text-lg font-medium">info@shreeragaswaadghar.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-red-300" />
                    <span className="text-white text-lg font-medium">Traditional Kitchen, India</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-red-400"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-red-400"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-red-400 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                              <div className="flex items-center space-x-2 mb-6">
                  <Coffee className="h-8 w-8 text-red-400" />
                  <span className="text-xl font-bold">Shree Raaga SWAAD GHAR</span>
                </div>
              <p className="text-gray-300 leading-relaxed font-medium">
                Bringing timeless taste of tradition to your table with authentic Indian flavors made with love and care.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Categories', 'About Us', 'Contact', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-red-400" />
                  <span className="text-gray-300">+91 12345 67890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-red-400" />
                  <span className="text-gray-300">info@shreeragaswaadghar.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-400" />
                  <span className="text-gray-300">Traditional Kitchen, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-400">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-300" />
                <Instagram className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-300" />
                <Twitter className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-300" />
              </div>

            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 Shree Raaga SWAAD GHAR. All rights reserved. Made with ❤️ for traditional flavors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;