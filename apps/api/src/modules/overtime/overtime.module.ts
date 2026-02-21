import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OvertimeService } from './overtime.service';
import { OvertimeController } from './overtime.controller';
import { OvertimeRecord } from '../../database/entities/overtime-record.entity';
import { Zone } from '../../database/entities/zone.entity';
import { ZonesModule } from '../zones/zones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OvertimeRecord, Zone]),
    ZonesModule,
  ],
  controllers: [OvertimeController],
  providers: [OvertimeService],
  exports: [OvertimeService],
})
export class OvertimeModule {}
