import shortid from "shortid";
import types from "./types";

const saveNewContact = (name, number) => ({
  type: types.ADD_CONTACT,
  payload: {
    id: shortid.generate(),
    name: name,
    number: number,
  },
});

const removeContact = (contactId) => ({
  type: types.REMOVE_CONTACT,
  payload: contactId,
});

const changeFilter = (value) => ({
  type: types.CHANGE_FILTER,
  payload: value,
});

export const actions = { saveNewContact, removeContact, changeFilter };
