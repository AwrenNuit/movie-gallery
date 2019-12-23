import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to POST new film
function* postFilmSaga(action){
  try{
      yield axios.post(`/film`, action.payload);
      yield put({type: `GET_FILM`});
  }
  catch(error){
      console.log('error in POST new film:', error);
  }
}

export default postFilmSaga;