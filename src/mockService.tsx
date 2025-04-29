// mockService.ts
export interface ChatRoom {
    id: number;
    name: string;
    ownerUsername: string;
  }
  
  let chatRooms: ChatRoom[] = [];
  
  export const mockService = {
    getChatRooms: async () => {
      return [...chatRooms];
    },
  
    createChatRoom: async (room: ChatRoom) => {
      chatRooms.push(room);
      return room;
    },
  
    updateChatRoom: async (id: number, newName: string) => {
      chatRooms = chatRooms.map((room) =>
        room.id === id ? { ...room, name: newName } : room
      );
    },
  
    deleteChatRoom: async (id: number) => {
      chatRooms = chatRooms.filter((room) => room.id !== id);
    },
  };
  