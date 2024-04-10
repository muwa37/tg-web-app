import React from 'react';
import Button from '../Button';
import './ProductItem.css';

const ProductItem = ({ className, product, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={'product ' + className}>
      <div className='img'>
        <img src='' alt='' />
      </div>
      <h2 className={'title'}>{product.title}</h2>
      <span className={'description'}>{product.description}</span>
      <h4 className={'price'}>{product.price}</h4>
      <Button className={'add-btn'} onClick={onAddHandler}>
        add to cart
      </Button>
    </div>
  );
};

export default ProductItem;
