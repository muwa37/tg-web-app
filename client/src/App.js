import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { useTelegram } from './hooks/useTelegram';

const App = () => {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
