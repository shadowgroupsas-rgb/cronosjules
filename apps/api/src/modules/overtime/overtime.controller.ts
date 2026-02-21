import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { ClockInDto } from './dto/clock-in.dto';
import { ClockOutDto } from './dto/clock-out.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('overtime')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('overtime')
export class OvertimeController {
  constructor(private readonly overtimeService: OvertimeService) {}

  @Post('clock-in')
  @ApiOperation({ summary: 'Clock In' })
  @ApiResponse({ status: 201, description: 'Clock In successful' })
  clockIn(@Request() req, @Body() clockInDto: ClockInDto) {
    return this.overtimeService.clockIn(req.user, clockInDto);
  }

  @Post('clock-out')
  @ApiOperation({ summary: 'Clock Out' })
  @ApiResponse({ status: 200, description: 'Clock Out successful' })
  clockOut(@Request() req, @Body() clockOutDto: ClockOutDto) {
    return this.overtimeService.clockOut(req.user, clockOutDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active overtime record' })
  getActive(@Request() req) {
    return this.overtimeService.getActive(req.user);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get overtime history' })
  getHistory(@Request() req, @Query() query: any) {
    return this.overtimeService.getHistory(req.user, query);
  }
}
