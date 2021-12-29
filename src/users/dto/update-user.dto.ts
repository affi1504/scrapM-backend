import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdateUserDto{
    
  id: number;

  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  phone_no: string;


  address: string;

  role: Role;

  isActive?: boolean = false;


}
