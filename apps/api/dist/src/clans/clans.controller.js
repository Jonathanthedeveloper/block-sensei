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
exports.ClansController = void 0;
const common_1 = require("@nestjs/common");
const clans_service_1 = require("./clans.service");
const create_clan_dto_1 = require("./dtos/create-clan.dto");
const update_clan_dto_1 = require("./dtos/update-clan.dto");
const auth_decorator_1 = require("../auth/auth.decorator");
let ClansController = class ClansController {
    clansService;
    constructor(clansService) {
        this.clansService = clansService;
    }
    createClan(createClanDto, request) {
        return this.clansService.createClan(createClanDto, request.user.id);
    }
    getAllClans(page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.clansService.getAllClans(pageNum, limitNum);
    }
    getClanById(id) {
        return this.clansService.getClanById(id);
    }
    updateClan(id, updateClanDto, request) {
        return this.clansService.updateClan(id, updateClanDto, request.user.id);
    }
    deleteClan(id, request) {
        return this.clansService.deleteClan(id, request.user.id);
    }
    followClan(clanId, request) {
        return this.clansService.followClan(clanId, request.user.id);
    }
    unfollowClan(clanId, request) {
        return this.clansService.unfollowClan(clanId, request.user.id);
    }
    getClanFollowers(clanId, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.clansService.getClanFollowers(clanId, pageNum, limitNum);
    }
    getUserFollowedClans(request, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.clansService.getUserFollowedClans(request.user.id, pageNum, limitNum);
    }
    getUserCreatedClans(request, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.clansService.getUserCreatedClans(request.user.id, pageNum, limitNum);
    }
};
exports.ClansController = ClansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clan_dto_1.CreateClanDto, Object]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "createClan", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "getAllClans", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "getClanById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clan_dto_1.UpdateClanDto, Object]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "updateClan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "deleteClan", null);
__decorate([
    (0, common_1.Post)(':id/follow'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "followClan", null);
__decorate([
    (0, common_1.Delete)(':id/follow'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "unfollowClan", null);
__decorate([
    (0, common_1.Get)(':id/followers'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "getClanFollowers", null);
__decorate([
    (0, common_1.Get)('user/followed'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "getUserFollowedClans", null);
__decorate([
    (0, common_1.Get)('user/created'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ClansController.prototype, "getUserCreatedClans", null);
exports.ClansController = ClansController = __decorate([
    (0, common_1.Controller)({
        path: 'clans',
        version: '1',
    }),
    __metadata("design:paramtypes", [clans_service_1.ClansService])
], ClansController);
//# sourceMappingURL=clans.controller.js.map