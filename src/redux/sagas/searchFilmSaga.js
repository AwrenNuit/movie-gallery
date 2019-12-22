import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to GET the searched film(s) and genre
function* searchFilmSaga(action){
  try{
      console.log('in GET search film saga:', action.payload);
      const getResponse = yield axios.post(`/film/search/${action.payload}`);
      console.log('SEARCH DATA IS -------------------------------------------------:', getResponse.data);
      yield put({type: `SET_SEARCH_FILM`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET search film:', error);
  }
}

export default searchFilmSaga;