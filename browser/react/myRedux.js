import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import initialState from './initialState';
import { convertAlbum } from './components/AppComponent';

// Action Types

const RECEIVE_ALBUMS_FROM_SERVER = 'RECEIVE_ALBUMS_FROM_SERVER';
const RECEIVE_ALBUM_FROM_SERVER = 'RECEIVE_ALBUM_FROM_SERVER';
const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

// SYNC Action Creators

export const receiveAlbums = (albums) => (
	{ type: RECEIVE_ALBUMS_FROM_SERVER, albums }
);
export const receiveAlbum = (album) => (
	{ type: RECEIVE_ALBUM_FROM_SERVER, album}
);
export const startPlaying = () => (
	{ type: START_PLAYING }
);
export const stopPlaying = () => (
	{ type: STOP_PLAYING }
);
export const setCurrentSong = (currentSong, currentSongList) => (
	{ type: SET_CURRENT_SONG,
	  currentSong,
	  currentSongList
	}
);

// ASYNC Action Creators

export const fetchAlbumsFromServer = () => {
	return dispatch => {
		fetch('/api/albums')
		.then(res => res.json())
		.then(albums => albums.map(album => convertAlbum(album)))
		.then(albums => dispatch(receiveAlbums(albums)));
	}
}

export const fetchAlbumFromServer = () => {
	return dispatch => {
		fetch(`/api/albums/1`)
		.then(res => res.json())
		.then(album => convertAlbum(album))
		.then(album => dispatch(receiveAlbum(album)));
	}
}

export const play = () => {
	return dispatch => {
		AUDIO.play();
		dispatch(startPlaying());
	}
}

export const pause = () => {
	return dispatch => {
	  AUDIO.pause();
	  dispatch(stopPlaying());
	}
};

export const load = (currentSong, currentSongList) => {
	return dispatch => {
	  AUDIO.src = currentSong.audioUrl;
	  AUDIO.load();
	  dispatch(setCurrentSong(currentSong, currentSongList));
	}
};

export const startSong = (song, list) => {
	return dispatch => {
	  dispatch(pause());
	  dispatch(load(song, list));
	  dispatch(play());
	}
};

export const toggleOne = (selectedSong, selectedSongList) => {
	return (dispatch, getState) => {
	    const { currentSong } = getState();
	    if (selectedSong.id !== currentSong.id)
	      dispatch(startSong(selectedSong, selectedSongList));
	    else dispatch(toggle());
	}
};

export const toggle = () => {
	return (dispatch, getState) => {
	  const { isPlaying } = getState();
	  if (isPlaying) dispatch(pause());
	  else dispatch(play());
	}
};

// Reducers

function albums (state = initialState.albums, action) {
	switch (action.type) { 
		case RECEIVE_ALBUMS_FROM_SERVER: return action.albums;
		default: return state;
	}
}

function album (state = initialState.album, action) {
	switch (action.type) { 
		case RECEIVE_ALBUM_FROM_SERVER: return action.album;
		default: return state;
	}
}

function isPlaying (state = false, action) {
	switch (action.type) {
    	case START_PLAYING: return true;
	    case STOP_PLAYING: return false;
	    default: return state;
  }
}

function currentSong (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_SONG: return action.currentSong;
    default: return state;
  }
};

function currentSongList (state = [], action) {
  switch (action.type) {
    case SET_CURRENT_SONG: return action.currentSongList;
    default: return state;
  }
};

const rootReducer = combineReducers({
	album,
	albums,
	isPlaying,
	currentSong,
	currentSongList
})


const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));

export default store;
