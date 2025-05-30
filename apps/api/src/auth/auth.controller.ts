import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { Public } from './auth.decorator';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('refresh')
  refreshAccessToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshAccessToken(body);
  }

  @Get('me')
  getCurrentUser(@Req() request) {
    return this.authService.getCurrentUser(request.user.id);
  }
}
