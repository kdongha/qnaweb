import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { Channel } from './schemas/chanels.schema';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Query(() => Channel)
  async joinChannel(@Args('name') name: string) {
    return this.channelsService.join(name);
  }
}
