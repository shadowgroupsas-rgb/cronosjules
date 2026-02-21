import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationLog } from '../../database/entities/location-log.entity';
import { TrackingLogDto } from './dto/tracking-log.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(LocationLog)
    private locationLogRepository: Repository<LocationLog>,
  ) {}

  async logLocation(dto: TrackingLogDto): Promise<LocationLog> {
    const log = this.locationLogRepository.create(dto as Partial<LocationLog>);
    return this.locationLogRepository.save(log);
  }

  async getHistory(recordId: string): Promise<LocationLog[]> {
    return this.locationLogRepository.find({
      where: { overtimeRecordId: recordId },
      order: { timestamp: 'ASC' },
    });
  }
}
