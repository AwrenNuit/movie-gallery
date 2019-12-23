import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to GET all genres
function* getGenreSaga(){
  try{
      const getResponse = yield axios.get(`/film/genre`);
      yield put({type: `SET_GENRE`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET genre:', error);
  }
}

export default getGenreSaga;