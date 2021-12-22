import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersInput, UpdateUsersInput } from './dto/user.input';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByName(name: string) {
    return this.userModel.findOne({ name });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(userInput: CreateUsersInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    return this.userModel.create({ ...userInput, password: hashedPassword });
  }

  async update(user: User, userInput: UpdateUsersInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    user.password = hashedPassword;
    user.save();
    return user;
  }
}
