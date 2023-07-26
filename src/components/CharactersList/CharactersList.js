import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../store/actions/actions';
import { Character } from './Character';
import './CharactersList.css';

const CharacterList = () => {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.main.characters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <div className="charactersList">
      {characters.map(item => (
        <Character key={uuidv4()} item={item} />
      ))}
    </div>
  );
};

export default CharacterList;
