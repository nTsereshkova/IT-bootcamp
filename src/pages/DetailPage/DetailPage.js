import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstEpisode } from '../../store/actions/actions';
import { useNavigate } from 'react-router-dom';
import './DetailPage.css';

const DetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const choosenCharacterId = params.id; // id выбранной карточки

  const { characters, showCharactersDetails } = useSelector(state => state.main);

  const choosenCharacter = characters.find(
    character => character.id == choosenCharacterId,
  );
  useEffect(() => {
    if (choosenCharacter) {
      dispatch(getFirstEpisode(choosenCharacter));
    }
  }, []);
  useEffect(() => {
    if (!choosenCharacter) {
      // если перезагрузка на странице персонажа
      navigate('/');
    }
  });

  if (!choosenCharacter) {
    return;
  }
  console.log(choosenCharacter);

  const { name, image, id, location, status, gender, species, origin, episode } =
    choosenCharacter;

  return (
    <div className="detailPage">
      {showCharactersDetails ? (
        <>
          <h2> {name}</h2>
          <img className="detailPage_img" src={image} alt={name} />
          <p>gender: {gender}</p>
          <p> species:{species}</p>
          <p> status: {status}</p>
          <p> location : {location.name}</p>
          <p> origin : {origin.name}</p>
          <p> first episode : {episode}</p>
        </>
      ) : (
        <p>...loading </p>
      )}
    </div>
  );
};

export default DetailPage;
