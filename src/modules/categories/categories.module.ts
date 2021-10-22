import { MulterConfigService } from '@config/MulterConfig';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from './infra/typeorm/entities/Category.entity';
import { InMemoryCategoryRepository } from './repositories/in-memory/InMemoryCategoryRepository.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: InMemoryCategoryRepository,
    },
  ],
})
export class CategoriesModule {}
