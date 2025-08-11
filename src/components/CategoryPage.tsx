import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';

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

// Categories component has been moved to its own file: Categories.tsx

// Individual Category Page component
const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const toSlug = (input: string): string =>
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const category = categories.find((c) => toSlug(c.title) === (categoryName || '').toLowerCase());

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been moved.</p>
          <Link to="/">
            <button className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-medium py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 py-16 relative overflow-hidden">
      {/* soft background orbs */}
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
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/50 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-sm">
              {category.title}
            </h1>
            <p className="text-white/95 text-lg max-w-3xl leading-relaxed">{category.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.items.map((item, index) => {
            const fastMovingList = [
              'Puliodharai mix', 'vathakkuzhambu mix', 'poondu pickle', 'pirandai pickle', 'jathikkai pickle', 'mudakkathan pickle', 'kara narthangai pickle',
              'Turmeric powder', 'Sambar powder', 'Rasam powder', 'Ellu idli powder', 'Poondu idly powder', 'Andra spl paruppu powder',
              'Moringa leaf powder', 'Curry leaves powder', 'Red Chilli powder',
              'Ulundhu appalam', 'Rice appalam', 'Kizhangu appalam',
            ];
            const chefSpecialList = [
              'Puliodharai mix', 'Sambar powder', 'Ulundu Appalam', 'Traditional Ghee'
            ];
            const mostLovedList: string[] = [];
            const hotSellerList: string[] = [];

            const itemLower = item.toLowerCase();
            const isFast = fastMovingList.some((x) => itemLower.includes(x.toLowerCase()));
            const isChefSpecial = chefSpecialList.some((x) => itemLower.includes(x.toLowerCase()));
            const isMostLoved = mostLovedList.some((x) => itemLower.includes(x.toLowerCase()));
            const isHotSeller = hotSellerList.some((x) => itemLower.includes(x.toLowerCase())) || category.title.toLowerCase().includes('oils');

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-md p-6 border ${category.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative`}
              >
                {(isFast || isChefSpecial || isMostLoved || isHotSeller) && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[85%]">
                    {isFast && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 shadow-sm">
                        Fast Moving
                      </span>
                    )}
                    {isChefSpecial && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-[10px] font-semibold px-2 py-0.5 shadow-sm">
                        Chef Special
                      </span>
                    )}
                    {isMostLoved && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-500 text-white text-[10px] font-semibold px-2 py-0.5 shadow-sm">
                        Most Loved
                      </span>
                    )}
                    {isHotSeller && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 shadow-sm">
                        Hot Seller
                      </span>
                    )}
                  </div>
                )}

                {/* Image placeholder */}
                <div className={`w-full h-32 bg-gray-50 border border-dashed ${category.borderColor} rounded-lg mb-5 flex items-center justify-center`}>
                  <span className="text-gray-400 text-xs">Image placeholder</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`mt-1 w-2.5 h-2.5 ${category.textColor} rounded-full flex-shrink-0`}></div>
                  <div className="flex-1">
                    <span className={`${category.textColor} text-base md:text-lg font-semibold leading-snug block`}>
                      {item}
                    </span>
                    <div className={`${category.textColor} h-0.5 w-12 opacity-60 rounded`} style={{ backgroundColor: 'currentColor' }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
