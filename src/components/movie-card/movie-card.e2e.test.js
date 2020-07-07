import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';

const film = {
  id: `1`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`MovieCard`, () => {
  it(`Should MovieCard hovered`, () => {
    const onCardClick = jest.fn();

    const main = shallow(
        <MovieCard
          title = {film.title}
          img = {film.poster}
          onCardClick = {onCardClick}
        />
    );

    const movieCard = main.find(`.small-movie-card`);
    movieCard.simulate(`mouseover`, film);
    expect(onCardClick).toHaveBeenCalledWith(film.title);
  });
});
