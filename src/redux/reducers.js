import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { actions } from "./actions";

const testContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "4591256" },
  { id: "id-2", name: "Hermione Kline", number: "4438912" },
  { id: "id-3", name: "Eden Clements", number: "6451779" },
  { id: "id-4", name: "Annie Copeland", number: "2279126" },
];

const items = createReducer(testContacts, {
  [actions.saveNewContact]: (state, { payload }) => [...state, payload],
  [actions.removeContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer("", {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items,
  filter,
});

export default contactsReducer;
