import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
// import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery} from 'redux-saga/effects';
// Import sagas
import deleteFilmSaga from './redux/sagas/deleteFilmSaga';
import editFilmSaga from './redux/sagas/editFilmSaga';
import getFilmSaga from './redux/sagas/getFilmSaga';
import getGenreSaga from './redux/sagas/getGenreSaga';
import getThisFilmSaga from './redux/sagas/getThisFilmSaga';
import postFilmSaga from './redux/sagas/postFilmSaga';
import postGenreSaga from './redux/sagas/postGenreSaga';
import postJunctionSaga from './redux/sagas/postJunctionSaga';
import searchFilmSaga from './redux/sagas/searchFilmSaga';
// Import reducers
import filmReducer from './redux/reducers/filmReducer';
import genreReducer from './redux/reducers/genreReducer';
import thisFilmReducer from './redux/reducers/thisFilmReducer';
import searchFilmReducer from './redux/reducers/searchFilmReducer'

// Create the watcherSaga generator function
function* watcherSaga() {
    yield takeEvery(`DELETE_FILM`, deleteFilmSaga);
    yield takeEvery(`EDIT_FILM`, editFilmSaga);
    yield takeEvery(`GET_FILM`, getFilmSaga);
    yield takeEvery(`GET_GENRE`, getGenreSaga);
    yield takeEvery(`GET_THIS_FILM`, getThisFilmSaga);
    yield takeEvery(`POST_FILM`, postFilmSaga);
    yield takeEvery(`POST_GENRE`, postGenreSaga);
    yield takeEvery(`POST_JUNCTION`, postJunctionSaga);
    yield takeEvery(`SEARCH_FILM`, searchFilmSaga);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        filmReducer,
        genreReducer,
        thisFilmReducer,
        searchFilmReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();