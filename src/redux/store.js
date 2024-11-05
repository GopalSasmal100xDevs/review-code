import { configureStore } from "@reduxjs/toolkit";

import CounterReducer from "./reducers/counter";
import UsersReducer from "./reducers/users";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    users: UsersReducer,
  },
});
