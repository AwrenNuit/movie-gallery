import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to GET all films
function* getFilmSaga(){
  try{
      console.log('in GET film saga');
      const getResponse = yield axios.get(`/film`);
      yield put({type: `SET_FILM`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET film:', error);
  }
}

export default getFilmSaga;