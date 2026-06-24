export const menuCategories = [
  { id: 'all', name: 'All Menu' },
  { id: 'veg', name: 'Vegetarian' },
  { id: 'non-veg', name: 'Non-Vegetarian' },
  { id: 'bread', name: 'Artisanal Breads' },
  { id: 'dessert', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' }
];

export const menuItems = [
  // VEGETARIAN
  {
    id: 'veg-1',
    name: 'Garden Margherita Pizza',
    category: 'veg',
    price: 18.00,
    tag: 'veg',
    description: 'Stone-baked pizza topped with fresh buffalo mozzarella, vine-ripened tomatoes, sweet basil, and a drizzle of cold-pressed olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop',
    modelType: 'pizza',
    glbPath: 'public/models/Hitem3d-1782282461764.glb', 
    customizations: {
      type: 'Crust Type',
      options: ['thin crust', 'sourdough', 'gluten-free']
    }
  },
  {
    id: 'veg-2',
    name: 'Truffle Mushroom Risotto',
    category: 'veg',
    price: 24.00,
    tag: 'veg',
    description: 'Creamy Arborio rice slow-cooked with wild porcini mushrooms, finished with aromatic white truffle oil and freshly grated Parmigiano.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=600&auto=format&fit=crop',
    modelType: 'risotto',
    glbPath: '/models/risotto.glb', // <add .glb here>
    customizations: {
      type: 'Portion Size',
      options: ['regular', 'large (+ $4)']
    }
  },
  

  // NON-VEGETARIAN
  {
    id: 'nv-1',
    name: 'Cambio Signature Burger',
    category: 'non-veg',
    price: 21.00,
    tag: 'non-veg',
    description: '8oz prime dry-aged Angus beef patty, melted Gruyère cheese, caramelized balsamic onions, and house truffle aioli on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
    modelType: 'burger',
    glbPath: '/models/burger.glb', // <add .glb here>
    customizations: {
      type: 'Meat Temp',
      options: ['medium rare', 'medium', 'well done']
    }
  },
  {
    id: 'nv-2',
    name: 'Pan-Seared Saffron Salmon',
    category: 'non-veg',
    price: 29.00,
    tag: 'non-veg',
    description: 'Crispy-skin Atlantic salmon fillet resting on wild asparagus, accompanied by a decadent citrus saffron reduction and herb baby potato mash.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
    modelType: 'salmon',
    glbPath: '/models/salmon.glb', // <add .glb here>
    customizations: {
      type: 'Doneness',
      options: ['medium', 'cooked through']
    }
  },
  {
    id: 'nv-3',
    name: 'USDA Prime Ribeye Steak',
    category: 'non-veg',
    price: 42.00,
    tag: 'non-veg',
    description: '12oz USDA Prime hand-cut ribeye steak, grilled to perfection and basted with rosemary-garlic butter, served with truffle oil potato wedges.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    modelType: 'steak',
    glbPath: '/models/steak.glb', // <add .glb here>
    customizations: {
      type: 'Meat Temp',
      options: ['rare', 'medium rare', 'medium', 'well done']
    }
  },

  // ARTISANAL BREADS
  {
    id: 'br-1',
    name: 'Rosemary Garlic Focaccia',
    category: 'bread',
    price: 8.00,
    tag: 'veg',
    description: 'Traditional Italian flatbread baked with fresh rosemary sprigs, flaked sea salt, roasted garlic bulbs, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop',
    modelType: 'bread',
    glbPath: '/models/focaccia.glb', // <add .glb here>
    customizations: {
      type: 'Dip Options',
      options: ['olive oil & balsamic', 'roasted garlic butter', 'spicy marinara']
    }
  },
  

  // DESSERTS
  {
    id: 'ds-1',
    name: 'Molten Chocolate Lava Cake',
    category: 'dessert',
    price: 11.00,
    tag: 'dessert',
    description: 'Decadent dark chocolate cake with a velvety molten lava center, served with a scoop of premium Madagascan vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
    modelType: 'cake',
    glbPath: '/models/lava_cake.glb', // <add .glb here>
    customizations: {
      type: 'Gelato Flavor',
      options: ['vanilla bean', 'salted caramel', 'hazelnut']
    }
  },
  {
    id: 'ds-2',
    name: 'Cambio Classic Tiramisu',
    category: 'dessert',
    price: 10.00,
    tag: 'dessert',
    description: 'Espresso-soaked Savoiardi ladyfingers layered with rich, whipped mascarpone cream and dusted with premium Belgian dark cocoa powder.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop',
    modelType: 'tiramisu',
    glbPath: '/models/tiramisu.glb', // <add .glb here>
    customizations: {
      type: 'Style',
      options: ['classic', 'decafeinated espresso']
    }
  },
  

  // BEVERAGES
  {
    id: 'bv-1',
    name: 'Citrus Cucumber Mint Cooler',
    category: 'beverages',
    price: 6.00,
    tag: 'beverages',
    description: 'A refreshing mocktail of muddled cucumber, fresh mint leaves, squeezed lime, and organic agave nectar, charged with sparkling mineral water.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
    modelType: 'drink',
    glbPath: '/models/mint_cooler.glb', // <add .glb here>
    customizations: {
      type: 'Sweetness',
      options: ['regular', 'less sweet', 'no sugar']
    }
  },
  {
    id: 'bv-2',
    name: 'Smoked Maple Old Fashioned',
    category: 'beverages',
    price: 14.00,
    tag: 'beverages',
    description: 'Premium rye whiskey, bitters, and organic Vermont maple syrup, smoked tableside over burning applewood chips and served over a slow-melting ice sphere.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=600&auto=format&fit=crop',
    modelType: 'drink-smoke',
    glbPath: '/models/old_fashioned.glb', // <add .glb here>
    customizations: {
      type: 'Ice Type',
      options: ['ice sphere', 'standard cubes', 'no ice']
    }
  },
  {
    id: 'bv-3',
    name: 'Ceremonial Iced Matcha Latte',
    category: 'beverages',
    price: 7.00,
    tag: 'beverages',
    description: 'Whisked Japanese ceremonial Uji matcha layered over cold organic oat milk, lightly sweetened with wildflower honey.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop',
    modelType: 'drink-matcha',
    glbPath: '/models/matcha_latte.glb', // <add .glb here>
    customizations: {
      type: 'Milk Type',
      options: ['oat milk', 'almond milk', 'whole milk']
    }
  }
];
