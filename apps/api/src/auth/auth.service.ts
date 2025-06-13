import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import crypto from 'node:crypto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SuiService } from 'src/sui/sui.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly suiService: SuiService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: LoginDto) {
    let user: User | null = await this.prisma.user.findUnique({
      where: {
        wallet_address: data.address,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          wallet_address: data.address,
        },
      });
    }

    // Create access and refresh tokens
    const accessToken = await this.jwtService.signAsync({ id: user.id });
    const refreshToken = crypto.randomBytes(32).toString('hex');

    // Save refresh token to db
    await this.prisma.refreshToken.upsert({
      where: {
        user_id: user.id,
      },
      create: {
        user: {
          connect: {
            id: user.id,
          },
        },
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      update: {
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      session: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      user,
    };
  }

  async refreshAccessToken(data: RefreshTokenDto) {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        token: data.refresh_token,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!refreshToken)
      throw new HttpException(
        'invalid or expired refresh token',
        HttpStatus.BAD_REQUEST,
      );

    const accessToken = await this.jwtService.signAsync({
      id: refreshToken.user.id,
    });
    const newRefreshToken = crypto.randomBytes(32).toString('hex');

    // Save refresh token to db
    await this.prisma.refreshToken.update({
      where: {
        user_id: refreshToken.user.id,
      },
      data: {
        token: newRefreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      session: {
        access_token: accessToken,
        refresh_token: newRefreshToken,
      },
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        created_clans: true,
        joined_clans: true,
        mission_participations: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const balance = await this.suiService.getTokenBalance(
      user?.wallet_address,
      this.configService.get<string>('TOKEN_ADDRESS'),
    );

    user['block_balance'] = balance.formattedBalance;

    return user;
  }
}
