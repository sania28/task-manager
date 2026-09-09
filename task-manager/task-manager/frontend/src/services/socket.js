import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { API_BASE_URL } from './api'

let client = null

/**
 * Connects to the backend STOMP/WebSocket endpoint and subscribes to
 * the given user's private task topic. Calls onEvent(event) whenever
 * a task is created, updated, or deleted server-side (by this session
 * or any other session logged in as the same user).
 */
export function connectTaskSocket(userId, onEvent, onConnected) {
  if (client) {
    disconnectTaskSocket()
  }

  client = new Client({
    webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
    reconnectDelay: 4000,
    onConnect: () => {
      client.subscribe(`/topic/tasks/${userId}`, (message) => {
        try {
          const event = JSON.parse(message.body)
          onEvent(event)
        } catch (e) {
          console.error('Failed to parse task event', e)
        }
      })
      onConnected?.(true)
    },
    onDisconnect: () => onConnected?.(false),
    onStompError: (frame) => {
      console.error('STOMP error', frame.headers?.message)
    },
  })

  client.activate()
  return client
}

export function disconnectTaskSocket() {
  if (client) {
    client.deactivate()
    client = null
  }
}
