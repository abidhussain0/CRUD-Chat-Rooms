import React, { useEffect, useState } from 'react';
import { mockService, ChatRoom } from '../mockService';
import ChatRoomForm from './ChatRoomForm';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomList = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const currentUsername = 'john'; // Mock logged-in user

  const loadRooms = async () => {
    const data = await mockService.getChatRooms();
    setRooms(data);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleCreate = async (name: string) => {
    await mockService.createChatRoom({ id: Date.now(), name, ownerUsername: currentUsername });
    await loadRooms();
  };

  const handleUpdate = async (id: number, newName: string) => {
    await mockService.updateChatRoom(id, newName);
    await loadRooms();
  };

  const handleDelete = async (id: number) => {
    await mockService.deleteChatRoom(id);
    await loadRooms();
  };

  return (
    <div>
      <ChatRoomForm onCreate={handleCreate} />
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.id}
          room={room}
          currentUsername={currentUsername}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ChatRoomList;
