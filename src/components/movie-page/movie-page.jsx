import React, {PureComponent} from 'react';
import propTypes from "prop-types";
import FilmsTabs from "../movie-tab/movie-tab.jsx";
import PageOverview from "../page-overview/page-overview.jsx";
import PageDetails from "../page-details/page-details.jsx";
import PageReviews from "../page-reviews/page-reviews.jsx";
import FilmList from "../movie-list/movie-list.jsx";


const filmNavList = [`Overview`, `Details`, `Reviews`];

class FilmPage extends PureComponent {
  constructor(props) {
    super(props);

  }

  _renderCurrentTab(currentTab) {
    const {cardFilms,reviews} = this.props;
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
    const {cardFilms, likeFilms, activeTab,
      onTabClick, onFilmCardClick, onPlayClick} = this.props;
    return (<React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={cardFilms.bg} alt={cardFilms.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
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
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => onPlayClick(cardFilms)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
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

FilmPage.propTypes = {
  cardFilms: propTypes.object.isRequired,
  likeFilms: propTypes.arrayOf(propTypes.object).isRequired,
  onFilmCardClick: propTypes.func.isRequired,
  activeTab: propTypes.string.isRequired,
  onTabClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
};
export default FilmPage;
