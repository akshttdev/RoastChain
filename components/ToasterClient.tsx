'use client';
import { Toaster } from 'react-hot-toast';

const toastOptions = {
  style: {
    borderRadius: '0',
    background: '#fff',
    color: '#000',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    border: '2px solid #000',
  },
};

export function ToasterClient() {
  return <Toaster position="bottom-right" toastOptions={toastOptions} />;
}
