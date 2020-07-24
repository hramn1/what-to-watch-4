import React, {PureComponent} from "react";
import propTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
class FilmCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }
  render() {
    const {film, title, onMouseHover, onFilmCardClick} = this.props;
    const {isPlaying} = this.state;
    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={() => onFilmCardClick(film)}
        onMouseOver={() => onMouseHover(title)}
        onMouseEnter={() => {
          this.setState({
            isPlaying: true
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isPlaying: false
          });
        }}>
        <div className="small-movie-card__image">
          <VideoPlayer
            film={film}
            isPlaying={isPlaying}
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
};
export default FilmCard;

