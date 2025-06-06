import { Global, Module } from '@nestjs/common';
import { SuiService } from './sui.service';

@Global()
@Module({
  providers: [SuiService],
  exports: [SuiService],
})
export class SuiModule {}
