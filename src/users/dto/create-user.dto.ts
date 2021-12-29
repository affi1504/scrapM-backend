import { IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {
    
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  phone_no: string;

  address: string;

  role: Role;

  isActive?: boolean = false;


}
