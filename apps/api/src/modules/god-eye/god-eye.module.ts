import { Module, Global } from '@nestjs/common';
import { GodEyeController } from './god-eye.controller';
import { GodEyeService } from './god-eye.service';

@Global()
@Module({
  controllers: [GodEyeController],
  providers: [GodEyeService],
  exports: [GodEyeService],
})
export class GodEyeModule {}
