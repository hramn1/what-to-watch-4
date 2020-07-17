import React from "react";
import propTypes from "prop-types";
const MovieCard = (props) => {
  const {title, img, onMouseHover, onMovieCardClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
     onClick={()=>onMovieCardClick(title)}
      onMouseOver = {() => {
        onMouseHover(title);
      }}>
      <div className="small-movie-card__image">
        <img src={img} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick = {(evt) => evt.preventDefault()}>{title}</a>
      </h3>
    </article>
  );
};
MovieCard.propTypes = {
  title: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  onMouseHover: propTypes.func.isRequired,
};
export default MovieCard;

