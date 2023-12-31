import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstEpisode } from '../../store/actions/actions';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
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
        <Loader />
      )}
    </div>
  );
};

export default DetailPage;
