import Header from '../../components/Header.jsx';
import PhoneDirectory from '../../components/PhoneDirectory.jsx';
import AddContact from '../../components/AddContact.jsx';
import Search from '../../components/Search.jsx';
import { useState, useEffect } from 'react';

function Home() {
  const [contacts, setContacts] = useState([]);
  // const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/phone-directory')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
      })
      .catch(error => {
        console.error('Помилка при отриманні даних:', error);
      });
  }, []);

  const handleSearch = (searchText) => {
    const searchWords = searchText.toLowerCase().split(' ');
  
    const filtered = contacts.filter((contact) => {
      const fullName = contact['full name'].toLowerCase();
      const address = contact.address.toLowerCase();
      const phoneNumber = contact['phone number'].toLowerCase();
  
      const nameWords = fullName.split(/\s+/); // Розділяти за пробілами
      const addressComponents = address.split(' ').map((component) => component.trim()); // Розділяти компоненти адреси за комами
  
      const isMatchedName = searchWords.every((searchWord) => {
        return nameWords.some((word) => word.startsWith(searchWord));
      });
  
      // Перевірка для кожного компонента адреси окремо
      const isMatchedAddress = searchWords.some((searchWord) => {
        return addressComponents.some((component) => component.startsWith(searchWord));
      });
  
      return isMatchedName || isMatchedAddress || phoneNumber.startsWith(searchText.toLowerCase());
    });
  
    // setFilteredContacts(filtered);
    setContacts(filtered);
  };
  
  return (
    <div>
      <Header title='єДовідник'></Header>
      <main>
        {/* <PhoneDirectory contactList={filteredContacts.length > 0 ? filteredContacts : contacts} setContacts={setContacts} setFilteredContacts={setFilteredContacts}></PhoneDirectory> */}
        <PhoneDirectory contactList={contacts} setContacts={setContacts}></PhoneDirectory>
      </main>
      <aside>
        <Search onSearch={handleSearch} />
        <AddContact setContacts={setContacts}></AddContact>
        {/* <AddContact setContacts={setContacts} setFilteredContacts={setFilteredContacts}></AddContact> */}
      </aside>
    </div>
  )
}

export default Home;
