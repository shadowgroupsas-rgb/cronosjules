import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  findAll() {
    return [];
  }

  @Post('send')
  @ApiOperation({ summary: 'Send notification' })
  send(@Body() body: any) {
    return { success: true };
  }
}
