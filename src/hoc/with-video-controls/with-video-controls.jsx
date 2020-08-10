import React, {PureComponent, createRef} from 'react';
import {Time} from '../../const.js';
import PropTypes from "prop-types";

const withVideoControls = (Component) => {
  class WithVideoControls extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTime: 0,
        duration: 0,
        isPlaying: true,
      };

      this._videoRef = createRef();

      this._handleIsPlayingChange = this._handleIsPlayingChange.bind(this);
      this._handleSetFullScreen = this._handleSetFullScreen.bind(this);
    }

    _handleIsPlayingChange() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    _handleSetFullScreen() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    _showLeftTime() {
      const {currentTime, duration} = this.state;

      const timeDiff = duration - currentTime;

      const seconds = Math.trunc(timeDiff % Time.SECONDS_IN_MINUTE);
      const minutes = Math.trunc(timeDiff / Time.SECONDS_IN_MINUTE);
      const hours = Math.trunc(minutes / Time.MINUTES_IN_HOUR);

      return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.play();

      video.onloadedmetadata = () => this.setState({
        duration: video.duration,
      });

      video.ontimeupdate = () => this.setState({
        currentTime: Math.trunc(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.onplay = null;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
    }

    render() {
      const {currentTime, duration, isPlaying} = this.state;
      const {film} = this.props;
      const leftTime = this._showLeftTime();

      return <Component
        {...this.props}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        leftTime={leftTime}
        onIsPlayingChange={this._handleIsPlayingChange}
        onSetFullScreen={this._handleSetFullScreen}
      >
        <video className="player__video"
          poster={film.poster}
          ref={this._videoRef}
        >
          <source src={film.src} type='video/webm; codecs="vp8, vorbis"'/>
          <source src={film.src} type='video/ogg; codecs="theora, vorbis"'/>
          <source src={film.src} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
          your browser doesn`t support embedded videos</video>
      </Component>;
    }
  }

  WithVideoControls.propTypes = {
    film: PropTypes.object.isRequired,
  };

  return WithVideoControls;
};

export default withVideoControls;
