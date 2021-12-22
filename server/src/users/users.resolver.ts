import { ExecutionContext, Response, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import {
  CreateUsersInput,
  SignInUsersInput,
  UpdateUsersInput,
} from './dto/user.input';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Query(() => String)
  async signin(
    @Args('signinUsersInput') signinUsersInput: SignInUsersInput,
  ): Promise<User> {
    const token = await this.authService.jwtSignin(signinUsersInput);
    return token;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUsersInput') createUserInput: CreateUsersInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUsersInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.update(user, updateUserInput);
  }
}
