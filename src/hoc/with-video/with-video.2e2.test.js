import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withVideo from './with-video.jsx';


Enzyme.configure({
  adapter: new Adapter(),
});
const MockComponent = () => {
  return (
    <article>
    </article>
  );
};
describe(`FilmCard`, () => {
  it(`Should return correct state isPlayng`, () => {
    const MockComponentWrapped = withVideo(MockComponent);
    const main = shallow(
        <MockComponentWrapped
        />
    );

    main.instance()._handleIsPlayingChange(true);
    expect(main.state().isPlaying).toEqual(true);
  });
});
