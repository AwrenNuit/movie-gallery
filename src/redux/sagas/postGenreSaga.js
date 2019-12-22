import axios from 'axios';
import {put} from 'redux-saga/effects';

// Saga to POST new genre
function* postGenreSaga(action){
  try{
      console.log('in POST new genre saga with:', action.payload);
      yield axios.post(`/film/genre`, action.payload);
      yield put({type: `GET_FILM`});
  }
  catch(error){
      console.log('error in POST new genre:', error);
  }
}

export default postGenreSaga;