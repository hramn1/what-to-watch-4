import React, {PureComponent} from "react";
import propTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";
import withVideo from '../../hoc/with-video/with-video.jsx';

const FilmCardWrapper = withVideo(FilmCard);

class FilmList extends PureComponent {
  constructor(props) {
    super(props);
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
              onMouseHover = {() =>{}}
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
