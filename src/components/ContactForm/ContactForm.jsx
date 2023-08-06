import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';

export const ContactForm =({onSubmit})=> {
  const [name, setName]=useState('');
  const [number, setNumber]=useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch(name){
      case 'name':
        setName(value);
        break;
        case'number':
        setNumber(value);
        break;

        default:
          return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(name,number);
    reset();
  };

 const reset = () => {
    setName('');
    setNumber('')
  };
  const nameId = nanoid();
  const numberId=nanoid();

    return (
      <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor={nameId} className={css.label}>Name</label>
        <input
          type="text"
          className={css.input}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          id={nameId}
          onChange={handleChange}
        />
        <label htmlFor={numberId} className={css.label}>Number</label>
        <input
          type="tel"
          className={css.input}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          id={numberId}
          onChange={handleChange}
        />
        <button type="submit" className={css.btn}>Add contact</button>
      </form>
    );
  }
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
  };