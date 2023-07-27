import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Character.css';

const Character = ({ item }) => {
  const { name, image, id, location, status, gender, species } = item;

  const navigate = useNavigate();
  const characterClickHandler = event => {
    navigate(`character/${id}`);
  };

  return (
    <div className="character" onClick={event => characterClickHandler(event)}>
      <div className="character_name"> {name}</div>
      <img className="character_img" src={image} alt={name} />
    </div>
  );
};

export default Character;
