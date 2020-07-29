import React from "react";
import renderer from "react-test-renderer";
import FilmCard from './movie-card.jsx';

const films = [
  {
    id: `1`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: `2`,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
  },
  {
    id: `3`,
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
  },
  {
    id: `4`,
    title: `Aviator`,
    poster: `img/aviator.jpg`,
  },
  {
    id: `5`,
    title: `We need to talk about Kevin`,
    poster: `img/we-need-to-talk-about-kevin.jpg`,
  },
  {
    id: `6`,
    title: `Snatch`,
    poster: `img/snatch.jpg`,
  },
  {
    id: `7`,
    title: `Revenant`,
    poster: `img/revenant.jpg`,
  },
  {
    id: `8`,
    title: `Johnny English`,
    poster: `img/johnny-english.jpg`,
  },
];
const isPlaying = true;
const muted = `muted`;
for (let item of films) {
  it(`FilmCard rendering`, () => {
    const tree = renderer
  .create(<FilmCard
    film = {item}
    title = {item.title}
    img = {item.poster}
    isPlaying = {isPlaying}
    muted = {muted}
    onMouseHover = {() =>{}}
    onFilmCardClick = {()=>{}}
    onIsPlayingChange = {()=>{}}
  />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
}
