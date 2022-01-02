import { Role } from 'src/enums/role.enum';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
  
  @Entity('user')
  export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;
  

    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;

    @Column({unique: true})
    phone_no: string;

    @Column()
    address: string;

    @Column()
    isActive: boolean;

    @Column({type:'enum' , enum: Role, default: Role.USER})
    role: Role;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
  }
