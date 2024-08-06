import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class transferenciaCreditoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cuitCredito: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cbuCredito: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombreCredito: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  importe: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idTransaccionEntidad: string;
}
