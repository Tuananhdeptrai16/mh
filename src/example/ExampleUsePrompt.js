import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { usePrompt } from '../components/hooks/usePrompt';

const ExampleUsePrompt = () => {
  const [formData, setFormData] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  
  // Enable the prompt if changes are unsaved
  usePrompt({
    title: 'Leave this page?',
    message: 'You have unsaved changes. Are you sure you want to leave?',
    when: !isSaved,
    onContinue: () => console.log('Navigation canceled!'),
  });

  const handleSave = () => {
    localStorage.setItem('myData', formData); 
    setIsSaved(true);
    console.log('Data saved!');
  };

  return (
    <div>
      <h2>My Form</h2>
      <Input
        value={formData}
        onChange={(e) => {
          setFormData(e.target.value);
          setIsSaved(false); // Mark changes as unsaved
        }}
        placeholder="Type something here..."
      />
      <Button type="primary" onClick={handleSave} style={{ marginTop: 10 }}>
        Save
      </Button>
    </div>
  );
};

export default ExampleUsePrompt;
