import React, {PureComponent} from "react";
import propTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
class FilmCard extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {film, title, isPlaying, muted, onIsPlayingChange, onMouseHover, onFilmCardClick} = this.props;
    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={() => onFilmCardClick(film)}
        onMouseOver={() => onMouseHover(title)}
        onMouseEnter={() => {
          onIsPlayingChange(true);
        }}
        onMouseLeave={() => {
          onIsPlayingChange(false);
        }}>
        <div className="small-movie-card__image">
          <VideoPlayer
            film={film}
            isPlaying={isPlaying}
            muted={muted}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html"
            onClick={(evt) => evt.preventDefault()}>{title}</a>
        </h3>
      </article>
    );
  }
}
FilmCard.propTypes = {
  film: propTypes.object.isRequired,
  title: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  onFilmCardClick: propTypes.func.isRequired,
  onMouseHover: propTypes.func.isRequired,
  isPlaying: propTypes.bool.isRequired,
  muted: propTypes.string.isRequired,
  onIsPlayingChange: propTypes.func.isRequired,
};
export default FilmCard;

