import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService]  // Export EmailService if needed in other modules
})
export class EmailModule {}
