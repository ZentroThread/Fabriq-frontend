// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// class WebSocketService {
//   private client: Client | null = null;
//   private subscriptions: Map<string, (message: unknown) => void> = new Map();

//   connect() {
//     if (this.client) {
//       console.log("WebSocket already connected");
//       return;
//     }

//     this.client = new Client({
//       webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
//       debug: (str) => console.log(str),
//       reconnectDelay: 5000,
//       onConnect: () => {
//         console.log("WebSocket Connected");
//         // Subscribe to all pending topics
//         this.subscriptions.forEach((callback, topic) => {
//           this.client?.subscribe(topic, (message) => {
//             const data = JSON.parse(message.body);
//             console.log(`📩 Received message on ${topic}:`, data);
//             callback(data);
//           });
//         });
//       },
//       onStompError: (frame) => {
//         console.error("STOMP error", frame);
//       },
//     });

//     this.client.activate();
//   }

//   subscribe(topic: string, callback: (message: unknown) => void) {
//     // Store the subscription
//     this.subscriptions.set(topic, callback);

//     // If already connected, subscribe immediately
//     if (this.client?.connected) {
//       this.client.subscribe(topic, (message) => {
//         const data = JSON.parse(message.body);
//         console.log(`📩 Received message on ${topic}:`, data);
//         callback(data);
//       });
//     }
//   }

//   disconnect() {
//     this.subscriptions.clear();
//     this.client?.deactivate();
//     this.client = null;
//   }
// }

// export const wsService = new WebSocketService();
