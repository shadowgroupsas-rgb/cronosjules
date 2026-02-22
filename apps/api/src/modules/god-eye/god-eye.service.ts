import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class GodEyeService {
  // Using RxJS Subject as a simple event bus for demo purposes.
  // In production with multiple instances (Redis), use Redis Pub/Sub.
  private locationUpdates$ = new Subject<any>();

  emitLocationUpdate(data: any) {
    this.locationUpdates$.next(data);
  }

  getLocationStream() {
    return this.locationUpdates$.asObservable();
  }

  // Method to get active employees (stub improved)
  async getActiveEmployees() {
    // In real app: query OvertimeRecord where status = 'active' join User
    return [
        { id: "1", name: "Juan Pérez", role: "Técnico", lat: 4.7110, lng: -74.0721, status: "active" },
        { id: "2", name: "Maria Garcia", role: "Supervisor", lat: 4.6980, lng: -74.0500, status: "active" }
    ];
  }
}
