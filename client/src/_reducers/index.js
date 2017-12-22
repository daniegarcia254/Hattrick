import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { communities, userCommunities } from './communities.reducer';
import { categories } from './categories.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  communities,
  categories,
  userCommunities,
  users,
  alert
});

export default rootReducer;