// Crochea Shopping - E-commerce JavaScript Functionality

// Product Data
const products = [
  {
    id: 1,
    name: "Crochet Hair Bow - Peach",
    category: "HairBows",
    price: 130,
    originalPrice: 130,
    image: "images/smallbows (5).jpeg", // Update with the correct image path
    rating: 4.5,
    reviews: 22,
    description: "Charming peach crochet hair bow, handmade with soft yarn for everyday wear.",
    features: ["Handmade", "Soft yarn", "Lightweight", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 2,
    name: "Crochet Hair Bow - Olive",
    category: "HairBows",
    price: 130,
    originalPrice: 130,
    image: "images/smallbows (2).jpeg", // Update with the correct image path
    rating: 4.6,
    reviews: 30,
    description: "Elegant olive crochet hair bow, perfect for adding a touch of style.",
    features: ["Premium cotton yarn", "Durable clip", "Lightweight", "Easy to wear"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 3,
    name: "Crochet Hair Bow - Blue",
    category: "HairBows",
    price: 130,
    originalPrice: 130,
    image: "images/smallbows (6).jpeg", // Update with the correct image path
    rating: 4.8,
    reviews: 50,
    description: "Cool blue crochet hair bow, a perfect handmade accessory for all ages.",
    features: ["Handcrafted design", "Bright color", "Soft yarn", "Secure hold"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 4,
    name: "Crochet Hair Bow - White",
    category: "HairBows",
    price: 130,
    originalPrice: 130,
    image: "images/clips (3).jpeg", // Update with the correct image path
    rating: 4.5,
    reviews: 28,
    description: "Classic white crochet hair bow, perfect for weddings, casual, or festive wear.",
    features: ["Elegant style", "Handmade", "Soft yarn", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 5,
    name: "Crochet Hair Bow - Red",
    category: "HairBows",
    price: 130,
    originalPrice: 130,
    image: "images/smallbows (4).jpeg", // Update with the correct image path
    rating: 4.7,
    reviews: 35,
    description: "Bold red crochet hair bow to add a pop of color to your hairstyle.",
    features: ["Handcrafted design", "Bright color", "Soft yarn", "Secure hold"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 6,
    name: "Crochet Hair Bow - Yellow",
    category: "HairBows",
    price: 130,
    originalPrice: 130,
    image: "images/smallbows (1).jpeg", // Update with the correct image path
    rating: 4.6,
    reviews: 30,
    description: "Bright yellow crochet hair bow, perfect for cheerful moods.",
    features: ["Handmade", "Soft yarn", "Lightweight", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 7,
    name: "Crochet Hair Bow - Green (Medium)",
    category: "HairBows",
    price: 299,
    originalPrice: 499,
    image: "images/bow (2).jpeg", // Update with the correct image path
    rating: 4.8,
    reviews: 40,
    description: "Fresh green medium crochet hair bow, handmade with soft yarn for a stylish look.",
    features: ["Handmade", "Soft yarn", "Lightweight", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 8,
    name: "Crochet Hair Bow - Peach (Big)",
    category: "HairBows",
    price: 399,
    originalPrice: 499,
    image: "images/bow (3).jpeg", // Update with the correct image path
    rating: 4.9,
    reviews: 50,
    description: "Stunning peach big crochet hair bow, perfect for special occasions.",
    features: ["Handmade", "Soft yarn", "Elegant design", "Secure grip"],
    ingredients: "Cotton Yarn, Metal Clip"
  },

  // Dragon Bows - 2 colors
  {
    id: 9,
    name: "Dragon Crochet Bow - Red",
    category: "HairBows",
    price: 60, // Updated price
    originalPrice: 299,
    image: "images/clips (4).jpeg",
    rating: 4.7,
    reviews: 32,
    badge: "Trending",
    description: "Red dragon scale crochet bow with a bold and textured look. A handmade favorite for festive styles.",
    features: ["Dragon scale stitch", "Premium yarn", "Firm metal clip", "Handcrafted finish"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 10,
    name: "Dragon Crochet Bow - Yellow",
    category: "HairBows",
    price: 60, // Updated price
    originalPrice: 299,
    image: "images/clips (5).jpeg",
    rating: 4.6,
    reviews: 28,
    description: "Bright yellow dragon bow with a layered look, great for cheerful moods and summer wear.",
    features: ["Unique texture", "Soft cotton yarn", "Durable grip", "Handmade with care"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 11,
    name: "Dragon Crochet Bow - Blue",
    category: "HairBows",
    price: 80, // Updated price
    originalPrice: 299,
    image: "images/clips (6).jpeg",
    rating: 4.5,
    reviews: 25,
    description: "Blue dragon scale crochet bow, inspired by fantasy style with fine detailing and secure clip.",
    features: ["Layered scale design", "Soft yarn texture", "Strong metal clip", "Colorfast material"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
  {
    id: 12,
    name: "Dragon Crochet Bow - Purple",
    category: "HairBows",
    price: 80, // Updated price
    originalPrice: 299,
    image: "images/clips (7).jpeg",
    rating: 4.6,
    reviews: 25,
    description: "Purple dragon scale crochet bow, adds whimsical charm to any hairstyle.",
    features: ["Handmade", "Soft cotton yarn", "Durable clip", "Fantasy-inspired design"],
    ingredients: "Cotton Yarn, Metal Clip"
  },
    // Coffee Cup Bookmark
  {
    id: 13,
    name: "Coffee Cup Bookmark",
    category: "Bookmarks",
    price: 200,
    originalPrice: 200,
    image: "images/bookmark cup (4).jpeg",  // Update with your image path
      additionalImages: [
    "images/bookmark cup (1).jpeg", // Additional image 1
    "images/bookmark_cup_3.jpeg", // Additional image 2
    "images/bookmark_cup_4.jpeg"  // Additional image 3
  ],
    rating: 4.7,
    reviews: 15,
    description: "Adorable crochet coffee cup bookmark, perfect for book lovers and coffee enthusiasts.",
    features: [
      "Handmade with soft cotton yarn",
      "Unique coffee cup design",
      "Perfect gift for readers",
      "Lightweight and durable"
    ],
    ingredients: "Cotton Yarn, Fabric Marker"
  },
  // Crochet Roses - 2 colors
  {
    id: 10,
    name: "Crochet Rose - Pink",
    category: "CrochetRoses",
    price: 160, // Updated price
    originalPrice: 180,
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
    price: 160, // Updated price
    originalPrice: 180,
    image: "images/redrose.jpeg",
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
    price: 145, // Updated price
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
