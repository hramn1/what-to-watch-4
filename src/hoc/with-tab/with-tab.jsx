import React, {PureComponent} from 'react';

import FilmsTabs from '../../components/movie-tab/movie-tab.jsx';
const filmNavList = [`Overview`, `Details`, `Reviews`];

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: `Overview`,
      };

      this._handleTabClick = this._handleTabClick.bind(this);
    }



    _handleTabClick(currentTab) {
      this.setState({
        activeTab: currentTab
      });
    }

    render() {
      const {activeTab} = this.state;

      return <Component
        {...this.props}
        activeTab={activeTab}
        onTabClick={this._handleTabClick}
      />;
    }
  }

  return WithTabs;
};

export default withTabs;
