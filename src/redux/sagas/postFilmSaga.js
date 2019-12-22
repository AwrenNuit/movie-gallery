import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to EDIT selected film
function* postFilmSaga(action){
  try{
      console.log('in POST saga with:', action.payload);
      yield axios.post(`/film`, action.payload);
      yield put({type: `GET_FILM`});
  }
  catch(error){
      console.log('error in POST film:', error);
  }
}

export default postFilmSaga;