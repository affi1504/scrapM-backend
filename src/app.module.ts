import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './config/Database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    TypeOrmModule.forRoot(DatabaseConfig), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
