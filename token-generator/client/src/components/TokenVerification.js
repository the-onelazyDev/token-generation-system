import React, { useState, useEffect, useCallback } from 'react';
import { verifyToken } from '../service/api';
import { QrReader } from 'react-qr-reader';
import jsQR from 'jsqr';
import styles from './TokenVerification.module.css';

const TokenVerification = () => {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);
  const [useCamera, setUseCamera] = useState(true);

  const handleVerify = useCallback(async () => {
    try {
      const { valid, name, slot } = await verifyToken(token);
      setResult({ valid, name, slot });
    } catch (error) {
      console.error('Error verifying token:', error);
      setResult({ valid: false });
    }
  }, [token]);

  useEffect(() => {
    // Verify token whenever token state changes
    if (token) {
      handleVerify();
    }
  }, [token, handleVerify]);

  const handleScan = (scanData) => {
    if (scanData && scanData.text) {
      setToken(scanData.text);
      setUseCamera(false);
    }
  };

  const handleError = (error) => {
    console.error('QR code scanning error:', error);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageDataUrl = e.target.result;
        const img = new Image();
        img.src = imageDataUrl;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d');
          context.drawImage(img, 0, 0, img.width, img.height);
          const imageData = context.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, img.width, img.height);
          if (code) {
            setToken(code.data);
          } else {
            console.error('No QR code found in the image');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Token Verification</h1>
      <div className={styles.inputContainer}>
        {useCamera ? (
          <div className={styles.cameraContainer}>
            <QrReader
              onResult={handleScan}
              onError={handleError}
              constraints={{ facingMode: 'environment' }}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className={styles.inputFile}
          />
        )}
        <input
          type="text"
          placeholder="Enter token or scan QR code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={handleVerify} className={styles.button}>
            Verify
          </button>
          <button onClick={() => setUseCamera(!useCamera)} className={styles.button}>
            {useCamera ? 'Use File Upload' : 'Use Camera'}
          </button>
        </div>
      </div>
      {result && (
        <div className={`${styles.result} ${result.valid ? styles.valid : styles.invalid}`}>
          <p>Token is {result.valid ? 'valid' : 'invalid'}.</p>
          {result.valid && (
            <div>
              <p>Name: {result.name}</p>
              <p>Slot: {result.slot}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenVerification;
