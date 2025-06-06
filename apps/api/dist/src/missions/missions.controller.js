"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsController = void 0;
const common_1 = require("@nestjs/common");
const missions_service_1 = require("./missions.service");
const create_mission_with_rounds_dto_1 = require("./dtos/create-mission-with-rounds.dto");
const update_mission_dto_1 = require("./dtos/update-mission.dto");
const complete_round_dto_1 = require("./dtos/complete-round.dto");
const auth_decorator_1 = require("../auth/auth.decorator");
let MissionsController = class MissionsController {
    missionsService;
    constructor(missionsService) {
        this.missionsService = missionsService;
    }
    createMission(createMissionWithRoundsDto) {
        return this.missionsService.createMissionWithRounds(createMissionWithRoundsDto);
    }
    getAllMissions(page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.missionsService.getAllMissions(pageNum, limitNum);
    }
    getMissionsByClan(clanId, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.missionsService.getMissionsByClan(clanId, pageNum, limitNum);
    }
    getMissionById(id) {
        return this.missionsService.getMissionById(id);
    }
    updateMission(id, updateMissionDto) {
        return this.missionsService.updateMission(id, updateMissionDto);
    }
    deleteMission(id) {
        return this.missionsService.deleteMission(id);
    }
    startMission(id, request) {
        const data = { mission_id: id };
        return this.missionsService.startMission(request.user.id, data);
    }
    startRound(roundId, request) {
        const startRoundDto = { mission_round_id: roundId };
        return this.missionsService.startRound(request.user.id, startRoundDto);
    }
    completeRound(roundId, body, request) {
        const data = { ...body, mission_round_id: roundId };
        return this.missionsService.completeRound(request.user.id, data);
    }
    getUserMissionProgress(id, request) {
        return this.missionsService.getUserMissionProgress(request.user.id, id);
    }
    getMissionLeaderboard(id, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.missionsService.getMissionLeaderboard(id, pageNum, limitNum);
    }
    getUserMissions(request, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.missionsService.getUserMissions(request.user.id, pageNum, limitNum);
    }
    getUserCompletedMissions(request) {
        return this.missionsService.getUserCompletedMissions(request.user.id);
    }
    getUserParticipatedMissions(request) {
        return this.missionsService.getUserParticipatedMissions(request.user.id);
    }
};
exports.MissionsController = MissionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mission_with_rounds_dto_1.CreateMissionWithRoundsDto]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "createMission", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getAllMissions", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)('clan/:clanId'),
    __param(0, (0, common_1.Param)('clanId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getMissionsByClan", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getMissionById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mission_dto_1.UpdateMissionDto]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "updateMission", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "deleteMission", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "startMission", null);
__decorate([
    (0, common_1.Post)('rounds/:id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "startRound", null);
__decorate([
    (0, common_1.Post)('rounds/:id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, complete_round_dto_1.CompleteRoundDto, Object]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "completeRound", null);
__decorate([
    (0, common_1.Get)(':id/progress'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getUserMissionProgress", null);
__decorate([
    (0, common_1.Get)(':id/leaderboard'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getMissionLeaderboard", null);
__decorate([
    (0, common_1.Get)('users/missions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getUserMissions", null);
__decorate([
    (0, common_1.Get)('users/completed'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getUserCompletedMissions", null);
__decorate([
    (0, common_1.Get)('users/participated'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getUserParticipatedMissions", null);
exports.MissionsController = MissionsController = __decorate([
    (0, common_1.Controller)({
        path: 'missions',
        version: '1',
    }),
    __metadata("design:paramtypes", [missions_service_1.MissionsService])
], MissionsController);
//# sourceMappingURL=missions.controller.js.map