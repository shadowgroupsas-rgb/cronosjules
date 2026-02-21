import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingLogDto } from './dto/tracking-log.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('tracking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('log')
  @ApiOperation({ summary: 'Log user location' })
  @ApiResponse({ status: 201, description: 'Location logged' })
  logLocation(@Body() trackingLogDto: TrackingLogDto) {
    return this.trackingService.logLocation(trackingLogDto);
  }

  @Get(':recordId')
  @ApiOperation({ summary: 'Get location history for a record' })
  getHistory(@Param('recordId') recordId: string) {
    return this.trackingService.getHistory(recordId);
  }
}
