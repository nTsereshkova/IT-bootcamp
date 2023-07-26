import React from 'react';
import { useSelector } from 'react-redux';
import { Footer } from '../../components/Footer';
import { CharactersList } from '../../components/CharactersList';
import './Main.css';

const Main = () => {
  const { isError, error } = useSelector(state => state.main);

  console.log(error);
  return (
    <div className="main">
      {!isError ? (
        <>
          <CharactersList />
          <Footer />
        </>
      ) : (
        { error }
      )}
    </div>
  );
};
export default Main;
