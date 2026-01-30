import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Server, Socket } from 'socket.io';
import { EmployeeSocketEvent } from '../event-bus/events/employee-socket.event';

/**
 * SocketService manages connected clients and provides
 * methods to emit real-time events to them.
 *
 * Now supports multiple sockets per clientKey (e.g. user opened app
 * in multiple browsers or tabs).
 *
 * This service is still in-memory — for scaling with multiple server
 * instances you should use a shared adapter (e.g. Redis).
 */
@Injectable()
export class SocketService {
	/**
	 * In-memory map of connected clients.
	 * Each clientKey (e.g. employeeId, userId, tenantId) can have multiple sockets.
	 */
	private readonly clients = new Map<string, Set<Socket>>();
	private server: Server;

	constructor(private readonly _eventBus: EventBus) {}

	/**
	 * Assign the Socket.IO server instance to the service.
	 * Called once during gateway initialization.
	 */
	setServer(server: Server) {
		this.server = server;
	}

	/**
	 * Register a client under a given identifier (clientKey).
	 * Supports multiple sockets per clientKey.
	 */
	registerClient(clientKey: string, socket: Socket): void {
		if (!this.clients.has(clientKey)) {
			this.clients.set(clientKey, new Set());
		}
		this.clients.get(clientKey).add(socket);
	}

	/**
	 * Remove a client socket by its socket ID.
	 * Cleans up empty sets when last socket disconnects.
	 */
	removeClient(socketId: string): void {
		for (const [key, sockets] of this.clients.entries()) {
			for (const socket of sockets) {
				if (socket.id === socketId) {
					sockets.delete(socket);
					if (sockets.size === 0) {
						this.clients.delete(key);
					}
					return;
				}
			}
		}
	}

	/**
	 * Emit event to multiple clients.
	 */
	emitToClientMany(clientKeys: string[], event: string, payload?: any): void {
		clientKeys.forEach((key) => this.emitToClient(key, event, payload));
	}

	/** Listen to events published on the EventBus */

	/**
	 * Publish a socket event for a single employee using CQRS EventBus.
	 * This allows socket emission to be handled asynchronously.
	 */
	async notifyEmployee(employeeId: string, event: string, payload?: any) {
		await this.publishEvent([employeeId], event, payload);
	}

	/**
	 * Publish a socket event for multiple employees using CQRS EventBus.
	 */
	async notifyEmployees(employeeIds: string[], event: string, payload?: any) {
		await this.publishEvent(employeeIds, event, payload);
	}

	/**
	 * Internal helper that publishes a socket-related domain event.
	 */
	private async publishEvent(employeeIds: string[], event: string, payload?: any) {
		const eventObj = new EmployeeSocketEvent(employeeIds, event, payload);
		this._eventBus.publish(eventObj);
	}

	/**
	 * Generic event emitter to all sockets of a single client.
	 */
	emitToClient(clientKey: string, event: string, payload?: any): void {
		const sockets = this.clients.get(clientKey);
		if (sockets) {
			sockets.forEach((socket) => {
				if (socket.connected) {
					socket.emit(event, payload);
				}
			});
		}
	}

	/**
	 * Broadcast event to all connected clients.
	 */
	broadcast(event: string, payload?: any): void {
		this.clients.forEach((sockets) => {
			sockets.forEach((socket) => {
				if (socket.connected) {
					socket.emit(event, payload);
				}
			});
		});
	}

	/**
	 * Emit an event to a specific Socket.IO room.
	 *
	 * @param room Room name (e.g. roleId, tenantId)
	 * @param event Socket event name
	 * @param payload Event payload
	 */
	emitToRoom(room: string, event: string, payload?: any) {
		if (!this.server) {
			console.warn('Socket server not initialized!');
			return;
		}
		this.server.to(room).emit(event, payload);
	}
}
