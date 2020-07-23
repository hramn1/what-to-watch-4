import React from 'react';
import PropTypes from 'prop-types';

const MovieTabs = (prop) => {
  const {tabs} = prop;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((tab) => (
          <li key={tab}
              className={`movie-nav__item`}
              onClick={(evt) => {
                evt.preventDefault();
              }}
          >
            <a href="#" className="movie-nav__link">{tab}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MovieTabs;

MovieTabs.propTypes = {
  tabs: PropTypes.objectOf(PropTypes.string).isRequired,
};
