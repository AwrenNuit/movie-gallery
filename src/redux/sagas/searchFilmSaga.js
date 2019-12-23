import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to GET the searched film(s) and genre
function* searchFilmSaga(action){
  try{
      const getResponse = yield axios.get(`/film/search/${action.payload}`);
      yield put({type: `SET_SEARCH_FILM`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET search film:', error);
  }
}

export default searchFilmSaga;