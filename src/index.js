import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';


// Create the watcherSaga generator function
function* watcherSaga() {
    yield takeEvery(`GET_FILM`, getFilmSaga);
    yield takeEvery(`GET_GENRE`, getGenreSaga);
    yield takeEvery(`GET_THIS_FILM`, getThisFilmSaga);
}

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

// Saga to GET all genres
function* getGenreSaga(){
    try{
        console.log('in GET genre saga');
        const getResponse = yield axios.get(`/film/genre`);
        yield put({type: `SET_GENRE`, payload: getResponse.data});
    }
    catch(error){
        console.log('error in GET genre:', error);
    }
}

// Saga to GET the selected film and genre
function* getThisFilmSaga(action){
    try{
        console.log('in GET this film saga:', action.payload);
        const getResponse = yield axios.get(`/film/this/${action.payload}`);
        yield put({type: `SET_THIS_FILM`, payload: getResponse.data});
    }
    catch(error){
        console.log('error in GET this film:', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Store all films
const filmReducer = (state = [], action) => {
    console.log('in film reducer');
    switch (action.type) {
        case 'SET_FILM':
            return action.payload;
        default:
            return state;
    }
}

// Store all genres
const genreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Store the selected film
const thisFilmReducer = (state = [], action) => {
    console.log('in THIS film reducer');
    switch (action.type) {
        case 'SET_THIS_FILM':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        filmReducer,
        genreReducer,
        thisFilmReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();