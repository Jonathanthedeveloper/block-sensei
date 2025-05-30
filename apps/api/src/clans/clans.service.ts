import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateClanDto } from './dtos/create-clan.dto';
import { UpdateClanDto } from './dtos/update-clan.dto';

@Injectable()
export class ClansService {
  constructor(private readonly prisma: PrismaService) {}

  async createClan(data: CreateClanDto, userId: string) {
    // Check if clan name already exists
    const existingClan = await this.prisma.clan.findUnique({
      where: { name: data.name },
    });

    if (existingClan) {
      throw new ConflictException('Clan name already exists');
    }

    return this.prisma.clan.create({
      data: {
        ...data,
        creator_id: userId,
      },
    });
  }

  async getAllClans(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [clans, total] = await Promise.all([
      this.prisma.clan.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          creator: {
            select: {
              id: true,
              wallet_address: true,
            },
          },
          _count: {
            select: {
              followers: true,
            },
          },
        },
      }),
      this.prisma.clan.count(),
    ]);

    return {
      clans,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getClanById(id: string) {
    const clan = await this.prisma.clan.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            wallet_address: true,
          },
        },
        followers: {
          include: {
            user: {
              select: {
                id: true,
                wallet_address: true,
              },
            },
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    return clan;
  }

  async updateClan(id: string, updateClanDto: UpdateClanDto, userId: string) {
    const clan = await this.prisma.clan.findUnique({
      where: { id },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    if (clan.creator_id !== userId) {
      throw new ForbiddenException('Only the clan creator can update the clan');
    }

    // Check if new name already exists (if name is being updated)
    if (updateClanDto.name && updateClanDto.name !== clan.name) {
      const existingClan = await this.prisma.clan.findUnique({
        where: { name: updateClanDto.name },
      });

      if (existingClan) {
        throw new ConflictException('Clan name already exists');
      }
    }

    return this.prisma.clan.update({
      where: { id },
      data: updateClanDto,
    });
  }

  async deleteClan(id: string, userId: string) {
    const clan = await this.prisma.clan.findUnique({
      where: { id },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    if (clan.creator_id !== userId) {
      throw new ForbiddenException('Only the clan creator can delete the clan');
    }

    // Then delete the clan
    await this.prisma.clan.delete({
      where: { id },
    });

    return { message: 'Clan deleted successfully' };
  }

  async followClan(clanId: string, userId: string) {
    // Check if clan exists
    const clan = await this.prisma.clan.findUnique({
      where: { id: clanId },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    // Check if user is already following the clan
    const existingFollow = await this.prisma.userClan.findFirst({
      where: {
        user_id: userId,
        clan_id: clanId,
      },
    });

    if (existingFollow) {
      throw new ConflictException('You are already following this clan');
    }

    await this.prisma.userClan.create({
      data: {
        user_id: userId,
        clan_id: clanId,
      },
    });

    return { success: true, message: 'Successfully followed clan' };
  }

  async unfollowClan(clanId: string, userId: string) {
    // Check if user is following the clan
    const follow = await this.prisma.userClan.findFirst({
      where: {
        user_id: userId,
        clan_id: clanId,
      },
    });

    if (!follow) {
      throw new NotFoundException('You are not following this clan');
    }

    await this.prisma.userClan.delete({
      where: { id: follow.id },
    });

    return { success: true, message: 'Successfully unfollowed clan' };
  }

  async getUserFollowedClans(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const [userClans, total] = await Promise.all([
      this.prisma.userClan.findMany({
        where: { user_id: userId },
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          clan: {
            include: {
              creator: {
                select: {
                  id: true,
                  wallet_address: true,
                },
              },
              _count: {
                select: {
                  followers: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.userClan.count({
        where: { user_id: userId },
      }),
    ]);

    const clans = userClans.map((userClan) => userClan.clan);

    return {
      clans,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserCreatedClans(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const [clans, total] = await Promise.all([
      this.prisma.clan.findMany({
        where: { creator_id: userId },
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          creator: {
            select: {
              id: true,
              wallet_address: true,
            },
          },
          _count: {
            select: {
              followers: true,
            },
          },
        },
      }),
      this.prisma.clan.count({
        where: { creator_id: userId },
      }),
    ]);

    return {
      clans,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getClanFollowers(clanId: string, page: number = 1, limit: number = 10) {
    // Check if clan exists
    const clan = await this.prisma.clan.findUnique({
      where: { id: clanId },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    const skip = (page - 1) * limit;

    const [followers, total] = await Promise.all([
      this.prisma.userClan.findMany({
        where: { clan_id: clanId },
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              wallet_address: true,
              created_at: true,
            },
          },
        },
      }),
      this.prisma.userClan.count({
        where: { clan_id: clanId },
      }),
    ]);

    const users = followers.map((follower) => follower.user);

    return {
      followers: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
