import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- Electronics (Under ₹5000) ---
  {
    id: 'e1',
    name: 'BassPro X1 Wireless Earbuds',
    price: 1499,
    originalPrice: 3999,
    category: 'Electronics',
    description: 'Active Noise Cancellation, 40-hour playback, and IPX5 water resistance. The best budget audio experience.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    tags: ['audio', 'earbuds', 'wireless', 'tech'],
    rating: 4.5,
    reviews: 1205,
    badge: 'Best Seller'
  },
  {
    id: 'e2',
    name: 'Nova Smart Watch Series 5',
    price: 2499,
    originalPrice: 5999,
    category: 'Electronics',
    description: '1.8" HD Display, BT Calling, and comprehensive health monitoring. A premium look for a budget price.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    tags: ['watch', 'smartwatch', 'fitness', 'gadget'],
    rating: 4.3,
    reviews: 850,
    badge: 'Deal of Day'
  },
  {
    id: 'e3',
    name: 'Retro Portable Speaker',
    price: 1999,
    originalPrice: 3499,
    category: 'Electronics',
    description: 'Vintage wood finish design with powerful 10W sound output. Bluetooth 5.0 and Aux support.',
    image: 'https://images.unsplash.com/photo-1610438235354-a6ae5528385c?auto=format&fit=crop&q=80&w=800',
    tags: ['audio', 'speaker', 'vintage', 'music'],
    rating: 4.7,
    reviews: 320
  },
  {
    id: 'e4',
    name: 'ProGaming Mechanical Keyboard',
    price: 3499,
    originalPrice: 4999,
    category: 'Electronics',
    description: 'RGB Backlit mechanical keyboard with blue switches. Compact 60% layout for gamers.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    tags: ['gaming', 'keyboard', 'computer', 'tech'],
    rating: 4.6,
    reviews: 560
  },
  {
    id: 'e5',
    name: 'Studio Over-Ear Headphones',
    price: 2999,
    originalPrice: 4999,
    category: 'Electronics',
    description: 'Comfortable memory foam earcups with studio-quality sound. Wired and Wireless modes available.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    tags: ['audio', 'headphones', 'music', 'studio'],
    rating: 4.8,
    reviews: 420
  },
  {
    id: 'e6',
    name: 'RGB Gaming Mouse',
    price: 999,
    originalPrice: 1999,
    category: 'Electronics',
    description: 'High precision optical sensor with 6 programmable buttons and customizable RGB lighting.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800',
    tags: ['gaming', 'mouse', 'tech', 'computer'],
    rating: 4.4,
    reviews: 310
  },

  // --- Fashion (Under ₹5000) ---
  {
    id: 'f1',
    name: 'Floral Summer Maxi Dress',
    price: 1299,
    originalPrice: 2599,
    category: 'Fashion',
    description: 'Breathable rayon fabric with vibrant floral prints. Perfect for beach vacations and brunches.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
    tags: ['women', 'dress', 'summer', 'floral'],
    rating: 4.4,
    reviews: 410,
    badge: 'Trending'
  },
  {
    id: 'f2',
    name: 'Urban Streetwear Hoodie',
    price: 1899,
    originalPrice: 2999,
    category: 'Fashion',
    description: 'Oversized beige hoodie made from 100% premium cotton. Minimalist design for everyday wear.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    tags: ['men', 'hoodie', 'winter', 'casual'],
    rating: 4.8,
    reviews: 670
  },
  {
    id: 'f3',
    name: 'Classic Denim Jacket',
    price: 2199,
    originalPrice: 3999,
    category: 'Fashion',
    description: 'Vintage wash denim jacket with button closure. A timeless layer that fits every style.',
    image: 'https://images.unsplash.com/photo-1523205565295-f8e91625443b?auto=format&fit=crop&q=80&w=800',
    tags: ['jacket', 'denim', 'unisex', 'fashion'],
    rating: 4.5,
    reviews: 340
  },
  {
    id: 'f4',
    name: 'Ethnic Kurta Set',
    price: 1599,
    originalPrice: 2999,
    category: 'Fashion',
    description: 'Cotton blend kurta pajama set in navy blue. Ideal for festivals and traditional ceremonies.',
    image: 'https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=800',
    tags: ['ethnic', 'men', 'traditional', 'festive'],
    rating: 4.2,
    reviews: 190
  },
  {
    id: 'f5',
    name: 'Sporty Running Shoes',
    price: 2499,
    originalPrice: 4500,
    category: 'Fashion',
    description: 'Lightweight running shoes with breathable mesh and superior grip sole.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    tags: ['shoes', 'sports', 'running', 'men'],
    rating: 4.6,
    reviews: 890
  },

  // --- Accessories (Under ₹5000) ---
  {
    id: 'a1',
    name: 'Vintage Round Sunglasses',
    price: 699,
    originalPrice: 1499,
    category: 'Accessories',
    description: 'Gold-frame round sunglasses with UV protection. Adds a retro flair to your outfit.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    tags: ['sunglasses', 'eyewear', 'style', 'summer'],
    rating: 4.3,
    reviews: 220
  },
  {
    id: 'a3',
    name: 'Canvas Messenger Bag',
    price: 1299,
    originalPrice: 2499,
    category: 'Accessories',
    description: 'Durable canvas bag with laptop compartment. Stylish utility for students and professionals.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    tags: ['bag', 'travel', 'college', 'work'],
    rating: 4.4,
    reviews: 380,
    badge: 'Low Stock'
  },
  {
    id: 'a4',
    name: 'Elegant Gold Layered Necklace',
    price: 999,
    originalPrice: 2999,
    category: 'Accessories',
    description: 'Exquisite multi-layered gold necklace. Tarnish-free and perfect for evening wear.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    tags: ['jewelry', 'women', 'necklace', 'gift'],
    rating: 4.7,
    reviews: 150
  },
  {
    id: 'a5',
    name: 'Urban Baseball Cap',
    price: 499,
    originalPrice: 999,
    category: 'Accessories',
    description: 'Cotton baseball cap with adjustable strap. Perfect for sunny days and casual outfits.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
    tags: ['cap', 'hat', 'summer', 'casual'],
    rating: 4.2,
    reviews: 150
  }
];