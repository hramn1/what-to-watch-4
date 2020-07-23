import React from 'react';
import PropTypes from 'prop-types';

const MovieTabs = (prop) => {
  const {tabs, currentTab, onTabClick} = prop;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((tab) => (
          <li key={tab}
            className={currentTab === tab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}
            onClick={(evt) => {
              evt.preventDefault();
              onTabClick(tab);
            }}>
            <a href="#" className="movie-nav__link">{tab}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MovieTabs;

MovieTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
