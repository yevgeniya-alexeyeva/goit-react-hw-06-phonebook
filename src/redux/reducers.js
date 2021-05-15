import types from "./types";
import { combineReducers } from "redux";

const testContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "4591256" },
  { id: "id-2", name: "Hermione Kline", number: "4438912" },
  { id: "id-3", name: "Eden Clements", number: "6451779" },
  { id: "id-4", name: "Annie Copeland", number: "2279126" },
];

const items = (state = testContacts, { type, payload }) => {
  switch (type) {
    case types.ADD_CONTACT:
      return [...state, payload];

    case types.REMOVE_CONTACT:
      return state.filter(({ id }) => id !== payload);
    default:
      return state;
  }
};

const filter = (state = "", { type, payload }) => {
  switch (type) {
    case types.CHANGE_FILTER:
      return payload;
    default:
      return state;
  }
};

const contactsReducer = combineReducers({
  items,
  filter,
});

export default contactsReducer;
