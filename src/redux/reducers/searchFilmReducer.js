// Store the searched film
const searchFilmReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_SEARCH_FILM':
          return action.payload;
      default:
          return state;
  }
}

export default searchFilmReducer;