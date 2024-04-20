import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  async getUsers() {
    return this.userService.getUsers();
  }
}
