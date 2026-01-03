import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  private client: Client | null = null;

  connect() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket Connected');
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      },
    });

    this.client.activate();
  }

  subscribe(topic: string, callback: (message: unknown) => void) {
    if (!this.client) return;

    this.client.onConnect = () => {
      this.client?.subscribe(topic, (message) => {
        const data = JSON.parse(message.body);
        callback(data);
      });
    };
  }

  disconnect() {
    this.client?.deactivate();
  }
}

export const wsService = new WebSocketService();