import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OvertimeRecord } from '../../database/entities/overtime-record.entity';
import { ClockInDto } from './dto/clock-in.dto';
import { ClockOutDto } from './dto/clock-out.dto';
import { ZonesService } from '../zones/zones.service';
import { checkIsNocturnal } from '../../shared/overtime-utils/nocturnal-calculator';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class OvertimeService {
  constructor(
    @InjectRepository(OvertimeRecord)
    private overtimeRecordRepository: Repository<OvertimeRecord>,
    private zonesService: ZonesService,
  ) {}

  async clockIn(user: User, clockInDto: ClockInDto): Promise<OvertimeRecord> {
    const existing = await this.overtimeRecordRepository.findOne({
      where: { userId: user.id, status: 'active' },
    });

    if (existing) {
      throw new BadRequestException('Already clocked in');
    }

    const zone = await this.zonesService.checkZone(clockInDto.latitude, clockInDto.longitude);
    const now = new Date();
    const day = now.getDay();
    const dayOfWeek = day === 0 ? 7 : day;

    const record = this.overtimeRecordRepository.create({
      user, // Use relation object
      userId: user.id,
      clockIn: now,
      clockInLat: clockInDto.latitude,
      clockInLng: clockInDto.longitude,
      dayOfWeek,
      status: 'active',
      zone: zone || null,
      isNocturnal: false,
      totalMinutes: 0,
    });

    return this.overtimeRecordRepository.save(record);
  }

  async clockOut(user: User, clockOutDto: ClockOutDto): Promise<OvertimeRecord> {
    const record = await this.overtimeRecordRepository.findOne({
      where: { userId: user.id, status: 'active' },
      relations: ['zone'],
    });

    if (!record) {
      throw new BadRequestException('No active clock-in found');
    }

    const now = new Date();
    record.clockOut = now;
    record.clockOutLat = clockOutDto.latitude;
    record.clockOutLng = clockOutDto.longitude;
    record.description = clockOutDto.description;
    record.status = 'completed';

    // Calculate duration
    const diffMs = record.clockOut.getTime() - record.clockIn.getTime();
    record.totalMinutes = Math.floor(diffMs / 60000);

    // Check nocturnal
    record.isNocturnal = checkIsNocturnal(record.clockIn, record.clockOut);

    return this.overtimeRecordRepository.save(record);
  }

  async getActive(user: User): Promise<OvertimeRecord | null> {
    return this.overtimeRecordRepository.findOne({
      where: { userId: user.id, status: 'active' },
      relations: ['zone'],
    });
  }

  async getHistory(user: User, query: any): Promise<OvertimeRecord[]> {
    // Implement filtering logic
    return this.overtimeRecordRepository.find({
      where: { userId: user.id },
      order: { clockIn: 'DESC' },
      take: 20, // Pagination stub
    });
  }
}
