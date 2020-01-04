import axios from 'axios';

// Saga to DELETE a genre from selected film
function* deleteJunctionSaga(action){
  try{
    yield axios.delete(`/film/junction`, {data: action.payload});
  }
  catch(error){
    console.log('error in DELETE new junction:', error);
  }
}

export default deleteJunctionSaga;