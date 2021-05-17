import { connect } from "react-redux";
import { actions } from "../../redux/actions";
import Contact from "../Contact";
import PropTypes from "prop-types";
import { itemList } from "./ContactList.module.css";

const ContactList = (props) => {
  const { contactList, onDelete } = props;
  return (
    <ul className={itemList}>
      {contactList.map((item) => {
        return <Contact item={item} key={item.id} onDelete={onDelete} />;
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
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
    contactList: getFilteredContacts(items, filter),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (contactId) => dispatch(actions.removeContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
