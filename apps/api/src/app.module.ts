import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { ClansModule } from './clans/clans.module';
import { MissionsModule } from './missions/missions.module';
import { SuiModule } from './sui/sui.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ClansModule,
    MissionsModule,
    SuiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
