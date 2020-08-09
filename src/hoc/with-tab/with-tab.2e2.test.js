import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withTabs from './with-tab.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = ({onTabClick}) => {
  return (
    <div>
      <a onClick={onTabClick}>tab</a>
    </div>
  );
};

MockComponent.propTypes = {
  onTabClick: PropTypes.func.isRequired,
};

it(`Should change activeTab onClick`, () => {
  const MockComponentWrapped = withTabs(MockComponent);
  const onTabClick = jest.fn();

  const wrapper = mount(
      <MockComponentWrapped
        onTabClick={onTabClick}
      />
  );

  expect(wrapper.state().activeTab).toBe(`Overview`);
  wrapper.instance()._handleTabClick(`Reviews`);
  expect(wrapper.state().activeTab).toBe(`Reviews`);
});
