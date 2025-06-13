import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { ImageGeneratorModule } from 'src/image-generator/image-generator.module';

@Module({
  imports: [ImageGeneratorModule],
  providers: [MissionsService],
  controllers: [MissionsController],
})
export class MissionsModule {}
