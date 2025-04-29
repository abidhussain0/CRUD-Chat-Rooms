import React, { useState } from 'react';
import { ChatRoom } from '../mockService';
import { Card, CardContent, Typography, Button, TextField, Stack, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login'; // for "Join" button icon

interface Props {
  room: ChatRoom;
  currentUsername: string;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const ChatRoomItem: React.FC<Props> = ({ room, currentUsername, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(room.name);

  // Handle the update of the room name
  const handleUpdate = () => {
    if (newName.trim()) {
      onUpdate(room.id, newName.trim());
      setEditing(false);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        p: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        {editing ? (
          // Displaying edit mode
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              size="small"
              fullWidth
              label="Edit Room Name"
            />
            {/* Tooltip for Save icon */}
            <Tooltip title="Save">
              <IconButton color="primary" onClick={handleUpdate}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
            {/* Tooltip for Cancel icon */}
            <Tooltip title="Cancel">
              <IconButton color="secondary" onClick={() => setEditing(false)}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          // Displaying normal view when not editing
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {room.name}{' '}
              {room.ownerUsername === currentUsername && (
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  (You)
                </Typography>
              )}
            </Typography>
            <Stack direction="row" spacing={1}>
              {/* Tooltip for Join Room button */}
              <Tooltip title="Join Room">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LoginIcon />}
                  onClick={() => alert(`Joined room: ${room.name}`)}
                >
                  Join
                </Button>
              </Tooltip>
              {/* Only show edit and delete for room owner */}
              {room.ownerUsername === currentUsername && (
                <>
                  <Tooltip title="Edit Room">
                    <IconButton color="primary" onClick={() => setEditing(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Room">
                    <IconButton color="error" onClick={() => onDelete(room.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatRoomItem;
