import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Character } from './Character';
import { AiOutlineArrowUp } from 'react-icons/ai';
import './CharactersList.css';

const CharacterList = ({
  characters,
  infiniteFetchMode,
  goBackToTopHandler,
  showBackToTop,
}) => {
  return (
    <div className="charactersList">
      {characters.map(item => (
        <Character key={uuidv4()} item={item} />
      ))}
      {infiniteFetchMode && showBackToTop && (
        <button className="charactersList-btn">
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
