import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingLogDto } from './dto/tracking-log.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { GodEyeService } from '../god-eye/god-eye.service';

@ApiTags('tracking')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard) // Disabled for demo/testing without full auth headers from mobile
@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly godEyeService: GodEyeService,
  ) {}

  @Post('log')
  @ApiOperation({ summary: 'Log user location' })
  @ApiResponse({ status: 201, description: 'Location logged' })
  async logLocation(@Body() trackingLogDto: TrackingLogDto) {
    const log = await this.trackingService.logLocation(trackingLogDto);

    // Broadcast to God's Eye
    this.godEyeService.emitLocationUpdate({
        recordId: trackingLogDto.overtimeRecordId,
        lat: trackingLogDto.latitude,
        lng: trackingLogDto.longitude,
        timestamp: new Date()
    });

    return log;
  }

  @Get(':recordId')
  @ApiOperation({ summary: 'Get location history for a record' })
  getHistory(@Param('recordId') recordId: string) {
    return this.trackingService.getHistory(recordId);
  }
}
