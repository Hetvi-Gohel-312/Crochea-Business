// Crochea Shopping - E-commerce JavaScript Functionality

// Product Data
const products = [
  {
    id: 1,
    name: "Crochet Hair Bow - Green",
    category: "HairBows",
    price: 299,
    originalPrice: 399,
    image: "images/bow (2).jpeg",
    rating: 4.5,
    reviews: 22,
    description: "Fresh green crochet hair bow, handmade with soft yarn for everyday wear.",
    features: ["Handmade", "Soft yarn", "Lightweight", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 2,
    name: "Crochet Hair Bow - Peach",
    category: "HairBows",
    price: 299,
    originalPrice: 399,
    image: "images/bow (3).jpeg",
    rating: 4.6,
    reviews: 30,
    description: "Peach-colored crochet hair bow, ideal for elegant looks with a handmade touch.",
    features: ["Premium cotton yarn", "Durable clip", "Lightweight", "Easy to wear"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 3,
    name: "Crochet Hair Bow - Red",
    category: "HairBows",
    price: 130, // Updated price
    originalPrice: 399,
    image: "images/clips (8).jpeg",
    rating: 4.8,
    reviews: 50,
    description: "Bold red crochet hair bow to add a pop of color to your hairstyle.",
    features: ["Handcrafted design", "Bright color", "Soft yarn", "Secure hold"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 4,
    name: "Crochet Hair Bow - Blue",
    category: "HairBows",
    price: 130, // Updated price
    originalPrice: 399,
    image: "images/clips (9).jpeg",
    rating: 4.5,
    reviews: 28,
    description: "Cool blue crochet hair bow, a perfect handmade accessory for all ages.",
    features: ["Handmade", "Soft texture", "Strong clip", "Lightweight"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 5,
    name: "Crochet Hair Bow - White",
    category: "HairBows",
    price: 130, // Updated price
    originalPrice: 399,
    image: "images/clips (3).jpeg",
    rating: 4.7,
    reviews: 35,
    description: "Classic white crochet hair bow, perfect for weddings, casual, or festive wear.",
    features: ["Elegant style", "Handmade", "Soft yarn", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  // Dragon Bows - 2 colors
  {
    id: 6,
    name: "Dragon Crochet Bow - Red",
    category: "HairBows",
    price: 80, // Updated price
    originalPrice: 499,
    image: "images/clips (4).jpeg",
    rating: 4.7,
    reviews: 32,
    badge: "Trending",
    description: "Red dragon scale crochet bow with a bold and textured look. A handmade favorite for festive styles.",
    features: ["Dragon scale stitch", "Premium yarn", "Firm metal clip", "Handcrafted finish"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 7,
    name: "Dragon Crochet Bow - Yellow",
    category: "HairBows",
    price: 80, // Updated price
    originalPrice: 499,
    image: "images/clips (5).jpeg",
    rating: 4.6,
    reviews: 28,
    description: "Bright yellow dragon bow with a layered look, great for cheerful moods and summer wear.",
    features: ["Unique texture", "Soft cotton yarn", "Durable grip", "Handmade with care"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 8,
    name: "Dragon Crochet Bow - Blue",
    category: "HairBows",
    price: 80, // Updated price
    originalPrice: 499,
    image: "images/clips (6).jpeg",
    rating: 4.5,
    reviews: 25,
    description: "Blue dragon scale crochet bow, inspired by fantasy style with fine detailing and secure clip.",
    features: ["Layered scale design", "Soft yarn texture", "Strong metal clip", "Colorfast material"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 9,
    name: "Dragon Crochet Bow - Purple",
    category: "HairBows",
    price: 80, // Updated price
    originalPrice: 499,
    image: "images/clips (7).jpeg",
    rating: 4.6,
    reviews: 25,
    description: "Purple dragon scale crochet bow, adds whimsical charm to any hairstyle.",
    features: ["Handmade", "Soft cotton yarn", "Durable clip", "Fantasy-inspired design"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  // Crochet Roses - 2 colors
  {
    id: 10,
    name: "Crochet Rose - Pink",
    category: "CrochetRoses",
    price: 180, // Updated price
    originalPrice: 449,
    image: "images/chrunches (4).jpeg",
    rating: 4.7,
    reviews: 30,
    description: "Handcrafted pink crochet rose hair accessory, elegant and timeless.",
    features: ["Handmade crochet rose", "Soft cotton yarn", "Lightweight"],
    ingredients: "Cotton Yarn, Wire Stem"
  },
  {
    id: 11,
    name: "Crochet Rose - Red",
    category: "CrochetRoses",
    price: 180, // Updated price
    originalPrice: 449,
    image: "images/chrunches (2).jpeg",
    rating: 4.8,
    reviews: 28,
    description: "Rich red crochet rose hair clip, perfect for romantic styling.",
    features: ["Handmade", "Soft yarn", "Lightweight and durable"],
    ingredients: "Cotton Yarn, Wire Stem"
  },
  // Hair Clips (Flowers & Bows) - multiple colors
  {
    id: 12,
    name: "Crochet Flower Hair Clip - White",
    category: "HairClips",
    price: 80, // Updated price
    originalPrice: 399,
    image: "images/clips (1).jpeg",
    rating: 4.4,
    reviews: 22,
    description: "Delicate white crochet flower hair clip for a subtle yet stylish look.",
    features: ["Handmade crochet flower", "Secure metal clip", "Soft yarn"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  // Scrunchies - 2 colors
  {
    id: 13,
    name: "Crochet Scrunchie - White",
    category: "Scrunchies",
    price: 130, // Updated price
    originalPrice: 499,
    image: "images/schrunche white.jpg",
    rating: 4.6,
    reviews: 18,
    description: "Soft crochet scrunchie in white, gentle on hair and stylish.",
    features: ["Handmade crochet", "Stretchy elastic band", "Comfortable fit"],
    ingredients: "Cotton Yarn, Elastic Band"
  },
  {
    id: 14,
    name: "Crochet Scrunchie - Pink",
    category: "Scrunchies",
    price: 200, // Updated price
    originalPrice: 499,
    image: "images/schrunche pink.jpg",
    rating: 4.7,
    reviews: 15,
    description: "Pretty pink crochet scrunchie, perfect for everyday hair styling.",
    features: ["Handmade", "Elastic band", "Soft yarn"],
    ingredients: "Cotton Yarn, Elastic Band"
  }
];
