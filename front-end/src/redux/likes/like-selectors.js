import { createSelector } from 'reselect';

const selectLike = (state) => state.like;

export const selectUserLikes = createSelector([selectLike], (likes) =>
  likes ? likes.userLikes : null
);
