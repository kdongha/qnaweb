import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true })
  @Field()
  name: string;

  @Prop()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
