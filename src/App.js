import './App.css';
import { Component } from 'react';
import Form from './components/Forms/Form';
import UserList from './components/UserList/UsersList';
import Section from './components/Section/Section';
import Filter from './components/Forms/Filter';
import users from './phonebook.json';

class App extends Component {
  state = {
    contacts: users,
    filter: '',
  };

  addContactToList = newContact => {
    const newContactName = newContact.name.toLowerCase();
    const doubleContact = this.state.contacts.find(contact => {
      return contact.name.toLowerCase() === newContactName;
    });
    if (doubleContact) {
      alert(`${newContact.name} is already in contact`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterContacts = e => {
    const filterValue = e.target.value;
    this.setState({ filter: filterValue });
  };

  handlerDeleteUser = ({ target }) => {
    const deleteItemId = target.id;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== deleteItemId,
      ),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const { addContactToList, handleFilterContacts, handlerDeleteUser } = this;
    const normalizedName = filter.toLowerCase();
    const contactForRender = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedName),
    );
    return (
      <div className="App">
        <h1 className="title">Phonebook</h1>
        <Section>
          <Form addContact={addContactToList} />
        </Section>
        <Section title="Contacts">
          <Filter filter={filter} handleFilter={handleFilterContacts} />
          <UserList users={contactForRender} onClick={handlerDeleteUser} />
        </Section>
      </div>
    );
  }
}

export default App;
