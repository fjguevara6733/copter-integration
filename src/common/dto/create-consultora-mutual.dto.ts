import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({default: "francisco@alfredpay.io"})
  @IsNotEmpty()
  @IsString()
  Email: string;

  @ApiProperty({default: "Alo66326632."})
  @IsNotEmpty()
  @IsString()
  Password: string;
}

export class CashOutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cuit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cbu: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  monto: number;
}
