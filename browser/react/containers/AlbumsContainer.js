import { connect } from 'react-redux';
// function connect (mapStateToProps, mapDispatchToProps) => fnThatTakesAComponent => newComponent

import Albums from '../components/Albums';

// const mapStateToProps = function ({ albums }, ownProps) {
//   return { albums };
// }
const mapStateToProps = function (state, ownProps) {
  return  {
    albums: state.albums
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
	return {
		loadAlbums (albums) {
	      dispatch({ type: RECEIVE_ALBUMS_FROM_SERVER, albums: albums }); // hm, could we shorten this, too?
	    }	
	};
};

// One connect per container
const AlbumsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);

export default AlbumsContainer;
