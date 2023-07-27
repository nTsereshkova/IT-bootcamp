import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharacters,
  infiniteFetchCharacters,
  changeCurrentPage,
} from '../../store/actions/actions';
import { Character } from './Character';
import { AiOutlineArrowUp } from 'react-icons/ai';
import './CharactersList.css';

const CharacterList = () => {
  const dispatch = useDispatch();
  const { characters, infiniteFetchMode, currentPage } = useSelector(
    state => state.main,
  );

  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showBackToTop, setShowbackToTop] = useState(false);

  console.log(currentPage);

  useEffect(() => {
    console.log('юз эффект который првоеряет проктрукту вниз');
    console.log(infiniteFetchMode);
    if (infiniteFetchMode === true) {
      console.log('ты в режиме infiniteFetchMode');
      const scrollHandler = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop !==
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
        console.log('ты долистал до конца');

        setShowbackToTop(true);
        dispatch(changeCurrentPage(currentPage));
        setLoading(true);
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }
  });
  // [infiniteFetchMode, dispatch]
  // useEffect(() => {
  //   console.log('эффект пряет кнопку');
  //   const scrollHandler =() => {

  //   }
  //   if (infiniteFetchMode) {
  //     if (document.documentElement.scrollTop > 400) {
  //       setShowbackToTop(true);
  //     }
  //     if (pageYOffset < document.documentElement.clientHeight) {
  //       console.log('спрятали кнопку ');
  //       setShowbackToTop(false);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   console.log('use effect который проверяет прокруту вверх');
  //   if (infiniteFetchMode) {
  //     console.log('ты в режиме infiniteFetchMode  в прокрутке вверх');
  //     const scrollHandler = () => {
  //       console.log(currentPage, 'current page scrollhadler');
  //       if (document.documentElement.scrollTop === 0 && currentPage > 1) {
  //         console.log('ты долистал до самого верха ');
  //         dispatch(changeCurrentPage(currentPage - 1));
  //         setLoading(true);
  //       }
  //     };
  //     window.addEventListener('scroll', scrollHandler);
  //     return () => window.removeEventListener('scroll', scrollHandler);
  //   }
  // });

  useEffect(() => {
    console.log('юз эффект ответсвенный за запрос на сервер');
    console.log(loading, infiniteFetchMode);
    if (loading && infiniteFetchMode) {
      console.log('попали в  loading && infiniteFetchMode');
      dispatch(infiniteFetchCharacters(currentPage));
      if (currentPage * 20 >= characters.length) {
        console.log('currentPage * 20 >= characters.length');
        dispatch(changeCurrentPage(currentPage + 1));
        // return setLoading(false);
      }
      // if (currentPage * 20 <= characters.length) {
      //   console.log('currentPage * 20 <= characters.length');
      //   dispatch(changeCurrentPage(currentPage - 1));
      //   // return setLoading(false);
      // }
      return setLoading(false);
    }
    if (infiniteFetchMode == false) {
      console.log('!loading && !infiniteFetchMode');
      dispatch(fetchCharacters());
    }
    // при первой загрузке для исклбчения глюков при перезагрузке старницы
    if (firstLoad) {
      console.log('firstLoad');
      dispatch(fetchCharacters());
      setFirstLoad(false);
    }

    // // при пре смене пагинации с постраничной на бесконечную
    // if (firstLoad === false && loading === false && infiniteFetchMode === true) {
    //   console.log(
    //     'firstLoad === false && loading === false && infiniteFetchMode === true',
    //   );
    //   dispatch(fetchCharacters());
    // не подхожит, не скролится
    // }
  }, [dispatch, loading, characters.length, infiniteFetchMode, firstLoad]);

  // useEffect(() => {
  //   if (loading === false && infiniteFetchMode == true && currentPage > 1) {
  //     setFirstLoad(true);
  //   }
  // }, [loading, infiniteFetchMode, currentPage]);
  console.log(showBackToTop, 'show back to top ');

  const goBackToTopHandler = () => {
    window.scrollTo(pageXOffset, 0);
  };

  return (
    <div className="charactersList">
      {characters.map(item => (
        <Character key={uuidv4()} item={item} />
      ))}
      {infiniteFetchMode && showBackToTop && (
        <button className="charactersList-btn">
          {/* Back to top  */}
          <AiOutlineArrowUp
            className="charactersList-btn-icon"
            onClick={goBackToTopHandler}
          />
        </button>
      )}
    </div>
  );
};

export default CharacterList;
