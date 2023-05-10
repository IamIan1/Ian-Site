import React, { useState } from 'react';
import axios from 'axios';

const validateEmail = (email) => {
  // Email validation regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ContactForm = ({ onSent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setStatus('Please enter a valid email address');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/contact', {
        name,
        email,
        message
      });

      setStatus('Message sent');
      setName('');
      setEmail('');
      setMessage('');

      if (typeof onSent === 'function') {
        onSent();
      }
    } catch (error) {
      console.error(error);
      setStatus('Error: message not sent');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
};

export default ContactForm;