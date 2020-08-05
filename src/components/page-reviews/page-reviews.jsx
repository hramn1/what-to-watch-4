import React from 'react';
import PropTypes from 'prop-types';

const PageReviews = (props) => {
  const {reviews} = props;
  console.log(new Date(reviews[0].date))
  const half1 = reviews.slice(0, Math.round(reviews.length / 2));
  const half2 = reviews.slice(Math.round(reviews.length / 2));
  const getDate = (date) =>{
    const n = new Date(date).getDate()
    console.log(n)
    return n
  }


  return (<React.Fragment>
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {half1.map((it) =>
          <div key={it.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{it.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{it.user.name}</cite>
                <time className="review__date" dateTime={it.date}>{getDate(it.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{it.rating}</div>
          </div>
        )}
      </div>
      <div className="movie-card__reviews-col">
        {half2.map((it) =>
          <div key={it.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{it.text}</p>

              <footer className="review__details">
                <cite className="review__author">{it.author}</cite>
                <time className="review__date" dateTime={it.date}>{it.date}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{it.rating}</div>
          </div>
        )}
      </div>
    </div>

  </React.Fragment>);
};

export default PageReviews;

PageReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
