import css from './ContactList.module.css';
import PropTypes from "prop-types";
import { ContactItem } from 'components/ContactItem/ContactItem';

export const ContactList = ({contacts, onDelete})=>{
    
      return(
        <ul className={css.list}>
            {contacts.map(({name, number,id})=>{
              return(<ContactItem name={name} number={number} id={id} onDelete={onDelete} key={id}/>)  
    })}
        </ul>
      )
    }
    ContactList.propTypes = {
      contacts: PropTypes.array.isRequired,
      onDelete: PropTypes.func.isRequired,  
      };
  
