import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsList = JSON.parse(localStorage.getItem('contacts'));
    if (contactsList) {
      setContacts(contactsList);
    }
  }, []);

  useEffect(() => { 
        localStorage.setItem('contacts', JSON.stringify(contacts));
    },
    [contacts]
  );

  const formSubmitHandler = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(prevState=>
        [...prevState, newContact]
      );
  };

  const filterHandler = evt => {
    const { value } = evt.target;
    setFilter(value);
  };
  const filterContacts = () => {
   const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = evt => {
    const { id } = evt.target;
    setContacts(contacts.filter(contact => contact.id !== id),
    );
  };

  const filteredContacts = filterContacts();
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2 className={css.subTitle}>Contacts</h2>
      <Filter value={filter} onChange={filterHandler} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};
