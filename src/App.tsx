import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.scss';

const App: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeLetters, setIncludeLetters] = useState<boolean>(true);
  const [hashedPassword, setHashedPassword] = useState<string>('');
  const passwordRef = useRef<HTMLTextAreaElement>(null);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLetters) charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (charset === '') {
      setHashedPassword('');
      return;
    }
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    // Simple hash alternative
    const hashed = btoa(password); // Base64 encoding
    setHashedPassword(hashed);
  }, [passwordLength, includeNumbers, includeLetters]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Password Generator</h1>
        <div className="controls">
          <label htmlFor="password-length">
            Password Length: <span>{passwordLength}</span>
          </label>
          <input
            id="password-length"
            type="range"
            min="8"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLetters}
              onChange={(e) => setIncludeLetters(e.target.checked)}
            />
            Include Letters
          </label>
        </div>
        <div className="output">
          <textarea ref={passwordRef} value={hashedPassword} readOnly />
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default App;
