import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to GET the selected film and genre
function* getThisFilmSaga(action){
  try{
      const getResponse = yield axios.get(`/film/this/${action.payload}`);
      yield put({type: `SET_THIS_FILM`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET this film:', error);
  }
}

export default getThisFilmSaga;