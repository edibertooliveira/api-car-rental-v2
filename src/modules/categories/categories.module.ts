import { MulterConfigService } from '@config/MulterConfig';
import { CreateCarController } from '@modules/cars/infra/http/controllers/CreateCar.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from './infra/typeorm/entities/Category.entity';
import { CategoryRepository } from './infra/typeorm/repositories/CategoryRepository.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [CreateCarController],
  providers: [
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryRepository,
    },
  ],
})
export class CategoriesModule {}
