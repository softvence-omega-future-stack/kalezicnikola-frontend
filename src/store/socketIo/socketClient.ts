

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://backend.docline.ai";

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Manual connection control
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling'], // Try polling if websocket fails
  path: '/socket.io/', // Adjust if backend uses different path
  withCredentials: true, // If backend requires credentials
});

// User login korle ei function call korben
// export const connectSocket = (userId) => {
//   socket.auth = { userId }; // Backend-ke userId pathano
//   socket.connect();
// };

// Debug logging
socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Socket disconnected');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});