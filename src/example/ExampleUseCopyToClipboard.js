import React from 'react'
import { useCopyToClipboard } from '../components/hooks/useCopyToClipboard';
export const ExampleUseCopyToClipboard = () => {
    const { copiedText, copyToClipboard, isCopied } = useCopyToClipboard();
    const handleCopy = () => {
        copyToClipboard('Hello, world!');
      };
  return (
    <>
      <button onClick={handleCopy}>
        {isCopied ? 'Copied!' : 'Copy Text'}
      </button>
      {copiedText && <p>Copied: {copiedText}</p>}
      </>
  )
}
