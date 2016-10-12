import { createStore } from 'redux';
import initialState from './initialState';


const RECEIVE_ALBUMS_FROM_SERVER = 'RECEIVE_ALBUMS_FROM_SERVER';

export const receiveAlbums = (albums) => (
	{ type: RECEIVE_ALBUMS_FROM_SERVER, albums }
);

function reducer (state = initialState, action) {
	switch (action.type) { 
		case RECEIVE_ALBUMS_FROM_SERVER: return Object.assign({}, state, {albums: action.albums});
		default: return state;
	}
}

const store = createStore(reducer);

// console.log(store.getState());
// store.dispatch({ type: RECEIVE_ALBUMS_FROM_SERVER, albums: ['test'] })
// console.log(store.getState());

export default store;