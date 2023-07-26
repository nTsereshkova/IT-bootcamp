import axios from 'axios';
import mainSlice from '../slices/mainSlice';

export const {
  addCharacters,
  addInfiniteCharacters,
  showDetails,
  setTotalPageAmount,
  mainErrorHandler,
  infiniteFetchModeHandler,
  changeCurrentPage,
} = mainSlice.actions;

export const fetchCharacters = number => {
  return dispatch => {
    let pageNumber = number ? number : 0;
    console.log(number);
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${pageNumber + 1}`)
      .then(response => {
        dispatch(setTotalPageAmount(response.data.info.pages));
        // dispatch(changeCurrentPage(pageNumber + 1)),
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

export const infiniteFetchCharacters = number => {
  console.log('infine fetch from action ');
  return dispatch => {
    let pageNumber = number ? number : 0;
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${pageNumber + 1}`)
      .then(response => {
        dispatch(setTotalPageAmount(response.data.info.pages));
        dispatch(
          addInfiniteCharacters(
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
