import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

const ReviewLength = {
  MIN: 50,
  MAX: 400,
};
const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitDisabled: true,
        ratingFlag: false,
        commentFlag: false,
        error: ``,
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleSubmitClick = this._handleSubmitClick.bind(this);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value,
        ratingFlag: true,
        isSubmitDisabled: (this.state.ratingFlag && this.state.commentFlag) ? false : true
      });
    }

    _handleReviewChange(evt) {
      this.setState({
        comment: evt.target.value,
        commentFlag: true,
        isSubmitDisabled: (this.state.ratingFlag && this.state.commentFlag) ? false : true
      });
    }

    _handleSubmitClick(evt) {
      const {film, postReview} = this.props;
      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      postReview(review, film);
    }

    render() {
      return (
        <Component
          {...this.props}
          reviewLength={ReviewLength}
          onSubmitClick={this._handleSubmitClick}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }
  }

  WithReview.propTypes = {
    film: propTypes.object.isRequired,
    postReview: propTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;
