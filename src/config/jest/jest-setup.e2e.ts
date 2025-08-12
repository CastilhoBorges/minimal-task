/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import typeorm from '../typeorm/typeorm';
import { modules } from '../../app.module';

dotenvConfig({ path: '.env.test' });

export class JestSetupE2E {
  private postgresContainer: StartedPostgreSqlContainer;
  private appContainer: INestApplication;

  async init() {
    const { host, port } = await this.startPostgresContainer();
    await this.startAppContainer(host, port);

    return { app: this.appContainer };
  }

  async close() {
    await this.appContainer.close();
    await this.postgresContainer.stop();
  }

  private startPostgresContainer = async () => {
    this.postgresContainer = await new PostgreSqlContainer('postgres:17')
      .withName(`postgres_${process.env.npm_package_name}`)
      .start();

    const host = this.postgresContainer.getHost();
    const port = this.postgresContainer.getMappedPort(
      Number(process.env.DATABASE_PORT),
    );

    return { host, port };
  };

  private startAppContainer = async (host: string, port: number) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const config = await configService.get('typeorm');
            config.port = port;
            config.host = host;

            return {
              ...config,
            } as TypeOrmModuleOptions;
          },
        }),
        ...modules,
      ],
    }).compile();

    this.appContainer = moduleFixture.createNestApplication();

    this.appContainer.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    this.appContainer.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        errorHttpStatusCode: 422,
      }),
    );
    await this.appContainer.init();
  };
}
