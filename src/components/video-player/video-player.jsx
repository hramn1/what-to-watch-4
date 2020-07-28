import React, {PureComponent} from "react";
import propTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }


  componentWillUnmount() {
    const video = this.videoRef.current;
    video.onplay = null;
    clearTimeout(this._timeout);
  }

  componentDidUpdate() {
    const video = this.videoRef.current;
    const {isPlaying, muted} = this.props;
    video.muted = muted;
    if (isPlaying) {
      this._timeout = setTimeout(() => video.play(), 1000);
    } else {
      clearTimeout(this._timeout);
      video.load();
    }
  }
  render() {
    const {film} = this.props;

    return (
      <video poster={film.poster} width="280" height="175"
        ref={this.videoRef}>
        <source src={film.preview} type='video/webm; codecs="vp8, vorbis"'/>
      </video>
    );
  }
}
VideoPlayer.propTypes = {
  film: propTypes.object.isRequired,
  isPlaying: propTypes.bool.isRequired,
  muted: propTypes.string.isRequired,
};
export default VideoPlayer;
