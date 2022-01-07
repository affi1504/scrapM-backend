import { IsBoolean, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdateUserDto{
  
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  full_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ ,{message: 'Passwords must contain at least 1 upper case letter, 1 lower case letter, 1 number or special character'})
  password: string;

  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  phone_no: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(200)
  address: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean = false;

}
