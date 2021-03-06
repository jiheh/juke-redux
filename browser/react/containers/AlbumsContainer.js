import { connect } from 'react-redux';
// function connect (mapStateToProps, mapDispatchToProps) => fnThatTakesAComponent => newComponent
import { fetchAlbumsFromServer } from '../myRedux';
import Albums from '../components/Albums';

// const mapStateToProps = function ({ albums }, ownProps) {
//   return { albums };
// }

const mapStateToProps = function (state, ownProps) {
  return  {
    albums: state.albums
  };
};

// What does this do?
const mapDispatchToProps = function (dispatch) {
	return {
		loadAlbums: () => dispatch(fetchAlbumsFromServer())
	};
};

// One connect per container
const AlbumsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);

export default AlbumsContainer;
