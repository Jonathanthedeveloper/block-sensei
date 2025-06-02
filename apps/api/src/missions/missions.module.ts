import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';

@Module({
  providers: [MissionsService],
  controllers: [MissionsController]
})
export class MissionsModule {}
