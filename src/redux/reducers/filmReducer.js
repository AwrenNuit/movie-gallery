// Store all films
const filmReducer = (state = [], action) => {
  console.log('in film reducer');
  switch (action.type) {
      case 'SET_FILM':
          return action.payload;
      default:
          return state;
  }
}

export default filmReducer;