import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EnvSchemaValidation } from './env.schema.validation';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvSchemaValidation,
      envFilePath: `.env.${process.env.STAGE}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const isProduction = config.get('STAGE') === 'prod';
        return {
          type: config.get('DATABASE_TYPE'),
          url: config.get('DATABASE_CONNECTION_URL'),
          autoLoadEntities: true,
          synchronize: !isProduction,
          ssl: isProduction,
        } as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
