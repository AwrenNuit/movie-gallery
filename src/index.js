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


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery(`GET_FILM`, getFilmSaga);
    yield takeEvery(`GET_GENRE`, getGenreSaga);
    yield takeEvery(`GET_THIS_FILM`, getThisFilmSaga);
}

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

// Used to store movies returned from the server
const filmReducer = (state = [], action) => {
    console.log('in film reducer');
    switch (action.type) {
        case 'SET_FILM':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Stores ONE movie that's clicked on
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
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
