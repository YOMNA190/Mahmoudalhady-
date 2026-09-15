export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  category: 'drinks' | 'food' | 'desserts';
  subcategory?: string;
}

export const menuItems: MenuItem[] = [
  // Coffee - Hot Drinks
  { id: 'c1', name: 'Turkish Coffee', nameAr: 'قهوة تركي', price: 45, category: 'drinks', subcategory: 'coffee' },
  { id: 'c2', name: 'French Coffee', nameAr: 'قهوة فرنساوي', price: 55, category: 'drinks', subcategory: 'coffee' },
  { id: 'c3', name: 'Nescafe', nameAr: 'نسكافيه', price: 50, category: 'drinks', subcategory: 'coffee' },
  { id: 'c4', name: 'Nescafe Gold', nameAr: 'نسكافيه جولد', price: 60, category: 'drinks', subcategory: 'coffee' },
  { id: 'c5', name: 'Cappuccino', nameAr: 'كابتشينو', price: 55, category: 'drinks', subcategory: 'coffee' },
  { id: 'c6', name: 'Latte', nameAr: 'لاتيه', price: 55, category: 'drinks', subcategory: 'coffee' },
  { id: 'c7', name: 'Mocha', nameAr: 'موكا', price: 60, category: 'drinks', subcategory: 'coffee' },
  { id: 'c8', name: 'Hot Chocolate', nameAr: 'هوت شوكليت', price: 55, category: 'drinks', subcategory: 'coffee' },
  { id: 'c9', name: 'White Mocha', nameAr: 'وايت موكا', price: 60, category: 'drinks', subcategory: 'coffee' },
  
  // Tea - Hot Drinks
  { id: 't1', name: 'Tea', nameAr: 'شاي', price: 25, category: 'drinks', subcategory: 'tea' },
  { id: 't2', name: 'Green Tea', nameAr: 'شاي أخضر', price: 30, category: 'drinks', subcategory: 'tea' },
  { id: 't3', name: 'Mint Tea', nameAr: 'شاي نعناع', price: 30, category: 'drinks', subcategory: 'tea' },
  { id: 't4', name: 'Milk Tea', nameAr: 'شاي بحليب', price: 35, category: 'drinks', subcategory: 'tea' },
  { id: 't5', name: 'Karak Tea', nameAr: 'شاي كرك', price: 35, category: 'drinks', subcategory: 'tea' },
  { id: 't6', name: 'Herbal Tea', nameAr: 'شاي أعشاب', price: 35, category: 'drinks', subcategory: 'tea' },
  
  // Fresh Juices
  { id: 'j1', name: 'Mango Juice', nameAr: 'عصير مانجو', price: 65, category: 'drinks', subcategory: 'juice' },
  { id: 'j2', name: 'Strawberry Juice', nameAr: 'عصير فراولة', price: 65, category: 'drinks', subcategory: 'juice' },
  { id: 'j3', name: 'Guava Juice', nameAr: 'عصير جوافة', price: 60, category: 'drinks', subcategory: 'juice' },
  { id: 'j4', name: 'Orange Juice', nameAr: 'عصير برتقال', price: 55, category: 'drinks', subcategory: 'juice' },
  { id: 'j5', name: 'Lemon Juice', nameAr: 'عصير ليمون', price: 50, category: 'drinks', subcategory: 'juice' },
  { id: 'j6', name: 'Pomegranate Juice', nameAr: 'عصير رمان', price: 70, category: 'drinks', subcategory: 'juice' },
  { id: 'j7', name: 'Watermelon Juice', nameAr: 'عصير بطيخ', price: 55, category: 'drinks', subcategory: 'juice' },
  { id: 'j8', name: 'Banana with Milk', nameAr: 'موز بحليب', price: 60, category: 'drinks', subcategory: 'juice' },
  { id: 'j9', name: 'Avocado with Milk', nameAr: 'أفوكادو بحليب', price: 70, category: 'drinks', subcategory: 'juice' },
  
  // Milkshakes
  { id: 'm1', name: 'Vanilla Milkshake', nameAr: 'ميلك شيك فانيليا', price: 70, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm2', name: 'Chocolate Milkshake', nameAr: 'ميلك شيك شوكولاته', price: 75, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm3', name: 'Strawberry Milkshake', nameAr: 'ميلك شيك فراولة', price: 75, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm4', name: 'Caramel Milkshake', nameAr: 'ميلك شيك كراميل', price: 80, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm5', name: 'Mango Milkshake', nameAr: 'ميلك شيك مانجو', price: 75, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm6', name: 'Oreo Milkshake', nameAr: 'ميلك شيك أوريو', price: 85, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm7', name: 'Lotus Milkshake', nameAr: 'ميلك شيك لوتس', price: 85, category: 'drinks', subcategory: 'milkshake' },
  { id: 'm8', name: 'Nutella Milkshake', nameAr: 'ميلك شيك نوتيلا', price: 90, category: 'drinks', subcategory: 'milkshake' },
  
  // Smoothies
  { id: 'sm1', name: 'Tropical Smoothie', nameAr: 'سموزي استوائي', price: 80, category: 'drinks', subcategory: 'smoothie' },
  { id: 'sm2', name: 'Berry Smoothie', nameAr: 'سموزي توت', price: 85, category: 'drinks', subcategory: 'smoothie' },
  { id: 'sm3', name: 'Green Smoothie', nameAr: 'سموزي أخضر', price: 75, category: 'drinks', subcategory: 'smoothie' },
  { id: 'sm4', name: 'Peach Smoothie', nameAr: 'سموزي خوخ', price: 80, category: 'drinks', subcategory: 'smoothie' },
  
  // Iced Coffee
  { id: 'ic1', name: 'Iced Coffee', nameAr: 'آيس كوفي', price: 60, category: 'drinks', subcategory: 'iced' },
  { id: 'ic2', name: 'Iced Latte', nameAr: 'آيس لاتيه', price: 65, category: 'drinks', subcategory: 'iced' },
  { id: 'ic3', name: 'Iced Mocha', nameAr: 'آيس موكا', price: 70, category: 'drinks', subcategory: 'iced' },
  { id: 'ic4', name: 'Iced Spanish Latte', nameAr: 'آيس سبانيش لاتيه', price: 75, category: 'drinks', subcategory: 'iced' },
  { id: 'ic5', name: 'Iced Caramel', nameAr: 'آيس كراميل', price: 70, category: 'drinks', subcategory: 'iced' },
  
  // Soda Mix
  { id: 's1', name: 'Cola with Ice', nameAr: 'كولا مع ثلج', price: 35, category: 'drinks', subcategory: 'soda' },
  { id: 's2', name: 'Lemon Mint Soda', nameAr: 'صودا ليمون نعناع', price: 45, category: 'drinks', subcategory: 'soda' },
  { id: 's3', name: 'Grenadine Soda', nameAr: 'صودا جرينادين', price: 45, category: 'drinks', subcategory: 'soda' },
  { id: 's4', name: 'Mojito (Non-alcoholic)', nameAr: 'موهيتو', price: 55, category: 'drinks', subcategory: 'soda' },
  
  // Cans
  { id: 'can1', name: 'Pepsi', nameAr: 'بيبسي', price: 25, category: 'drinks', subcategory: 'cans' },
  { id: 'can2', name: 'Coca Cola', nameAr: 'كوكاكولا', price: 25, category: 'drinks', subcategory: 'cans' },
  { id: 'can3', name: 'Sprite', nameAr: 'سبرايت', price: 25, category: 'drinks', subcategory: 'cans' },
  { id: 'can4', name: 'Fanta', nameAr: 'فانتا', price: 25, category: 'drinks', subcategory: 'cans' },
  { id: 'can5', name: 'Schweppes', nameAr: 'شويبس', price: 30, category: 'drinks', subcategory: 'cans' },
  { id: 'can6', name: 'Red Bull', nameAr: 'ريد بول', price: 45, category: 'drinks', subcategory: 'cans' },
  
  // FOOD - Sandwiches
  { id: 'sn1', name: 'Chicken Escalope Sandwich', nameAr: 'ساندوتش إسكالوب دجاج', price: 95, category: 'food', subcategory: 'sandwich' },
  { id: 'sn2', name: 'Beef Escalope Sandwich', nameAr: 'ساندوتش إسكالوب لحمه', price: 110, category: 'food', subcategory: 'sandwich' },
  { id: 'sn3', name: 'Chicken Shawerma Sandwich', nameAr: 'ساندوتش شاورما فراخ', price: 75, category: 'food', subcategory: 'sandwich' },
  { id: 'sn4', name: 'Meat Shawerma Sandwich', nameAr: 'ساندوتش شاورما لحمه', price: 85, category: 'food', subcategory: 'sandwich' },
  { id: 'sn5', name: 'Hot Dog', nameAr: 'هوت دوج', price: 65, category: 'food', subcategory: 'sandwich' },
  { id: 'sn6', name: 'Chicken Pane Sandwich', nameAr: 'ساندوتش بانيه فراخ', price: 80, category: 'food', subcategory: 'sandwich' },
  
  // FOOD - Crepes
  { id: 'cr1', name: 'Chicken Crepe', nameAr: 'كريب دجاج', price: 95, category: 'food', subcategory: 'crepe' },
  { id: 'cr2', name: 'Meat Crepe', nameAr: 'كريب لحمه', price: 110, category: 'food', subcategory: 'crepe' },
  { id: 'cr3', name: 'Chicken Pane Crepe', nameAr: 'كريب بانيه فراخ', price: 90, category: 'food', subcategory: 'crepe' },
  { id: 'cr4', name: 'Shrimp Crepe', nameAr: 'كريب جمبري', price: 130, category: 'food', subcategory: 'crepe' },
  { id: 'cr5', name: 'Nutella Crepe', nameAr: 'كريب نوتيلا', price: 75, category: 'food', subcategory: 'crepe' },
  { id: 'cr6', name: 'Oreo Crepe', nameAr: 'كريب أوريو', price: 80, category: 'food', subcategory: 'crepe' },
  { id: 'cr7', name: 'Lotus Crepe', nameAr: 'كريب لوتس', price: 85, category: 'food', subcategory: 'crepe' },
  { id: 'cr8', name: 'Familia Special Crepe', nameAr: 'كريب فاميليا', price: 120, category: 'food', subcategory: 'crepe' },
  
  // FOOD - Pizza
  { id: 'pz1', name: 'Margherita Pizza', nameAr: 'بيتزا مارجريتا', price: 110, category: 'food', subcategory: 'pizza' },
  { id: 'pz2', name: 'Vegetable Pizza', nameAr: 'بيتزا خضار', price: 120, category: 'food', subcategory: 'pizza' },
  { id: 'pz3', name: 'Chicken Pizza', nameAr: 'بيتزا فراخ', price: 135, category: 'food', subcategory: 'pizza' },
  { id: 'pz4', name: 'Meat Pizza', nameAr: 'بيتزا لحمه', price: 150, category: 'food', subcategory: 'pizza' },
  { id: 'pz5', name: 'Familia Special Pizza', nameAr: 'بيتزا فاميليا', price: 175, category: 'food', subcategory: 'pizza' },
  
  // FOOD - Meals
  { id: 'ml1', name: 'Chicken Pane Meal', nameAr: 'وجبة بانيه فراخ', price: 140, category: 'food', subcategory: 'meal' },
  { id: 'ml2', name: 'Chicken Escalope Meal', nameAr: 'وجبة إسكالوب فراخ', price: 160, category: 'food', subcategory: 'meal' },
  { id: 'ml3', name: 'Beef Escalope Meal', nameAr: 'وجبة إسكالوب لحمه', price: 180, category: 'food', subcategory: 'meal' },
  { id: 'ml4', name: 'Grilled Chicken Meal', nameAr: 'وجبة فراخ مشوية', price: 170, category: 'food', subcategory: 'meal' },
  { id: 'ml5', name: 'Familia Mixed Grill', nameAr: 'وجبة مشويات فاميليا', price: 250, category: 'food', subcategory: 'meal' },
  
  // DESSERTS
  { id: 'd1', name: 'Lotus Cheesecake', nameAr: 'تشيز كيك لوتس', price: 85, category: 'desserts' },
  { id: 'd2', name: 'Oreo Cheesecake', nameAr: 'تشيز كيك أوريو', price: 85, category: 'desserts' },
  { id: 'd3', name: 'Blueberry Cheesecake', nameAr: 'تشيز كيك توت أزرق', price: 90, category: 'desserts' },
  { id: 'd4', name: 'Strawberry Cheesecake', nameAr: 'تشيز كيك فراولة', price: 90, category: 'desserts' },
  { id: 'd5', name: 'Chocolate Cake', nameAr: 'كيك شوكولاته', price: 80, category: 'desserts' },
  { id: 'd6', name: 'Tiramisu', nameAr: 'تيراميسو', price: 95, category: 'desserts' },
  { id: 'd7', name: 'Kunafa', nameAr: 'كنافة', price: 75, category: 'desserts' },
  { id: 'd8', name: 'Basbousa', nameAr: 'بسبوسة', price: 55, category: 'desserts' },
  { id: 'd9', name: 'Ice Cream (Scoop)', nameAr: 'آيس كريم (سكوب)', price: 35, category: 'desserts' },
  { id: 'd10', name: 'Familia Dessert Platter', nameAr: 'صحن حلويات فاميليا', price: 150, category: 'desserts' },
];

export const getItemsByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};

export const getSubcategories = (category: string) => {
  const items = getItemsByCategory(category);
  const subcats = [...new Set(items.map(item => item.subcategory).filter(Boolean))];
  return subcats;
};
