import { connect } from "react-redux";
import "./App.css";
import { actions } from "./redux/actions";
import Form from "./components/Form";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import PropTypes from "prop-types";

const App = ({ contacts, addContact, onDelete, changeFilter }) => {
  const saveNewContact = (e, name, number) => {
    e.preventDefault();
    contacts.some((item) => item.name === name)
      ? alert(`${name} is already in contacts`)
      : addContact(name, number);

    e.currentTarget.reset();
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Form onSubmit={saveNewContact} />
      <h2>Contacts</h2>
      <Filter onInput={changeFilter} />
      <ContactList contactList={contacts} onDelete={onDelete} />
    </div>
  );
};

const getFilteredContacts = (items, filter) => {
  if (!filter) return items;
  const normalizedFilter = filter.toLowerCase().trim();
  return isNaN(normalizedFilter)
    ? items.filter((item) => item.name.toLowerCase().includes(normalizedFilter))
    : items.filter((item) => item.number.includes(normalizedFilter));
};

const mapStateToProps = ({ items, filter }) => {
  return {
    contacts: getFilteredContacts(items, filter),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addContact: (name, number) => dispatch(actions.saveNewContact(name, number)),
  onDelete: (contactId) => dispatch(actions.removeContact(contactId)),
  changeFilter: (value) => dispatch(actions.changeFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
  addContact: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
