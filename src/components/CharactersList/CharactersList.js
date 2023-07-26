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
    console.log('сработал .юз эффект на пролистывание');
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
    console.log(loading, infiniteFetchMode);
    if (loading && infiniteFetchMode) {
      console.log('попали в  loading && infiniteFetchMode');

      if (currentPage * 20 >= characters.length) {
        console.log('currentPage * 20 >= characters.length');
        dispatch(infiniteFetchCharacters(currentPage));
        return setLoading(false);
      }
    }
    if (infiniteFetchMode == false) {
      console.log('!loading && !infiniteFetchMode');
      dispatch(fetchCharacters());
    }
    // // при петрвой загрузке или пре смене пагинации с постраничной на бесконечную
    if (firstLoad) {
      console.log('firstLoad');
      dispatch(fetchCharacters());
      setFirstLoad(false);
    }
    // if (loading === false && infiniteFetchMode === true) {
    //   dispatch(fetchCharacters());
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
