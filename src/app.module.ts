import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './shared/config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB.host,
      port: config.DB.port,
      username: config.DB.user,
      password: config.DB.password,
      database: config.DB.database,
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false,
    }),
  ],
})
export class AppModule {}
