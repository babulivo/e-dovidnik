import React, { useState } from 'react';
import styles from '../screens/home/Home.module.css';
import EditContactForm from './EditContactForm';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
// import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function PhoneDirectory({ contactList, setContacts, setFilteredContacts }) {
function PhoneDirectory({ contactList, setContacts }) {
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({
    id: null,
    'full name': '',
    'phone number': '',
    address: '',
  });

  const contacts = contactList;
  // const navigate = useNavigate();

  //   const handleContactClick = (id) => {
  //     navigate(`/contact/${id}`);
  //   };

  const handleDeleteContact = (id) => {
    fetch(`http://localhost:3001/phone-directory/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
        // setFilteredContacts(updatedContacts);
        toast.success('Контакт успішно видалено!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(error => {
        console.error('Помилка при видаленні контакту:', error);
        toast.error('Помилка при видаленні контакту!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      });
  };

  if (contacts.length === 0) {
    return (
      <div className={styles.contact}>
        <h3>Здається, тут ще немає контактів ¯\_(ツ)_/¯</h3>
      </div>
    );
  }

  const handleEditContact = (contact) => {
    setEditingContactId(contact.id);
    setEditedContact({
      id: contact.id,
      'full name': contact['full name'],
      'phone number': contact['phone number'],
      address: contact.address,
    });
  };

  const handleSaveEdit = (contactId) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? editedContact : contact
    );
    setContacts(updatedContacts);
    setEditingContactId(null);
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
  };

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id} className={styles.contact}>
          <AiFillDelete className={styles.delete} onClick={() => handleDeleteContact(contact.id)}></AiFillDelete>
          <AiTwotoneEdit className={styles.edit} onClick={() => handleEditContact(contact)}></AiTwotoneEdit>
          {editingContactId === contact.id ? (
            // Форма редагування
            <EditContactForm
              editedContact={editedContact}
              setEditedContact={setEditedContact}
              onSave={() => handleSaveEdit(contact.id)}
              onCancel={() => handleCancelEdit()}
            />
          ) : (
            // Відображення контакту
            <div>
              <h2 style={{ marginBottom: '5px' }}>{contact['full name']}</h2>
              <h3 style={{ marginBottom: '5px' }}>{contact['phone number']}</h3>
              <p>{contact['address']}</p>
              {/* <button onClick={() => handleContactClick(contact.id)}>Read more</button> */}
            </div>
          )}
        </div>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default PhoneDirectory;
