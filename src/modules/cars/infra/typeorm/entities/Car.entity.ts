import Category from '@modules/categories/infra/typeorm/entities/Category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('cars')
export default class Car {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  brand: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ name: 'daily_rate' })
  dailyRate: number;

  @ApiProperty()
  @Column()
  available: boolean;

  @ApiProperty()
  @Column({ name: 'license_plate' })
  licensePlate: string;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: string;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
}
