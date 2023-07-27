import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharacters,
  infiniteFetchCharacters,
  changeCurrentPage,
} from '../../store/actions/actions';
import { Character } from './Character';
import './CharactersList.css';

const CharacterList = () => {
  const dispatch = useDispatch();
  const { characters, infiniteFetchMode, currentPage } = useSelector(
    state => state.main,
  );

  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  console.log(currentPage);

  useEffect(() => {
    console.log('юз эффект который слежит долистал ли ты до конца ');
    console.log(infiniteFetchMode);
    if (infiniteFetchMode === true) {
      console.log('ты в режиме infiniteFetchMode');
      const scrollHandler = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight
        ) {
          return;
        }
        console.log('ты долистал до конца');
        dispatch(changeCurrentPage(currentPage));
        setLoading(true);
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }
  });
  // [infiniteFetchMode, dispatch]

  useEffect(() => {
    console.log('юз эффект ответсвенный за запрос на сервер');
    console.log(loading, infiniteFetchMode);
    if (loading && infiniteFetchMode) {
      console.log('попали в  loading && infiniteFetchMode');
      dispatch(infiniteFetchCharacters(currentPage));
      return setLoading(false);
      // if (currentPage * 20 >= characters.length) {
      //   console.log('currentPage * 20 >= characters.length');
      //   // dispatch(infiniteFetchCharacters(currentPage));
      //   // return setLoading(false);
      // }
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
  return (
    <div className="charactersList">
      {characters.map(item => (
        <Character key={uuidv4()} item={item} />
      ))}
    </div>
  );
};

export default CharacterList;
