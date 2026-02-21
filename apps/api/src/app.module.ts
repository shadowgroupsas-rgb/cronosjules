import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OvertimeModule } from './modules/overtime/overtime.module';
import { ZonesModule } from './modules/zones/zones.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { GodEyeModule } from './modules/god-eye/god-eye.module';
import { ReportsModule } from './modules/reports/reports.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SetupModule } from './modules/setup/setup.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DepartmentsModule,
    OvertimeModule,
    ZonesModule,
    TrackingModule,
    GodEyeModule,
    ReportsModule,
    NotificationsModule,
    SetupModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
