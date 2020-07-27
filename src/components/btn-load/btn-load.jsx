import React from 'react';
import PropTypes from 'prop-types';

const BtnLoad = (props) => {
  const {onShowMoreClick} = props;
  return (<React.Fragment>
    <div className="catalog__more">
      <button className="catalog__button" type="button"
              onClick={(evt) => {
                evt.preventDefault();
                onShowMoreClick();
              }}
      >Show more</button>
    </div>

  </React.Fragment>);
};

BtnLoad.propTypes = {
  onShowMoreClick: PropTypes.func.isRequired,
};
export default BtnLoad;
