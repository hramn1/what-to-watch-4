// import React, {PureComponent} from 'react';
// import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
// import {CustomPropTypes} from '../custom-prop-types.js';
// import FilmList from "../film-list/film-list.jsx";
//
// import {Pages} from '../../const.js';
// import {Operations as DataOperations} from '../../reducer/data/data.js';
// import {ActionCreator} from '../../reducer/show-films/show-films.js';
//
//
// class MyList extends PureComponent {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const {films, authorizationInfo} = this.props;
//
//
//     return (<React.Fragment>
//       <div className="user-page">
//         <header className="page-header user-page__head">
//           <div className="logo">
//             <Link to={Pages.MAIN} className="logo__link">
//               <span className="logo__letter logo__letter--1">W</span>
//               <span className="logo__letter logo__letter--2">T</span>
//               <span className="logo__letter logo__letter--3">W</span>
//             </Link>
//           </div>
//
//           <h1 className="page-title user-page__title">My list</h1>
//
//           <div className="user-block">
//             <div className="user-block__avatar">
//               <Link to={Pages.MAIN}>
//                 <img src={authorizationInfo.avatar} alt={authorizationInfo.name} width="63" height="63" />
//               </Link>
//             </div>
//           </div>
//         </header>
//
//         <section className="catalog">
//           <h2 className="catalog__title visually-hidden">Catalog</h2>
//
//           <FilmList
//             films = {films}
//           />
//           }
//         </section>
//
//         <Footer />
//       </div>
//     </React.Fragment>);
//   }
// }
//
// MyList.propTypes = {
//   favoriteFilms: PropTypes.arrayOf(CustomPropTypes.FILM),
//   handleFilmChoose: PropTypes.func.isRequired,
//   loadingFavoriteFilm: PropTypes.shape({
//     favoriteFilmIsLoading: PropTypes.bool.isRequired,
//     loadingIsError: PropTypes.bool.isRequired,
//   }),
//   loadFavoriteFilms: PropTypes.func.isRequired,
//   user: CustomPropTypes.USER,
// };
// const mapStateToProps = (state) => ({
//   films: state.DATA.films,
//   authorizationStatus: state.USER.authorizationStatus,
//   authorizationInfo: state.USER.authorizationInfo,
//
// });
//
//
// export default connect(mapStateToProps)(MyList);
