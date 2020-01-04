import axios from 'axios';

// Saga to POST new genre
function* postJunctionSaga(action){
  try{
    yield axios.post(`/film/junction`, action.payload);
  }
  catch(error){
    console.log('error in POST new junction:', error);
  }
}

export default postJunctionSaga;