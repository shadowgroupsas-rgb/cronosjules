import { Controller, Get, Param, Sse, MessageEvent, Inject } from '@nestjs/common';
import { Observable, interval, map, merge, filter } from 'rxjs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GodEyeService } from './god-eye.service';

@ApiTags('god-eye')
@Controller('god-eye')
export class GodEyeController {
  constructor(private godEyeService: GodEyeService) {}

  @Get('active')
  @ApiOperation({ summary: 'Get active employees' })
  async getActive() {
    return this.godEyeService.getActiveEmployees();
  }

  @Sse('live/:recordId')
  @ApiOperation({ summary: 'Live tracking SSE' })
  liveTracking(@Param('recordId') recordId: string): Observable<MessageEvent> {
    const stream$ = this.godEyeService.getLocationStream().pipe(
      filter(data => recordId === 'all' || data.recordId === recordId),
      map(data => ({
        data: data,
      }) as MessageEvent)
    );

    // Also send a heartbeat every 30s to keep connection alive
    const heartbeat$ = interval(30000).pipe(
        map(_ => ({ type: 'heartbeat', data: { timestamp: new Date() } }) as MessageEvent)
    );

    return merge(stream$, heartbeat$);
  }
}
