import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: '*'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private users = new Map<string, Socket>();

    constructor() {
        console.log('ChatGateway initialized'); // Перевірка ініціалізації
    }

    handleConnection(socket: Socket) {
        console.log('User connected:', socket.id);
    }

    handleDisconnect(socket: Socket) {
        console.log('User disconnected:', socket.id);
    }

    @SubscribeMessage('sendMessage')
    handleMessage(client: Socket, payload: { sender_id: string, sender_type: string, receiver_id: string, receiver_type: string, message: string }) {
        console.log('Отримано повідомлення:', payload);
    }
}
