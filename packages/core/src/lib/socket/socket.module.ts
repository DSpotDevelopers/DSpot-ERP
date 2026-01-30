import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { CqrsModule } from '@nestjs/cqrs';

/**
 * SocketModule bundles WebSocket gateway and service.
 * Exporting SocketService allows other modules to send real-time events.
 */
@Module({
	imports: [CqrsModule],
	providers: [SocketGateway, SocketService],
	exports: [SocketService]
})
export class SocketModule {}
