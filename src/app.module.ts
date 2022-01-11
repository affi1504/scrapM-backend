import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import DatabaseConfig from './config/Database.config';



export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(DatabaseConfig);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseOrmModule(),
     UsersModule,
  ]
})
export class AppModule {}
