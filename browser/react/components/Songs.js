'use strict';

import React from 'react';

class Songs extends React.Component {

  componentDidMount () {
    this.props.loadAlbum();
  }

  render() {
    return (
      <div>
      {console.log("HELLO", this.props)}
        <div className="album">
          <div>
            <h3>{ this.props.album.name }</h3>
            <img src={ this.props.album.imageUrl } className="img-thumbnail" />
          </div>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Artists</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.album.songs && this.props.album.songs.map(song => (
                <tr key={song.id}>
                  <td>
                    <button className="btn btn-default btn-xs" onClick={() => toggle(song, songs)}>
                      <span className={song.id === currentSong.id && isPlaying ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"}></span>
                    </button>
                  </td>
                  <td>{ song.name }</td>
                  <td>
                    <span>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : null }</span>
                  </td>
                  <td>{ song.genre }</td>
                </tr>
              ))
            }
          </tbody>
        </table>  
      </div>
    )
  }
};

export default Songs;