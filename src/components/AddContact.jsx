import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function AddContact({ setContacts, setFilteredContacts }) {
function AddContact({ setContacts }) {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const createContact = () => {
    fetch('http://localhost:3001/phone-directory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'full name': fullName, 'phone number': phoneNumber, address }),
    })
      .then(response => response.json())
      .then(newContact => {
        setContacts(prevContacts => [...prevContacts, newContact]);
        // setFilteredContacts(prevContacts => [...prevContacts, newContact]);
        setFullName('');
        setPhoneNumber('');
        setAddress('');

        toast.success('Контакт успішно додано!', {
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
        console.error('Помилка при створенні контакту:', error);
        toast.error('Помилка при створенні контакту!', {
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
  }

  return (
    <div>
      <form>
        <input
          placeholder='П.І.Б.'
          onChange={e => setFullName(e.target.value)}
          value={fullName}
        />
        <input
          placeholder='Номер телефону'
          onChange={e => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <input
          placeholder='Адреса'
          onChange={e => setAddress(e.target.value)}
          value={address}
        />
        <button type='button' onClick={createContact}>Додати</button>
      </form>
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

export default AddContact;
