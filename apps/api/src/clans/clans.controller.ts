import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClansService } from './clans.service';
import { CreateClanDto } from './dtos/create-clan.dto';
import { UpdateClanDto } from './dtos/update-clan.dto';
import { Public } from '../auth/auth.decorator';

@Controller({
  path: 'clans',
  version: '1',
})
export class ClansController {
  constructor(private readonly clansService: ClansService) {}

  @Post()
  createClan(@Body() createClanDto: CreateClanDto, @Req() request) {
    return this.clansService.createClan(createClanDto, request.user.id);
  }

  @Public()
  @Get()
  getAllClans(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.clansService.getAllClans(pageNum, limitNum);
  }

  @Public()
  @Get(':id')
  getClanById(@Param('id') id: string) {
    return this.clansService.getClanById(id);
  }

  @Patch(':id')
  updateClan(
    @Param('id') id: string,
    @Body() updateClanDto: UpdateClanDto,
    @Req() request,
  ) {
    return this.clansService.updateClan(id, updateClanDto, request.user.id);
  }

  @Delete(':id')
  deleteClan(@Param('id') id: string, @Req() request) {
    return this.clansService.deleteClan(id, request.user.id);
  }

  @Post(':id/follow')
  followClan(@Param('id') clanId: string, @Req() request) {
    return this.clansService.followClan(clanId, request.user.id);
  }

  @Delete(':id/follow')
  unfollowClan(@Param('id') clanId: string, @Req() request) {
    return this.clansService.unfollowClan(clanId, request.user.id);
  }

  @Get(':id/followers')
  getClanFollowers(
    @Param('id') clanId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.clansService.getClanFollowers(clanId, pageNum, limitNum);
  }
  @Get('user/followed')
  getUserFollowedClans(
    @Req() request,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.clansService.getUserFollowedClans(
      request.user.id,
      pageNum,
      limitNum,
    );
  }

  @Get('user/created')
  getUserCreatedClans(
    @Req() request,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.clansService.getUserCreatedClans(
      request.user.id,
      pageNum,
      limitNum,
    );
  }
}
