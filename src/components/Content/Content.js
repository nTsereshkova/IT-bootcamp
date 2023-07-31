import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCurrentPage,
  infiniteFetchCharacters,
  fetchCharacters,
} from '../../store/actions/actions';
import { CharactersList } from './CharactersList';
import { Loader } from '../Loader';

const Content = () => {
  const dispatch = useDispatch();
  const { characters, infiniteFetchMode, currentPage, showCharacters } = useSelector(
    state => state.main,
  );

  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showBackToTop, setShowbackToTop] = useState(false);

  useEffect(() => {
    if (infiniteFetchMode === true) {
      const scrollHandler = () => {
        if (
          document.documentElement.clientHeight +
            Math.ceil(document.documentElement.scrollTop) !==
          document.documentElement.offsetHeight
        ) {
          //прячем кнопку
          if (document.documentElement.scrollTop < 400) {
            setShowbackToTop(false);
          }
          // показываем кнопку (если был скролл вверх, потом снова назад)
          if (document.documentElement.scrollTop > 400) {
            setShowbackToTop(true);
          }
          return;
        }
        // если долистал до конца
        setShowbackToTop(true);
        dispatch(changeCurrentPage(currentPage));
        setLoading(true);
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }
  });

  useEffect(() => {
    if (loading && infiniteFetchMode) {
      dispatch(infiniteFetchCharacters(currentPage));
      if (currentPage * 20 >= characters.length) {
        dispatch(changeCurrentPage(currentPage + 1));
      }
      return setLoading(false);
    }
    if (infiniteFetchMode == false) {
      dispatch(fetchCharacters());
    }
    // при первой загрузке
    if (firstLoad) {
      dispatch(fetchCharacters());
      setFirstLoad(false);
    }
  }, [dispatch, loading, characters.length, infiniteFetchMode, firstLoad]);

  const goBackToTopHandler = () => {
    window.scrollTo(pageXOffset, 0);
  };

  return (
    <>
      {showCharacters ? (
        <CharactersList
          characters={characters}
          showBackToTop={showBackToTop}
          infiniteFetchMode={infiniteFetchMode}
          goBackToTopHandler={goBackToTopHandler}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Content;
