import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('setup')
@Controller('setup')
export class SetupController {

  @Get('status')
  @ApiOperation({ summary: 'Check installation status' })
  getStatus() {
    return { installed: false };
  }

  @Post('check-env')
  checkEnv() {
    return { success: true };
  }

  @Post('create-admin')
  createAdmin(@Body() body: any) {
    return { success: true, message: 'Admin created' };
  }

  @Post('complete')
  complete() {
    return { success: true, message: 'Setup completed' };
  }
}
