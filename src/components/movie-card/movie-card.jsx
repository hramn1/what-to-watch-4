import React from "react";
import propTypes from "prop-types";
const MovieCard = (props) => {
  const {title} = props;
  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="{title}" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};
MovieCard.propTypes = {
  title: propTypes.string.isRequired
};
export default MovieCard;

