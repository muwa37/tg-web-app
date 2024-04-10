import React from 'react';

const tg = window.Telegram.WebApp;

const App = () => {
  useEffect(() => {
    tg.ready();
  }, []);

  const onCloseHandler = () => {
    tg.close();
  };

  return (
    <div>
      <button onClick={onCloseHandler}>close</button>
    </div>
  );
};

export default App;
