import React, { Component } from 'react';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
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
