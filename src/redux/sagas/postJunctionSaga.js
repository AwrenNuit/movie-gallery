import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to POST new genre
function* postJunctionSaga(action){
  try{
      console.log('in POST new junction saga with:', action.payload);
      yield axios.post(`/film/junction`, action.payload);
      yield put({type: `GET_FILM`});
  }
  catch(error){
      console.log('error in POST new junction:', error);
  }
}

export default postJunctionSaga;