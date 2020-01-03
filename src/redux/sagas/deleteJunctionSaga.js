import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to DELETE a genre from selected film
function* deleteJunctionSaga(action){
  try{
    yield axios.delete(`/film/junction`, {data: action.payload});
    yield put({type: `GET_FILM`});
  }
  catch(error){
    console.log('error in DELETE new junction:', error);
  }
}

export default deleteJunctionSaga;