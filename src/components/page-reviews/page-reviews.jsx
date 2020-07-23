import React from 'react';
import PropTypes from 'prop-types';

const PageReviews = (props) => {
  const {reviews} = props;


  return (<React.Fragment>
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews[0].text}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews[0].author}</cite>
              <time className="review__date" dateTime="2016-12-24">{reviews[0].date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews[0].rating}</div>
        </div>

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews[1].text}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews[1].author}</cite>
              <time className="review__date" dateTime="2015-11-18">{reviews[1].date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews[1].rating}</div>
        </div>

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews[2].text}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews[2].author}</cite>
              <time className="review__date" dateTime="2015-11-18">{reviews[2].date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews[2].rating}</div>
        </div>
      </div>
      <div className="movie-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews[3].text}.</p>

            <footer className="review__details">
              <cite className="review__author">{reviews[3].author}</cite>
              <time className="review__date" dateTime="2016-12-20">{reviews[3].date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews[3].rating}</div>
        </div>

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews[4].text}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews[4].author}</cite>
              <time className="review__date" dateTime="2016-12-20">{reviews[4].date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews[4].rating}</div>
        </div>
      </div>
    </div>

  </React.Fragment>);
};

export default PageReviews;

PageReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
