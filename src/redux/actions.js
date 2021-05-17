import { createAction } from "@reduxjs/toolkit";
import shortid from "shortid";

const saveNewContact = createAction("addContact", (name, number) => ({
  payload: {
    id: shortid.generate(),
    name: name,
    number: number,
  },
}));

const removeContact = createAction("removeContact");

const changeFilter = createAction("changeFilter");

export const actions = { saveNewContact, removeContact, changeFilter };
