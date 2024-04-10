import React, { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../api/mockProducts';
import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem';
import './ProductList.css';

const getTotalPrice = products => {
  return products.reduce((totalPrice, product) => {
    return (totalPrice += product.price);
  }, 0);
};

const ProductList = () => {
  const [addedProducts, setAddedProducts] = useState([]);
  const products = getProducts();
  const { tg, queryId } = useTelegram();

  const onDataSendHandler = useCallback(() => {
    const data = {
      products: addedProducts,
      totalPrice: getTotalPrice(addedProducts),
      queryId,
    };

    fetch(process.env.API_POST_LINK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [addedProducts, queryId]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onDataSendHandler);
    return () => {
      tg.offEvent('mainButtonClicked', onDataSendHandler);
    };
  }, [onDataSendHandler]);

  const onAdd = product => {
    const alreadyAdded = addedProducts.find(item => item.id === product.id);
    const newProducts = [];

    if (alreadyAdded) {
      newProducts = addedProducts.filter(item => item.id !== product.id);
    } else {
      newProducts = [...addedProducts, product];
    }

    setAddedProducts(newProducts);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `buy ${getTotalPrice(newProducts)}`,
      });
    }
  };

  return (
    <div className={'list'}>
      s
      {products.map(product => {
        <ProductItem product={product} onAdd={onAdd} className={'item'} />;
      })}
    </div>
  );
};

export default ProductList;
