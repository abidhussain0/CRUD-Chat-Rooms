import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

interface Props {
  onCreate: (name: string) => void;
}

const ChatRoomForm: React.FC<Props> = ({ onCreate }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name);
      setName('');
    }
  };

  return (
    <Paper
      elevation={4}
      className="p-6 max-w-xl mx-auto mb-6 mt-4 animate-fade-in"
    >
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
        <TextField
          label="Chat Room Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full md:w-auto hover:scale-105 transform transition-transform duration-300"
        >
          Create Room
        </Button>
      </form>
    </Paper>
  );
};

export default ChatRoomForm;
