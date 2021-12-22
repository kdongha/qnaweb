import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateUsersInput {
  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class SignInUsersInput extends CreateUsersInput {}

@InputType()
export class UpdateUsersInput extends PickType(CreateUsersInput, [
  'password',
]) {}
