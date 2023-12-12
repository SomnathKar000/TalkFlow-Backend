import WebSocket from "ws";
import { ChatMessage, UserData } from "../websocket/socketHandler";

function handleSetupEvent(socket: WebSocket, userData: UserData) {}

function handleJoinEvent(socket: WebSocket, room: string) {}

function handleTypingEvent(socket: WebSocket, room: string) {}

function handleStopTypingEvent(socket: WebSocket, room: string) {}

function handleNewMessageEvent(socket: WebSocket, message: ChatMessage) {}

export {
  handleSetupEvent,
  handleJoinEvent,
  handleTypingEvent,
  handleNewMessageEvent,
  handleStopTypingEvent,
};
