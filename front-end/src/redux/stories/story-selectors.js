import { createSelector } from 'reselect';

const selectStory = (state) => state.story;

export const selectStories = createSelector([selectStory], (stories) =>
  stories ? stories.stories : null
);

export const selectStoriesIsFetching = createSelector(
  [selectStory],
  (stories) => stories.isFetching
);
