import { Module } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { QuestionResolver } from './questions.resolver';

@Module({
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
