import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OvertimeRecord } from './overtime-record.entity';

@Entity('location_logs')
export class LocationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OvertimeRecord, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'overtimeRecordId' })
  overtimeRecord: OvertimeRecord;

  @Column()
  overtimeRecordId: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float', nullable: true })
  accuracy: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
