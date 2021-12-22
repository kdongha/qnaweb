import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInUsersInput } from 'src/users/dto/user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtSignin(signinUsersInput: SignInUsersInput): Promise<any> {
    const { name, password } = signinUsersInput;
    const user = await this.userService.findByName(name);
    if (!user) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }
    const payload = { name, sub: user._id };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
