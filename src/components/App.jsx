import React, { Component } from 'react';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.some(
      i =>
        i.name.toLowerCase() === contact.name.toLowerCase() ||
        i.number === contact.number
    )
      ? Notify.failure(`${name} is already in phonebook.`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  changeFilterInput = e => {
    this.setState({ filter: e.target.value });
  };

  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    const contactName = this.state.contacts.find(
      contact => contact.id === id
    ).name;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    Notify.warning(`${contactName} delete from phonebook.`);
  };

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <ContactForm onSubmit={this.formSubmit} title="Phonebook" />
        <Filter
          filter={filter}
          changeFilterInput={this.changeFilterInput}
          title="Contacts"
        />
        <ContactList
          contacts={this.findContacts()}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
