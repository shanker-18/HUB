import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Plus, Check } from 'lucide-react';
import AuthModal from './AuthModal';
import { useCart } from '../contexts/CartContext';

export const categories = [
  {
    title: "Appalam / Papad Varieties",
    description: "Traditional papad varieties made with authentic recipes",
    gradient: "from-amber-600 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    items: [
      "Ulundu Appalam (Black Gram Papad)",
      "Arisi Appalam (Rice Papad)",
      "Kizhangu Appalam (Tapioca Papad)",
      "Payaru Appalam (Green Gram Papad)",
    ],
  },
  {
    title: "Vadam / Fryums Varieties",
    description: "Crispy traditional snacks and fryums",
    gradient: "from-blue-600 to-indigo-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-800",
    items: [
      "Thenkuzhal Vadam (Crispy Rice Flour Snack)",
      "Vella Vadam (Sweet Rice Snack)",
      "Omappodi Vadam (Rice Flour Snack with Ajwain)",
      "Murungai Vadam (Drumstick Leaves Snack)",
      "Sago Vadam (Javvarisi Vadam)",
      "Karuppu Milagu Vathal (Black Pepper Fryums)",
      "Manathakkali Vathal (Black Nightshade Fryums)",
      "Kothavarangai Vathal (Cluster Beans Fryums)",
      "Ma Vathal (Mango Fryums)",
    ],
  },
  {
    title: "Podi / Powder Varieties",
    description: "Aromatic powders for authentic flavors",
    gradient: "from-red-600 to-rose-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    items: [
      "Idli Milagai Podi (Chilli Powder for Idli)",
      "Instant Idli Milagai Podi (with Toor Dal)",
      "Manjal Podi (Turmeric Powder)",
      "Sambar Powder (Plain)",
      "Sambar Powder (With Toor Dal)",
      "Angaya Podi (Herbal Powder)",
      "Rasam Powder (Plain)",
      "Rasam Powder (With Toor Dal)",
      "Malli Podi (Coriander Seed Powder)",
      "Mint Powder",
      "Cumin Powder",
      "Pepper Powder",
    ],
  },
  {
    title: "Herbal & Health Powders",
    description: "Natural health powders for wellness",
    gradient: "from-emerald-600 to-green-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-800",
    items: [
      "Ellu Urundai Mix (Sesame Laddu Mix)",
      "Curry Leaves Powder",
      "Coriander Leaves Powder",
      "Tomato Thokku Powder",
      "Mango Thokku Powder",
      "Drumstick Leaves Powder",
      "Avaram Flower Powder",
      "Hibiscus Flower Powder",
      "Pirandai Powder (Cissus Quadrangularis Powder)",
    ],
  },
  {
    title: "Rice Mix Varieties",
    description: "Flavorful rice mix powders for quick meals",
    gradient: "from-purple-600 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-800",
    items: [
      "Lemon Rice Mix",
      "Tamarind Rice Mix",
      "Curry Leaves Rice Mix",
      "Mint Rice Mix",
      "Peanut Rice Mix",
      "Sesame Rice Mix",
      "Black Gram Rice Mix",
      "Horse Gram Rice Mix",
    ],
  },
  {
    title: "Oils & Ghee",
    description: "Pure cold-pressed oils and traditional ghee",
    gradient: "from-yellow-600 to-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    items: [
      "Cold Pressed Gingelly Oil (Chekku Nallenai)",
      "Cold Pressed Groundnut Oil (Chekku Kadalai Ennai)",
      "Cold Pressed Coconut Oil (Chekku Thengai Ennai)",
      "Traditional Ghee",
    ],
  },
];

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; category: string; price: number } | null>(null);
  const { addToCart, isInCart } = useCart();
  
  const toSlug = (input: string): string =>
    input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const category = categories.find((c) => toSlug(c.title) === (categoryName || '').toLowerCase());

  // Explicit image mapping for Powder category
  const powderImageMap: { pattern: RegExp; src: string }[] = [
    { pattern: /sambar/i, src: '/Items/Sambar%20powder.jpeg' },
    { pattern: /red\s*chilli|chilli/i, src: '/Items/Red%20chilli%20powder.jpeg' },
    { pattern: /rasam/i, src: '/Items/Rasam.jpeg' },
    { pattern: /turmeric|manjal/i, src: '/Items/Pure%20Turmeric%20powder.jpeg' },
    { pattern: /pulikuzhambu|puli\s*kuzhambu/i, src: '/Items/Pulikuzhambu%20powder.jpeg' },
    { pattern: /moringa|drumstick/i, src: '/Items/moringa%20leaf.jpeg' },
    { pattern: /kollu|horse\s*gram/i, src: '/Items/kollu%20sadha%20powder.jpeg' },
    { pattern: /garlic.*idli|poondu.*idli/i, src: '/Items/Garlic%20idlie.jpeg' },
    { pattern: /ellu.*idli/i, src: '/Items/Ellu%20idlie%20powder.jpeg' },
    { pattern: /curry\s*leaf|curry\s*leaves/i, src: '/Items/currly%20leaf.jpeg' },
    { pattern: /andra\s*spl|andhra/i, src: '/Items/Andra%20Spl.jpeg' },
  ];

  const getPowderImageForItem = (item: string): string | null => {
    const lower = item.toLowerCase();
    const found = powderImageMap.find((m) => m.pattern.test(lower));
    return found ? found.src : null;
  };

  const handleBuyNow = (productName: string) => {
    const defaultPrices: { [key: string]: number } = {
      'appalam': 150,
      'vadam': 120,
      'podi': 200,
      'herbal': 250,
      'rice': 180,
      'oils': 300
    };
    const price = defaultPrices[(categoryName || '').toLowerCase()] || 200;
    const product = { name: productName, category: category!.title, price };
    setSelectedProduct(product);
    localStorage.setItem('pendingProduct', JSON.stringify(product));
    setShowAuthModal(true);
  };

  const handleAddToCart = (productName: string) => {
    const defaultPrices: { [key: string]: number } = {
      'appalam': 150,
      'vadam': 120,
      'podi': 200,
      'herbal': 250,
      'rice': 180,
      'oils': 300
    };
    const price = defaultPrices[(categoryName || '').toLowerCase()] || 200;
    addToCart({ product_name: productName, category: category!.title, price, quantity: 1 });
  };

  const handleSignIn = () => { setShowAuthModal(false); navigate('/login'); };
  const handleGuest = () => {
    setShowAuthModal(false);
    if (selectedProduct) {
      navigate('/order-details', { state: { isAuthenticated: false, productName: selectedProduct.name, category: selectedProduct.category, price: selectedProduct.price } });
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been moved.</p>
          <Link to="/">
            <button className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-medium py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300">Return Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const isPowderCategory = /podi|powder/i.test(category.title);
  const gridClass = isPowderCategory ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 py-16 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-300/30 to-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-300/25 to-blue-300/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 text-sm">
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back to Categories</span>
          </Link>
        </div>
        
        <div className={`rounded-2xl overflow-hidden mb-10 bg-gradient-to-r ${category.gradient} p-10 relative shadow-xl`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/50 rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-sm">{category.title}</h1>
            <p className="text-white/95 text-lg max-w-3xl leading-relaxed">{category.description}</p>
          </div>
        </div>
        
        <div className={gridClass}>
          {category.items.map((item, index) => {
            const itemLower = item.toLowerCase();
            const fastMovingList = ['puliodharai mix','vathakkuzhambu mix','poondu pickle','pirandai pickle','jathikkai pickle','mudakkathan pickle','kara narthangai pickle','turmeric powder','sambar powder','rasam powder','ellu idli powder','poondu idli powder','andra spl paruppu powder','moringa leaf powder','curry leaves powder','red chilli powder','ulundhu appalam','rice appalam','kizhangu appalam'];
            const isFast = fastMovingList.some((x) => itemLower.includes(x));

            const imgSrc = isPowderCategory ? getPowderImageForItem(item) : null;

            return (
              <div key={index} className={`bg-white rounded-2xl shadow-md p-6 border ${category.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative`}>
                {isFast && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 shadow-sm">Fast Moving</span>
                  </div>
                )}

                {imgSrc ? (
                  <div className={`w-full h-44 md:h-52 bg-white border ${category.borderColor} rounded-lg mb-5 flex items-center justify-center overflow-hidden`}>
                    <img src={imgSrc} alt={item} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className={`w-full h-32 bg-gray-50 border border-dashed ${category.borderColor} rounded-lg mb-5 flex items-center justify-center`}>
                    <span className="text-gray-400 text-xs">Image not available</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className={`mt-1 w-2.5 h-2.5 ${category.textColor} rounded-full flex-shrink-0`}></div>
                  <div className="flex-1">
                    <span className={`${category.textColor} text-base md:text-lg font-semibold leading-snug block`}>{item}</span>
                    <div className={`${category.textColor} h-0.5 w-12 opacity-60 rounded`} style={{ backgroundColor: 'currentColor' }}></div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button onClick={() => handleBuyNow(item)} className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-medium py-2 px-4 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm group">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Buy Now</span>
                  </button>
                  <button onClick={() => handleAddToCart(item)} className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm group ${isInCart(item) ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600'}`}>
                    {isInCart(item) ? (<><Check className="h-4 w-4" /><span>Added to Cart</span></>) : (<><Plus className="h-4 w-4" /><span>Add to Cart</span></>)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSignIn={handleSignIn} onGuest={handleGuest} />
    </div>
  );
};

export default CategoryPage;
