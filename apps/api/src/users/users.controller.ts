import { Controller } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}
}
