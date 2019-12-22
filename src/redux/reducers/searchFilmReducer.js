// Store the searched film
const searchFilmReducer = (state = [], action) => {
  console.log('in SEARCH film reducer');
  switch (action.type) {
      case 'SET_SEARCH_FILM':
          return action.payload;
      default:
          return state;
  }
}

export default searchFilmReducer;