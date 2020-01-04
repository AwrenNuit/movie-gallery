import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to POST new genre
function* postGenreSaga(action){
  try{
      yield axios.post(`/film/genre`, action.payload);
      yield put({type: `GET_GENRE`});
  }
  catch(error){
      console.log('error in POST new genre:', error);
  }
}

export default postGenreSaga;