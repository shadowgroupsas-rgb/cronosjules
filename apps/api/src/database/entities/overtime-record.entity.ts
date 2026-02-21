import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Zone } from './zone.entity';

@Entity('overtime_records')
export class OvertimeRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'timestamptz' })
  clockIn: Date;

  @Column({ type: 'timestamptz', nullable: true })
  clockOut: Date;

  @Column({ type: 'float', nullable: true })
  clockInLat: number;

  @Column({ type: 'float', nullable: true })
  clockInLng: number;

  @Column({ type: 'float', nullable: true })
  clockOutLat: number;

  @Column({ type: 'float', nullable: true })
  clockOutLng: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'active' }) // active | completed | cancelled
  status: string;

  @Column({ default: false })
  isNocturnal: boolean;

  @Column({ type: 'int', nullable: true })
  dayOfWeek: number; // 1=Mon ... 7=Sun

  @Column({ type: 'int', default: 0 })
  totalMinutes: number;

  @ManyToOne(() => Zone, { nullable: true })
  @JoinColumn({ name: 'zoneId' })
  zone: Zone;

  @Column({ nullable: true })
  zoneId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
