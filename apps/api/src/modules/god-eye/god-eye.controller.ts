import { Controller, Get, Param, Sse, MessageEvent } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('god-eye')
@Controller('god-eye')
export class GodEyeController {

  @Get('active')
  @ApiOperation({ summary: 'Get active employees' })
  getActive() {
    // Stub
    return [];
  }

  @Sse('live/:recordId')
  @ApiOperation({ summary: 'Live tracking SSE' })
  liveTracking(@Param('recordId') recordId: string): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({
        data: { recordId, lat: 0, lng: 0, timestamp: new Date() },
      }) as MessageEvent),
    );
  }
}
