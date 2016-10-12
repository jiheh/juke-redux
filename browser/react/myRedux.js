import { createStore, applyMiddleware } from 'redux';
import initialState from './initialState';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { convertAlbum } from './containers/AppContainer';

const RECEIVE_ALBUMS_FROM_SERVER = 'RECEIVE_ALBUMS_FROM_SERVER';

export const receiveAlbums = (albums) => (
	{ type: RECEIVE_ALBUMS_FROM_SERVER, albums }
);

export const fetchAlbumsFromServer = () => {
	return dispatch => {
		fetch('/api/albums')
		.then(res => res.json())
		.then(albums => albums.map(album => convertAlbum(album)))
		.then(albums => dispatch(receiveAlbums(albums)));
	}
}

function reducer (state = initialState, action) {
	switch (action.type) { 
		case RECEIVE_ALBUMS_FROM_SERVER: return Object.assign({}, state, {albums: action.albums});
		default: return state;
	}
}

const store = createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware));

export default store;
