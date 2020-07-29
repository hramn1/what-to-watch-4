import React, {PureComponent} from "react";
import propTypes from "prop-types";
import FilmCard from "../movie-card/movie-card.jsx";
import withVideo from '../../hoc/with-video/with-video.jsx';

const FilmCardWrapper = withVideo(FilmCard);

class FilmList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onFilm: {},
    };
  }
  render() {
    const {films, onFilmCardClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((it) => {
          return (
            <FilmCardWrapper
              film = {it}
              title={it.title}
              img={it.poster}
              onMouseHover = {(currentFilm) =>{
                this.setState({
                  onFilm: currentFilm
                });
              }}
              key={it.id}
              onFilmCardClick = {onFilmCardClick}
            />
          );
        })}
      </div>
    );
  }
}
FilmList.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  onFilmCardClick: propTypes.func.isRequired,
};
export default FilmList;
