import React, { useState } from 'react';
import { generateTokens } from '../service/api';
import styles from './TokenGeneration.module.css';

const TokenGeneration = () => {
  const [name, setName] = useState('');
  const [slot, setSlot] = useState('');
  const [count, setCount] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { tokens } = await generateTokens(name, slot, count);
      setTokens(tokens);
      setError('');
    } catch (error) {
      setError(error.response.data.error);
      setTokens([]);
    }
  };

  const handleDownload = (token) => {
    const link = document.createElement('a');
    link.href = token.qrCode;
    link.download = `${token.value}.png`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Token Generation</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="slot" className={styles.label}>Slot:</label>
          <select
            id="slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Select a slot</option>
            <option value="slot1">Slot 1</option>
            <option value="slot2">Slot 2</option>
            <option value="slot3">Slot 3</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="count" className={styles.label}>Count:</label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Generate Tokens
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {tokens.length > 0 && (
        <div className={styles.tokens}>
          <h2>Generated Tokens</h2>
          {tokens.map((token, index) => (
            <div key={index} className={styles.token}>
              <p>Token: {token.value}</p>
              <img src={token.qrCode} alt="QR Code" className={styles.qrCode} />
              <button onClick={() => handleDownload(token)} className={styles.downloadButton}>
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenGeneration;
