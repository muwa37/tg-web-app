import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');

  const { tg } = useTelegram();

  const onDataSendHandler = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onDataSendHandler);
    return () => {
      tg.offEvent('mainButtonClicked', onDataSendHandler);
    };
  }, [onDataSendHandler]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'send data',
    });
  }, []);

  useEffect(() => {
    if (!country || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onCountryChangeHandler = e => {
    setCountry(e.target.value);
  };
  const onStreetChangeHandler = e => {
    setStreet(e.target.value);
  };
  const onSubjectChangeHandler = e => {
    setSubject(e.target.value);
  };

  return (
    <div className={'form'}>
      <h2>fill form</h2>
      <input
        type='text'
        className={'input'}
        placeholder={'country'}
        value={country}
        onChange={onCountryChangeHandler}
      />
      <input
        type='text'
        className={'input'}
        placeholder={'street'}
        value={street}
        onChange={onStreetChangeHandler}
      />
      <select
        className={'select'}
        placeholder={'country'}
        value={subject}
        onChange={onSubjectChangeHandler}
      >
        <option value={'physical'}>physical</option>
        <option value={'legal'}>legal</option>
      </select>
    </div>
  );
};

export default Form;
