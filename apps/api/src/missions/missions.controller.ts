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
import { MissionsService } from './missions.service';
import { CreateMissionWithRoundsDto } from './dtos/create-mission-with-rounds.dto';
import { UpdateMissionDto } from './dtos/update-mission.dto';
import { StartMissionDto } from './dtos/start-mission.dto';
import { StartRoundDto } from './dtos/start-round.dto';
import { CompleteRoundDto } from './dtos/complete-round.dto';
import { Public } from '../auth/auth.decorator';

@Controller({
  path: 'missions',
  version: '1',
})
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  // Mission CRUD endpoints
  @Post()
  createMission(
    @Body() createMissionWithRoundsDto: CreateMissionWithRoundsDto,
  ) {
    return this.missionsService.createMissionWithRounds(
      createMissionWithRoundsDto,
    );
  }

  @Public()
  @Get()
  getAllMissions(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.missionsService.getAllMissions(pageNum, limitNum);
  }

  @Public()
  @Get('clan/:clanId')
  getMissionsByClan(
    @Param('clanId') clanId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.missionsService.getMissionsByClan(clanId, pageNum, limitNum);
  }

  @Public()
  @Get(':id')
  getMissionById(@Param('id') id: string) {
    return this.missionsService.getMissionById(id);
  }

  @Patch(':id')
  updateMission(
    @Param('id') id: string,
    @Body() updateMissionDto: UpdateMissionDto,
  ) {
    return this.missionsService.updateMission(id, updateMissionDto);
  }
  @Delete(':id')
  deleteMission(@Param('id') id: string) {
    return this.missionsService.deleteMission(id);
  }
  // Progress tracking endpoints
  @Post(':id/start')
  startMission(@Param('id') id: string, @Req() request: any) {
    const data: StartMissionDto = { mission_id: id };
    return this.missionsService.startMission(request.user.id, data);
  }

  @Post('rounds/:id/start')
  startRound(@Param('id') roundId: string, @Req() request: any) {
    const startRoundDto: StartRoundDto = { mission_round_id: roundId };
    return this.missionsService.startRound(request.user.id, startRoundDto);
  }

  @Post('rounds/:id/complete')
  completeRound(
    @Param('id') roundId: string,
    @Body() completeRoundDto: CompleteRoundDto,
    @Req() request: any,
  ) {
    // Override the mission_round_id from the URL parameter to ensure consistency
    const dto = { ...completeRoundDto, mission_round_id: roundId };
    return this.missionsService.completeRound(request.user.id, dto);
  }

  @Get(':id/progress')
  getUserMissionProgress(@Param('id') id: string, @Req() request: any) {
    return this.missionsService.getUserMissionProgress(request.user.id, id);
  }

  @Get(':id/leaderboard')
  getMissionLeaderboard(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.missionsService.getMissionLeaderboard(id, pageNum, limitNum);
  }

  // User missions endpoint (should be in a separate controller ideally, but placed here for convenience)
  @Get('users/missions')
  getUserMissions(
    @Req() request: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.missionsService.getUserMissions(
      request.user.id,
      pageNum,
      limitNum,
    );
  }

  @Get('users/completed')
  getUserCompletedMissions(@Req() request: any) {
    return this.missionsService.getUserCompletedMissions(request.user.id);
  }
}
