import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface configByEnvironment {
  prd?: TypeOrmModuleOptions;
  local?: TypeOrmModuleOptions;
  development?: TypeOrmModuleOptions;
  staging?: TypeOrmModuleOptions;
}

export default (configService: ConfigService): TypeOrmModuleOptions => {
  const environment = configService.get<string>('nodeEnv', 'local');

  const environments: configByEnvironment = {
    local: {
      host: configService.get<string>('dbHost', 'localhost'),
      port: configService.get<number>('dbPort', 5432),
      username: configService.get<string>('dbUser', 'postgres'),
      password: configService.get<string>('dbPassword', 'postgres'),
      database: configService.get<string>('dbName', 'api-cars'),
      autoLoadEntities: true,
      entities: [
        `${__dirname}/dist/module/**/infra/typeorm/entities/*.entity.{js|ts}`,
      ],
      migrations: [`${__dirname}/dist/shared/infra/typeorm/migrations`],
      cli: {
        migrationsDir: `${__dirname}/src/shared/infra/typeorm/migrations`,
      },
    },
  };

  const config = environments[environment];

  return {
    type: 'postgres',
    ...config,
  };
};
