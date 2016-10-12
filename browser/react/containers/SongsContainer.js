import { connect } from 'react-redux';

import { fetchAlbumFromServer } from '../myRedux';
import Songs from '../components/Songs';


const mapStateToProps = function (state, ownProps) {
  return  {
    album: state.album
  };
};

// What does this do?
const mapDispatchToProps = function (dispatch) {
	return {
		loadAlbum: () => dispatch(fetchAlbumFromServer())
	};
};

// One connect per container
const SongsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Songs);

export default SongsContainer;
