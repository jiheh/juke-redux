import { connect } from 'react-redux';
import { toggle, toggleOne } from '../myRedux';
import AppComponent from '../components/AppComponent';

const mapStateToProps = function (state) {
  return {
    currentSong: state.currentSong,
    currentSongList: state.currentSongList,
    isPlaying: state.isPlaying
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    toggleOne: (song, list) => dispatch(toggleOne(song, list)),
    toggle: () => dispatch(toggle())
  }
}

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
