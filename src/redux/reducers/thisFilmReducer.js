// Store the selected film
const thisFilmReducer = (state = [], action) => {
  console.log('in THIS film reducer');
  switch (action.type) {
      case 'SET_THIS_FILM':
          return action.payload;
      default:
          return state;
  }
}

export default thisFilmReducer;