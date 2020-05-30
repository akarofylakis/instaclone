import { createSelector } from 'reselect';

const selectFollow = (state) => state.follow;

export const selectUserFollows = createSelector([selectFollow], (follows) =>
  follows ? follows.following : []
);
