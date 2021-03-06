import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to EDIT selected film
function* deleteFilmSaga(action){
  try{
      yield axios.delete(`/film/delete/${action.payload}`);
      yield put({type: `GET_FILM`});
  }
  catch(error){
      console.log('error in DELETE film:', error);
  }
}

export default deleteFilmSaga;