import { createSelector } from 'reselect';

const selectComment = (state) => state.comment;

export const selectPostComments = createSelector(
  [selectComment],
  (comment) => comment.postComments
);

export const selectCurrentComment = createSelector(
  [selectComment],
  (comment) => comment.comment
);
