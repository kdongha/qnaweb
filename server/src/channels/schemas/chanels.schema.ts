import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@ObjectType()
@Schema(options)
export class Channel extends Document {
  @Field(() => ID)
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true })
  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
