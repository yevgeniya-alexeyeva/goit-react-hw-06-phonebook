import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../redux/actions";
import { form, label, input, button } from "./Form.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };
  getContactData = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  saveNewContact = (e, name, number) => {
    const { contacts, addContact } = this.props;

    e.preventDefault();
    contacts.some((item) => item.name === name)
      ? alert(`${name} is already in contacts`)
      : addContact(name, number);

    e.currentTarget.reset();
  };

  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  render() {
    return (
      <form
        className={form}
        onSubmit={(e) =>
          this.saveNewContact(e, this.state.name, this.state.number)
        }
      >
        <label className={label}>
          Name
          <input
            className={input}
            onInput={this.getContactData}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={label}>
          Number
          <input
            className={input}
            onInput={this.getContactData}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>

        <button className={button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ items }) => ({
  contacts: items,
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (name, number) => dispatch(actions.saveNewContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
