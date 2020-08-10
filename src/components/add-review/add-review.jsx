import React, {PureComponent, createRef} from 'react';
import history from '../../history.js';
import propTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Pages} from "../../const";

let isValidReview = true;
const AddReview = (props) => {
  const {
    film,
    onSubmitClick,
    isFormDisabled,
    reviewLength,
    isSubmitDisabled,
    isError,
    authorizationStatus,
    authorizationInfo,
    onRatingChange,
    onReviewChange,
  } = props;


    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={film.bg} alt={film.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className={`page-header ${authorizationStatus === AuthorizationStatus.NO_AUTH ? `user-page__head` : `movie-card__head`}}`}>
            <div className="logo">
              <Link to={Pages.MAIN} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    to={`${Pages.FILM}/${film.id}`}
                    className="breadcrumbs__link">
                    {film.title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH ?
                <div className="user-block__avatar">
                  <Link to={Pages.MY_LIST}>
                    <img src={authorizationInfo.avatar} alt={`${authorizationInfo.name} avatar`} width="63" height="63" />
                  </Link>
                </div>
                : <Link
                  to={Pages.LOGIN}
                  className="user-block__link">
                  Sign in
                </Link>
              }
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={film.poster} alt={film.title} width="218" height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" disabled={isSubmitDisabled} onSubmit={onSubmitClick}>
            <div className="rating"
                 onChange={onRatingChange}
            >
              <div className="rating__stars">
                <input className="rating__input"  id="star-1" type="radio" name="rating" disabled={isFormDisabled} defaultValue="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input"  id="star-2" type="radio" name="rating" disabled={isFormDisabled} defaultValue="2"/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input"  id="star-3" type="radio" name="rating" disabled={isFormDisabled} defaultValue="3"/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" disabled={isFormDisabled} defaultValue="4"/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" disabled={isFormDisabled} defaultValue="5"/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea  className="add-review__textarea" name="review-text" id="review-text"
                placeholder="Review text"
                minLength={reviewLength.MIN}
                maxLength={reviewLength.MAX}
                onInput={onReviewChange}
              >
              </textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isSubmitDisabled} >Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
}
const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
  authorizationInfo: state.USER.authorizationInfo,
  sendingComment: state.DATA.sendingComment,
});
AddReview.propTypes = {
  film: propTypes.object.isRequired,
  postReview: propTypes.func.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  authorizationInfo: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(AddReview);
