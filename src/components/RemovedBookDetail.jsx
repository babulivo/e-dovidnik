import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../screens/home/Home.module.css'

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/books/${id}`)
            .then(response => response.json())
            .then(data => {
                setBook(data);
            })
            .catch(error => {
                console.error('Помилка при отриманні даних:', error);
            });
    }, [id]);

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className={styles.bookContainer}>
            <div className={styles.bookImage}>
                <img src={book.imageLink} alt={book.title} />
            </div>

            <div className={styles.bookInfo}>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.country}</p>
                <p>{book.language}</p>
                <p>{book.year}</p>
            </div>
        </div>
    );
}

export default BookDetail;
