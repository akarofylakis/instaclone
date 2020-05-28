import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectSearchResults = createSelector(
  [selectUser],
  (user) => user.searchResults
);

export const selectSearchIsFetching = createSelector(
  [selectUser],
  (user) => user.isFetching
);
