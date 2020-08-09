import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import FilmList from "../film-list/film-list.jsx";
import {Pages} from '../../const.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';


class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {loadFavoriteMovies} = this.props;
    loadFavoriteMovies();
  }
  render() {
    const {films, authorizationInfo, onFilmCardClick} = this.props;

    return (<React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={Pages.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <Link to={Pages.MAIN}>
                <img src={authorizationInfo.avatar} alt={authorizationInfo.name} width="63" height="63" />
              </Link>
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <FilmList
            films = {films}
            onFilmCardClick = {onFilmCardClick}

          />
          <footer className="page-footer">
            <div className="logo">
              <Link to={Pages.MAIN} className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </section>
      </div>
    </React.Fragment>);
  }
}

MyList.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  authorizationStatus: propTypes.string.isRequired,
  authorizationInfo: propTypes.object.isRequired,
  loadFavoriteMovies: propTypes.func.isRequired,
  onFilmCardClick: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  films: state.DATA.favoriteFilms,
  authorizationStatus: state.USER.authorizationStatus,
  authorizationInfo: state.USER.authorizationInfo,

});
const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(DataOperations.loadFavoriteMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
