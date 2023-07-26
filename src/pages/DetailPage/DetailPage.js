import React, { useEffect } from 'react';
import { useParams, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './DetailPage.css';

const DetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const choosenCharacterId = params.id; // id выбранной карточки

  const characters = useSelector(state => state.main.characters);

  const choosenCharacter = characters.find(
    character => character.id == choosenCharacterId,
  );

  useEffect(() => {
    if (!choosenCharacter) {
      // если перезагрузка на странице персонажа
      navigate('/');
    }
  });

  if (!choosenCharacter) {
    return;
  }

  const { name, image, id, location, status, gender, species, origin } =
    choosenCharacter;

  return (
    <div className="detailPage">
      <p> {name}</p>
      <img className="character_img" src={image} alt={name} />
      <p>gender: {gender}</p>
      <p> species:{species}</p>
      <p> status: {status}</p>
      <p> location : {location.name}</p>
      <p> origin : {origin.name}</p>
    </div>
  );
};

export default DetailPage;
