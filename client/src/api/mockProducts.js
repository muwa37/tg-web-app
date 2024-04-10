const products = [
  {
    id: '0',
    title: 'carrot',
    price: 40,
    description: 'straight from the underground',
  },
  { id: '1', title: 'tomato', price: 130, description: 'grown on balcony' },
  {
    id: '2',
    title: 'cucumber',
    price: 100,
    description: 'might help you heal',
  },
  {
    id: '3',
    title: 'watermelon',
    price: 30,
    description: 'waiting to be filled with vodka ',
  },
  { id: '4', title: 'onion', price: 20, description: 'it has layers...' },
  {
    id: '5',
    title: 'garlic',
    price: 50,
    description: 'put it everywhere for your health',
  },
  { id: '6', title: 'potato', price: 35, description: 'wishing to be fried' },
  {
    id: '7',
    title: 'cherry',
    price: 100,
    description: 'you will be able to pop it',
  },
];

export const getProducts = () => {
  return products;
};
