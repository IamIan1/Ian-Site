import React from 'react';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from './ContactForm';

function App() {
  const [isSent, setIsSent] = React.useState(false);

  const handleSent = () => {
    setIsSent(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, I am Ian Sabolik</h1>
        <p>Welcome to my personal website!</p>
        <nav>
          <ul>
            <li><a href="https://github.com/IamIan1"><FaGithub /></a></li>
            <li><a href="https://linkedin.com/in/Ian-Sabolik"><FaLinkedin /></a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>About Me</h2>
          <p>I'm a software engineer with a passion for creating beautiful and user-friendly applications. I have experience in React, Node.js, Express.js, and MySQL.</p>
        </section>
        <section>
          <h2>Contact Me</h2>
          {isSent ? <p>Thank you for your message!</p> : <ContactForm onSent={handleSent} />}
        </section>
      </main>
      <footer>
        <p>© Ian Sabolik 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
