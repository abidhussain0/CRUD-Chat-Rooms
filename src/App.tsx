import React from 'react';
import ChatRoomList from './components/ChatRoomList';

const App = () => {
  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>HTMX Chat Rooms</h1>
      <ChatRoomList />
    </div>
  );
};

export default App;
