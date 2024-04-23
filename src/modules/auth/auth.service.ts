import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppError.USER_EXIST);

    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDto): Promise<any> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!validatePassword) throw new BadRequestException(AppError.WROND_DATA);

    const user = await this.userService.publicUser(dto.email);

    const token = await this.tokenService.generateJwtToken(user);

    return { user, token };
  }
}
