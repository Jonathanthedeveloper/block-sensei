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
import { UploadModule } from './upload/upload.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import joi from 'joi';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().optional(),
        CORS_ORIGIN: joi.string().default('*'),
        JWT_SECRET: joi.string().required(),
        CLOUDINARY_CLOUD_NAME: joi.string().required(),
        CLOUDINARY_API_KEY: joi.string().required(),
        CLOUDINARY_API_SECRET: joi.string().required(),
        DATABASE_URL: joi.string().required(),
        SUI_PACKAGE_ID: joi.string().required(),
        SUI_ADMIN_CAPABILITY_ID: joi.string().required(),
        SUI_TREASURY_CAPALITY_ID: joi.string().required(),
        PRIVATE_KEY: joi.string().required(),
      }),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ClansModule,
    MissionsModule,
    SuiModule,
    UploadModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
