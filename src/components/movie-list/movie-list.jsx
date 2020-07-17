import React, {PureComponent} from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onFilm: {},
    };
  }
  render() {
    const {films, onMovieCardClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((it) => {
          return (
            <MovieCard
              title={it.title}
              img={it.poster}
              onMouseHover = {(currentFilm) =>{
                this.setState({
                  onFilm: currentFilm
                });
              }}
              key={it.id}
              onMovieCardClick = {onMovieCardClick}
            />
          );
        })}
      </div>
    );
  }
}
MovieList.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
};
export default MovieList;
