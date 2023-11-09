import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditContactForm({ editedContact, setEditedContact, onSave, onCancel }) {
  const handleSave = () => {
    fetch(`http://localhost:3001/phone-directory/${editedContact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedContact),
    })
      .then(() => {
        onSave();
        onCancel();
        toast.success('Контакт успішно оновлено!', {
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
        console.error('Помилка при оновленні контакту:', error);
        toast.error('Помилка при оновленні контакту!', {
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
          value={editedContact['full name']}
          onChange={(e) => setEditedContact({ ...editedContact, 'full name': e.target.value })}
        />
        <input
          placeholder='Номер телефону'
          value={editedContact['phone number']}
          onChange={(e) => setEditedContact({ ...editedContact, 'phone number': e.target.value })}
        />
        <input
          placeholder='Адреса'
          value={editedContact.address}
          onChange={(e) => setEditedContact({ ...editedContact, address: e.target.value })}
        />
        <button type="button" onClick={handleSave}>Зберегти</button>
        <button type="button" onClick={onCancel}>Відміна</button>
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

export default EditContactForm;
