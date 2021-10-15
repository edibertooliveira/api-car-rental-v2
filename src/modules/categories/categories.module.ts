import { MulterConfigService } from '@config/MulterConfig';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CreateCarController } from '../categories/infra/http/controllers/ImportCategories.controllers';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [CreateCarController],
})
export class CategoriesModule {}
