import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from '../../database/entities/zone.entity';
import { isPointInPolygon } from '../../shared/geocerca/point-in-polygon';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>,
  ) {}

  async create(createZoneDto: any): Promise<Zone> {
    const zone = this.zonesRepository.create(createZoneDto as Partial<Zone>);
    return this.zonesRepository.save(zone);
  }

  async findAll(): Promise<Zone[]> {
    return this.zonesRepository.find();
  }

  async findOne(id: string): Promise<Zone> {
    const zone = await this.zonesRepository.findOne({ where: { id } });
    if (!zone) throw new NotFoundException(`Zone with ID ${id} not found`);
    return zone;
  }

  async update(id: string, updateZoneDto: any): Promise<Zone> {
    const zone = await this.findOne(id);
    Object.assign(zone, updateZoneDto);
    return this.zonesRepository.save(zone);
  }

  async remove(id: string): Promise<void> {
    const zone = await this.findOne(id);
    await this.zonesRepository.remove(zone);
  }

  async checkZone(lat: number, lng: number): Promise<Zone | null> {
    const zones = await this.zonesRepository.find({ where: { isActive: true } });
    for (const zone of zones) {
      if (zone.polygon && zone.polygon.length > 0) {
        if (isPointInPolygon({ lat, lng }, zone.polygon)) {
          return zone;
        }
      }
    }
    return null;
  }
}
