import React, {PureComponent} from "react";
import propTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {Link} from 'react-router-dom';
import {Pages} from "../../const.js";

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
          <Link to={`${Pages.FILM}/${film.id}`} className="small-movie-card__link">{film.title}</Link>
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

