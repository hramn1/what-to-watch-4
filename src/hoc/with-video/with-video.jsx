import React, {PureComponent} from 'react';

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        muted: `muted`,
      };

      this._handleIsPlayingChange = this._handleIsPlayingChange.bind(this);
    }

    _handleIsPlayingChange(isPlaying) {
      this.setState({
        isPlaying,
      });
    }

    render() {
      const {isPlaying, muted} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        muted = {muted}
        onIsPlayingChange={this._handleIsPlayingChange}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
