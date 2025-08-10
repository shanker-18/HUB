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
  Gift
} from 'lucide-react';

const Homepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: 'Traditional Mango Pickle',
      price: '₹299',
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 2,
      name: 'Aromatic Garam Masala',
      price: '₹199',
      image: 'https://images.pexels.com/photos/4198793/pexels-photo-4198793.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 3,
      name: 'Pure Chekku Oil',
      price: '₹599',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 4,
      name: 'Homemade Ghee',
      price: '₹449',
      image: 'https://images.pexels.com/photos/8751142/pexels-photo-8751142.jpeg?auto=compress&cs=tinysrgb&w=500'
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
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
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
                <span className="text-2xl font-bold text-amber-800">Shree Raga</span>
                <div className="text-sm font-semibold text-green-600 -mt-1 tracking-wide">SWAAD GHAR</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Categories', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg transition-all duration-300 font-semibold"
                >
                  {item}
                </a>
              ))}
              <button className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300">
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
                  className="block py-3 px-4 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-all duration-300 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="w-full flex items-center justify-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-full">
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
            <span className="text-yellow-600">Shree Raga SWAAD GHAR</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto text-amber-800"
          >
            At Shree Raaga Swaad Ghar, we bring the timeless taste of tradition to your table. From tangy homemade pickles and aromatic podis to fresh ready-mix powders, pure chekku oils, rich ghee, and handcrafted masala's— every product is made with purity, care, and love.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#categories" className="inline-block">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Products
              </button>
            </a>
            <a href="#about" className="inline-block">
              <button className="border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                Our Story
              </button>
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* Premium Brand Values Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="watermark-logo">SWAAD</div>
        <div className="pattern-dots absolute inset-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Why Choose Shree Raga SWAAD GHAR?
            </h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
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
                  <h3 className="text-lg font-bold text-amber-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-amber-600 leading-relaxed">{value.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              Our Categories
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Discover our carefully curated collection of authentic Indian flavors
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate={categoriesInView ? "animate" : "initial"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 bg-white border-2 border-transparent hover:border-yellow-400"
                >
                  {/* Header with Gradient Background */}
                  <div className={`relative h-48 bg-gradient-to-br ${category.gradient} p-6 flex flex-col justify-between`}>
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/50 rounded-full"></div>
                    </div>
                    
                    {/* Icon and Title */}
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <Crown className="h-5 w-5 text-yellow-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{category.title}</h3>
                    </div>
                    
                    {/* Badge */}
                    <div className="relative z-10 self-start">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                        {category.items.length} Products
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <p className="text-amber-700 leading-relaxed">{category.description}</p>
                    
                    {/* Product Preview */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-800 text-sm uppercase tracking-wide">Featured Items:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {category.items.slice(0, 6).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2 p-2 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-amber-700 truncate font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                      {category.items.length > 6 && (
                        <p className="text-xs text-amber-600 font-medium">+{category.items.length - 6} more items</p>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <div className="pt-4">
                      <button className={`w-full bg-gradient-to-r ${category.gradient} hover:shadow-lg text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group`}>
                        <Package className="h-4 w-4" />
                        <span>Explore Collection</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800">
                Our Heritage Story
              </h2>
              <p className="text-lg text-amber-700 leading-relaxed">
                Prepared the age-old way with handpicked ingredients and no artificial additives, our foods carry the true flavor of our heritage, straight from our kitchen to yours.
              </p>
              <p className="text-lg text-amber-700 leading-relaxed">
                Every product at Shree Raaga Swaad Ghar tells a story of tradition, passed down through generations of culinary expertise and refined with modern care.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                  <p className="font-semibold text-amber-800">Premium Quality</p>
                </div>
                <div className="text-center">
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-amber-800">Natural Ingredients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-green-600 via-amber-600 to-green-600">
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
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
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
                    <Phone className="h-6 w-6 text-yellow-300" />
                    <span className="text-white text-lg">+91 12345 67890</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-yellow-300" />
                    <span className="text-white text-lg">info@shreeragaswaadghar.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-yellow-300" />
                    <span className="text-white text-lg">Traditional Kitchen, India</span>
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
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-amber-900 font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
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
      <footer className="bg-gradient-to-r from-amber-900 via-green-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="h-8 w-8 text-yellow-400" />
                <span className="text-xl font-bold">Shree Raga SWAAD GHAR</span>
              </div>
              <p className="text-amber-200 leading-relaxed">
                Bringing timeless taste of tradition to your table with authentic Indian flavors made with love and care.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Categories', 'About Us', 'Contact', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-amber-200 hover:text-yellow-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <span className="text-amber-200">+91 12345 67890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  <span className="text-amber-200">info@shreeragaswaadghar.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span className="text-amber-200">Traditional Kitchen, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-amber-200 hover:text-yellow-400 cursor-pointer transition-colors duration-300" />
                <Instagram className="h-6 w-6 text-amber-200 hover:text-yellow-400 cursor-pointer transition-colors duration-300" />
                <Twitter className="h-6 w-6 text-amber-200 hover:text-yellow-400 cursor-pointer transition-colors duration-300" />
              </div>
              <div className="mt-6">
                <p className="text-sm text-amber-200 mb-2">Subscribe to our newsletter</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-amber-300 rounded-l-lg text-white placeholder-amber-300 focus:outline-none focus:border-yellow-400"
                  />
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 px-4 py-2 rounded-r-lg font-semibold transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-700 mt-12 pt-8 text-center">
            <p className="text-amber-300">
              © 2025 Shree Raga SWAAD GHAR. All rights reserved. Made with ❤️ for traditional flavors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;