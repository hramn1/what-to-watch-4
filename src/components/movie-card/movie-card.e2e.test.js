import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';

const film = {
  id: 1,
  bg: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `The Grand Budapest Hotel`,
  genre: `Drame`,
  year: `2014`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  rating: `4.9`,
  votes: `468`,
  director: `Wes Anderson`,
  starring: [`Ralph Fiennes`, `F. Murray Abraham`, `Mathieu Amalric`],
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`MovieCard`, () => {
  it(`Should MovieCard hovered`, () => {
    const onMouseHover = jest.fn();

    const main = shallow(
        <MovieCard
          film = {film}
          title = {film.title}
          img = {film.poster}
          onMouseHover = {onMouseHover}
          onMovieCardClick = {()=>{}}
        />
    );

    const movieCard = main.find(`.small-movie-card`);
    movieCard.simulate(`mouseover`, film);
    expect(onMouseHover).toHaveBeenCalledWith(film.title);
  });
});
