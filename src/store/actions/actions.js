import axios from 'axios';
import mainSlice from '../slices/mainSlice';

export const {
  showUserInfo,
  hideUserInfo,
  addCharacters,
  showDetails,
  setTotalPageAmount,
  mainErrorHandler,
} = mainSlice.actions;

export const fetchCharacters = number => {
  return dispatch => {
    let pageNumber = number ? number : 0;
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${pageNumber + 1}`)
      .then(response => {
        dispatch(setTotalPageAmount(response.data.info.pages));
        dispatch(
          addCharacters(
            response.data.results.map(character => ({
              name: character.name,
              id: character.id,
              image: character.image,
              gender: character.gender,
              species: character.species,
              status: character.status,
              location: character.location,
              origin: character.origin,
            })),
          ),
        );
      })
      .catch(err => dispatch(mainErrorHandler(err.response.data.message)));
  };
};

export const showUserInfoHandler = (token, userId) => {
  return dispatch => {
    axios
      .get('api/userInfo', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(response => dispatch(showUserInfo(response.data.user)))
      .catch(err => dispatch(mainErrorHandler(err.response.data.message)));
  };
};
