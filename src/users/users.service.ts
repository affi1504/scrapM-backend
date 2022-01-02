import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)private usersRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.find();
    if(users){
      return users;
    }
    else{
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if(user){
      return user;
    }
    else{
      throw new NotFoundException();
    }    
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.hashPassword(createUserDto);
    const user = this.usersRepository.create(createUserDto);
    await user.save()
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number){
   const user = await this.findOne(id);
   user.isActive = false;
   user.save();
    //return await this.usersRepository.delete(id);
  }

  
  async showById(id: number): Promise<User> {
    const user = await this.findOne(id);
    delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  

  async hashPassword(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 8);
  }


  async validatePassword(passwordToValidate: string,user:User): Promise<boolean> {
    return bcrypt.compare(passwordToValidate, user.password);
  }

}