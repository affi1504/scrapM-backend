import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const users = await this.usersRepository.find();
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
    const isUserexist = await this.isUserExist(createUserDto.email,createUserDto.phone_no);
    if(isUserexist){
      throw new BadRequestException('user exists with the provided details');
    }
    else{
    
      const user = this.usersRepository.create(createUserDto);
      await user.save()
      delete user.password;
      return user;
    }

   

  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {

      const user: User | undefined = await this.usersRepository
      .createQueryBuilder()
      .where("email = :email OR phone_no = :phone_no", {
        email: updateUserDto.email,
        phone_no: updateUserDto.phone_no,
      })
      .getOne();
      if(user.id == id || user == undefined){
       return await this.usersRepository.update(id, updateUserDto);
      }
      else{
        throw new BadRequestException('user exists with the provided details');
      }
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

  async isUserExist(email: string, phone: string) {
    const user: User | undefined = await this.usersRepository
    .createQueryBuilder()
    .where("email = :email OR phone_no = :phone_no", {
      email: email,
      phone_no: phone,
    })
    .getOne();
    return user !== undefined;
  }


  async hashPassword(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 8);
  }


  async validatePassword(passwordToValidate: string,user:User): Promise<boolean> {
    return bcrypt.compare(passwordToValidate, user.password);
  }

}