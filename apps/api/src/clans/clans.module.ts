import { Module } from '@nestjs/common';
import { ClansService } from './clans.service';
import { ClansController } from './clans.controller';

@Module({
  providers: [ClansService],
  controllers: [ClansController]
})
export class ClansModule {}
