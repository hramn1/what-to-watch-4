import React, {PureComponent, createRef} from 'react';
import history from '../../history.js';
import propTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";


class PageAddOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.retingRef1 = createRef();
    this.retingRef2 = createRef();
    this.retingRef3 = createRef();
    this.retingRef4 = createRef();
    this.retingRef5 = createRef();
    this.reviewRef = createRef();
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit(evt) {
    const {film, postReview} = this.props;
    evt.preventDefault();
    const Allrating = [this.retingRef1, this.retingRef2, this.retingRef3, this.retingRef4, this.retingRef5];
    const ratingChecked = Allrating.filter((it) => it.current.checked === true);
    const reviewData = {
      rating: ratingChecked[0].current.value,
      review: this.reviewRef.current.value,
    };
    postReview(film, reviewData);
    history.goBack();
  }
  render() {
    const {film, onSignInClick, authorizationStatus, authorizationInfo} = this.props;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={film.bg} alt={film.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className={`page-header ${authorizationStatus === AuthorizationStatus.NO_AUTH ? `user-page__head` : `movie-card__head`}}`}>
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{film.title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH ?
                <div className="user-block__avatar">
                  <img src={authorizationInfo.avatar} alt={`${authorizationInfo.name} avatar`} width="63" height="63" />
                </div>
                : <a
                  href="sign-in.html"
                  className="user-block__link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onSignInClick();
                  }}
                >Sign in</a>
              }
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={film.poster} alt={film.title} width="218" height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this._handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" ref={this.retingRef1} id="star-1" type="radio" name="rating" value="1"
                  onChange={()=>{}}
                />
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" ref={this.retingRef2} id="star-2" type="radio" name="rating" value="2"
                  onChange={()=>{}}
                />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" ref={this.retingRef3} id="star-3" type="radio" name="rating" value="3"
                  onChange={()=>{}}
                />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" ref={this.retingRef4} id="star-4" type="radio" name="rating" value="4"
                  onChange={()=>{}}
                />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" ref={this.retingRef5} id="star-5" type="radio" name="rating" value="5"
                  onChange={()=>{}}
                />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea ref={this.reviewRef} className="add-review__textarea" name="review-text" id="review-text"
                placeholder="Review text">
              </textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
  authorizationInfo: state.USER.authorizationInfo,
});
PageAddOverview.propTypes = {
  film: propTypes.object.isRequired,
  postReview: propTypes.func.isRequired,
  onSignInClick: propTypes.func.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  authorizationInfo: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(PageAddOverview);
