import React, {PureComponent} from 'react';

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);
      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
      };

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
      const {isPlaying} = this.state;

      return (<Component
        {...this.props}
        isPlaying={isPlaying}
      >
      <video poster={film.poster} width="280" height="175"
             ref={this.videoRef}>
        <source src={film.preview} type='video/webm; codecs="vp8, vorbis"'/>
      </video>
    </Component>
      );
    }
  }

  return WithVideo;
};

export default withVideo;
