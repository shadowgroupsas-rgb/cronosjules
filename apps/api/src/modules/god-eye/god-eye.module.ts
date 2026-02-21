import { Module } from '@nestjs/common';
import { GodEyeController } from './god-eye.controller';

@Module({
  controllers: [GodEyeController],
})
export class GodEyeModule {}
