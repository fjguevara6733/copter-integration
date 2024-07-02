import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Request,
} from '@nestjs/common';
import { ConsultoraMutualService } from './consultora-mutual.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CashOutDto,
  LoginDto,
} from 'src/common/dto/create-consultora-mutual.dto';

@Controller()
@ApiTags('consultora-mutual')
export class ConsultoraMutualController {
  constructor(
    private readonly consultoraMutualService: ConsultoraMutualService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log('login');
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'login',
        data: await this.consultoraMutualService.login(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('cash-out')
  @ApiQuery({ name: 'token', required: false })
  async cashOut(@Body() body: CashOutDto, @Request() req) {
    console.log('cash-out');
    const token = req.query.token;
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'cash-out',
        data: await this.consultoraMutualService.cashOut(body, token),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-customer-by-alias/:alias')
  @ApiQuery({ name: 'token', required: false })
  async getCustomerByAlias(@Param('alias') alias: string, @Request() req) {
    console.log('get-customer-by-alias/:alias');
    const token = req.query.token;
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get-customer-by-alias',
        data: await this.consultoraMutualService.getCustomerByAlias(
          alias,
          token,
        ),
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('get-customer-by-cbu/:cbu')
  @ApiQuery({ name: 'token', required: false })
  async getCustomerByCbu(@Param('cbu') cbu: string, @Request() req) {
    console.log('get-customer-by-cbu/:cbu');
    const token = req.query.token;
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get-customer-by-cbu',
        data: await this.consultoraMutualService.getCustomerByCbu(cbu, token),
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
