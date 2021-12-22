import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from './schemas/chanels.schema';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel.name) private readonly channelModel: Model<Channel>,
  ) {}
  async create(name: string) {
    return this.channelModel.create({ name });
  }

  async join(name: string) {
    const channel = await this.channelModel.findOne({ name });
    if (channel) {
      return channel;
    }
    return this.create(name);
  }
}
