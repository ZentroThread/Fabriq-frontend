// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// class WebSocketService {
//   private client: Client | null = null;
//   private subscriptions: Map<string, (message: unknown) => void> = new Map();

//   connect() {
//     if (this.client) {
//       
//       return;
//     }

//     this.client = new Client({
//       webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
//       debug: (str) => ,
//       reconnectDelay: 5000,
//       onConnect: () => {
//         
//         // Subscribe to all pending topics
//         this.subscriptions.forEach((callback, topic) => {
//           this.client?.subscribe(topic, (message) => {
//             const data = JSON.parse(message.body);
//             
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
//         
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
