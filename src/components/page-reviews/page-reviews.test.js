import React from "react";
import renderer from "react-test-renderer";
import PageReviews from './page-reviews.jsx';

const reviews = [{
  id: `1`,
  user: {},
  date: `December 24, 2016`,
  rating: `8,9`,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
}, {
  id: `2`,
  user: {},
  date: `November 18, 2015`,
  rating: `8,0`,
  comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
}, {
  id: `3`,
  author: `Amanda Greever`,
  user: {},
  rating: `8,0`,
  comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
}, {
  id: `4`,
  user: {},
  date: `December 20, 2016`,
  rating: `7,2`,
  comment: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
}, {
  id: `5`,
  user: {},
  date: `December 20, 2016`,
  rating: `7,6`,
  comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
}];

describe(`PageReviews`, () => {
  it(`Render PageReviews`, () => {
    const tree = renderer.create(
        <PageReviews
          reviews = {reviews}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
