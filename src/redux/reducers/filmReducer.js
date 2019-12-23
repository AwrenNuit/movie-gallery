// Store all films
const filmReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_FILM':
          return action.payload;
      default:
          return state;
  }
}

export default filmReducer;