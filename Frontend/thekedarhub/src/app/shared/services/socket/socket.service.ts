import { Injectable } from '@angular/core';
import {io , Socket} from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl , {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
  }

  joinProjectRoom(projectId: string) {
    this.socket.emit('joinProjectRoom', { projectId });
  }

  submitBid(data: any) {
    this.socket.emit('submitBid', data);
  }

  onNewBid(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newBid', data => observer.next(data));
    });
  }

  counterBid(data: any) {
    this.socket.emit('counterBid', data);
  }

  counterAllBids(data: any) {
    this.socket.emit('counterAllBids', data);
  }

  acceptBid(data: any) {
    this.socket.emit('acceptBid', data);
  }

  rejectBid(data: any) {
    this.socket.emit('rejectBid', data);
  }

  contractorAcceptCounter(data: any) {
    this.socket.emit('contractorAcceptCounter', data);
  }

  finalizeBid(data: any) {
    this.socket.emit('finalizeBid', data);
  }

  onBidStatusUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('bidStatusUpdate', data => observer.next(data));
    });
  }

  onCounteredBid(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('counteredBid', data => observer.next(data));
    });
  }

  onCounteredAllBids(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('counteredAllBids', data => observer.next(data));
    });
  }

  onFinalized(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('finalized', data => observer.next(data));
    });
  }

}
