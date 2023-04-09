import React from 'react';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function App() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name, 'Email:', email, 'Message:', message);
    setIsSent(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, I am Ian Sabolik</h1>
        <p>Welcome to my personal website!</p>
        <nav>
          <ul>
            <li><a href="https://github.com/janedoe"><FaGithub /></a></li>
            <li><a href="https://linkedin.com/in/janedoe"><FaLinkedin /></a></li>
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
          {isSent ? <p>Thank you for your message!</p> :
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Message:
              <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </label>
            <button type="submit">Send</button>
          </form>}
        </section>
      </main>
      <footer>
        <p>© Ian Sabolik 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
