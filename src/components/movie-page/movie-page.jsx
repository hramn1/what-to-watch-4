import React, {PureComponent} from 'react';
import propTypes from "prop-types";
import FilmsTabs from "../movie-tab/movie-tab.jsx";
import PageOverview from "../page-overview/page-overview.jsx";
import PageDetails from "../page-details/page-details.jsx";
import PageReviews from "../page-reviews/page-reviews.jsx";
import FilmList from "../movie-list/movie-list.jsx";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Pages} from "../../const";

const filmNavList = [`Overview`, `Details`, `Reviews`];

class FilmPage extends PureComponent {
  constructor(props) {
    super(props);

  }

  _renderCurrentTab(currentTab) {
    const {cardFilms, reviews} = this.props;
    switch (currentTab) {
      case filmNavList[0]:
        return (
          <PageOverview
            cardFilms={cardFilms}
          />
        );
      case filmNavList[1]:
        return (
          <PageDetails
            cardFilms={cardFilms}
          />
        );
      case filmNavList[2]:
        return (
          <PageReviews
            reviews={reviews}
          />
        );
      default: throw new Error(`Can't handle tab type ` + currentTab);
    }
  }
  render() {
    const {activeTab, cardFilms, likeFilms,
      onTabClick, onFilmCardClick, handleFilmFavorite, authorizationStatus, authorizationInfo} = this.props;
    const isInMyLyst = cardFilms.isFavorite ?
      <React.Fragment>
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      </React.Fragment> :
      <React.Fragment>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      </React.Fragment>;
    return (<React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={cardFilms.bg} alt={cardFilms.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={Pages.MAIN} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH ?
                <div className="user-block__avatar">
                  <img src={authorizationInfo.avatar} alt={`${authorizationInfo.name} avatar`} width="63" height="63" />
                </div>
                : <Link
                  to={Pages.LOGIN}
                  className="user-block__link">
                  Sign in
                </Link>
              }
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{cardFilms.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{cardFilms.genre}</span>
                <span className="movie-card__year">{cardFilms.year}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`${Pages.PLAYER}/${cardFilms.id}`} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <button className="btn btn--list movie-card__button" type="button"
                    onClick={() => handleFilmFavorite(cardFilms)}>
                    {isInMyLyst}
                    <span>My list</span>
                  </button> :
                  <Link to={Pages.LOGIN} className="btn btn--list movie-card__button" type="button"> {isInMyLyst} <span>My list</span> </Link>}
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <Link to={`${Pages.FILM}/${cardFilms.id}/review`} className="btn btn--review movie-card__button">Add review</Link> : <Link
                    to={Pages.LOGIN}
                    className="btn btn--review movie-card__button">
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={cardFilms.poster} alt={cardFilms.title} width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <FilmsTabs
                tabs={filmNavList}
                currentTab={activeTab}
                onTabClick = {onTabClick}
              />
              {this._renderCurrentTab(activeTab)}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList
            films={likeFilms}
            onFilmCardClick={onFilmCardClick}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>);
  }
}
const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
  authorizationInfo: state.USER.authorizationInfo,
});
FilmPage.propTypes = {
  cardFilms: propTypes.object.isRequired,
  likeFilms: propTypes.arrayOf(propTypes.object).isRequired,
  onFilmCardClick: propTypes.func.isRequired,
  activeTab: propTypes.string.isRequired,
  onTabClick: propTypes.func.isRequired,
  handleFilmFavorite: propTypes.func.isRequired,
  reviews: propTypes.array.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  authorizationInfo: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(FilmPage);
