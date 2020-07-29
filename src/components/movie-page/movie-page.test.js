import React from 'react';
import renderer from 'react-test-renderer';
import FilmPage from './movie-page.jsx';

const cardFilm = {
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
const likeFilm = [
  {
    id: `1`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    bg: `img/bg-the-grand-budapest-hotel.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Crime`,
    year: `2014`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    rating: `4.9`,
    votes: `468`,
    time: `2h 10min`,
    director: `Wes Anderson`,
    starring: [`Ralph Fiennes`, `F. Murray Abraham`, `Mathieu Amalric`],
    reviews: [{
      id: `1`,
      author: `Kate Muir`,
      date: `December 24, 2016`,
      rating: `8,9`,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    }, {
      id: `2`,
      author: `Bill Goodykoontz`,
      date: `November 18, 2015`,
      rating: `8,0`,
      text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    }, {
      id: `3`,
      author: `Amanda Greever`,
      date: `November 18, 2015`,
      rating: `8,0`,
      text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    }, {
      id: `4`,
      author: `Matthew Lickona`,
      date: `December 20, 2016`,
      rating: `7,2`,
      text: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    }, {
      id: `5`,
      author: `Paula Fleri-Soler`,
      date: `December 20, 2016`,
      rating: `7,6`,
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    }],
  },
  {
    id: `2`,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    bg: `img/bg-the-grand-budapest-hotel.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Crime`,
    year: `2014`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    rating: `4.9`,
    votes: `468`,
    time: `2h 10min`,
    director: `Wes Anderson`,
    starring: [`Ralph Fiennes`, `F. Murray Abraham`, `Mathieu Amalric`],
    reviews: [{
      id: `1`,
      author: `Kate Muir`,
      date: `December 24, 2016`,
      rating: `8,9`,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    }, {
      id: `2`,
      author: `Bill Goodykoontz`,
      date: `November 18, 2015`,
      rating: `8,0`,
      text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    }, {
      id: `3`,
      author: `Amanda Greever`,
      date: `November 18, 2015`,
      rating: `8,0`,
      text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    }, {
      id: `4`,
      author: `Matthew Lickona`,
      date: `December 20, 2016`,
      rating: `7,2`,
      text: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    }, {
      id: `5`,
      author: `Paula Fleri-Soler`,
      date: `December 20, 2016`,
      rating: `7,6`,
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    }],
  },
];
const activeTab = `Overview`;

const onFilmCardClick = () =>{};
describe(`FilmPage`, () => {
  it(`Render FilmPage`, () => {
    const tree = renderer.create(
        <FilmPage
          cardFilms = {cardFilm}
          likeFilms = {likeFilm}
          activeTab = {activeTab}
          onTabClick = {()=>{}}
          onFilmCardClick = {onFilmCardClick}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
