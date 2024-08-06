import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Request,
  Res,
} from '@nestjs/common';
import { ConsultoraMutualService } from './consultora-mutual.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CashOutDto,
  LoginDto,
} from 'src/common/dto/create-consultora-mutual.dto';
import { Response } from 'express';
import { transferenciaCreditoDto } from 'src/common/dto/copter.validator';

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

  @Post('login-exchange')
  async loginExchange(@Res() res: Response) {
    console.log('login-exchange');
    await this.consultoraMutualService
      .loginExchange()
      .then((result) => {
        const response = {
          statusCode: HttpStatus.ACCEPTED,
          message: 'login-exchange',
          data: result,
        };
        res.status(HttpStatus.ACCEPTED).send(response);
      })
      .catch((error) => {
        console.log(error);
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error login-exchange',
          data: error,
        };
        res.status(HttpStatus.BAD_REQUEST).send(response);
      });
  }

  @Post('transferencia-exchange')
  async transactionExchange(
    @Body() body: transferenciaCreditoDto,
    @Res() res: Response,
  ) {
    console.log('transferencia-exchange');
    await this.consultoraMutualService
      .transactionExchange(body)
      .then((result) => {
        const response = {
          statusCode: HttpStatus.ACCEPTED,
          message: 'transferencia-exchange',
          data: result,
        };
        res.status(HttpStatus.ACCEPTED).send(response);
      })
      .catch((error) => {
        console.log(error);
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error transferencia-exchange',
          data: error,
        };
        res.status(HttpStatus.BAD_REQUEST).send(response);
      });
  }

  @Get('checkCbu/:cbu')
  async checkCBU(@Param('cbu') cbu: string, @Res() res: Response) {
    console.log('checkCbu');
    await this.consultoraMutualService
      .checkCBU(cbu)
      .then((result) => {
        const response = {
          statusCode: HttpStatus.ACCEPTED,
          message: 'checkCbu',
          data: result,
        };
        res.status(HttpStatus.ACCEPTED).send(response);
      })
      .catch((error) => {
        console.log(error);
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error checkCbu',
          data: error,
        };
        res.status(HttpStatus.BAD_REQUEST).send(response);
      });
  }

  @Get('saldo')
  async saldo(@Res() res: Response) {
    console.log('saldo');
    await this.consultoraMutualService
      .saldo()
      .then((result) => {
        const response = {
          statusCode: HttpStatus.ACCEPTED,
          message: 'saldo',
          data: result,
        };
        res.status(HttpStatus.ACCEPTED).send(response);
      })
      .catch((error) => {
        console.log(error);
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error saldo',
          data: error,
        };
        res.status(HttpStatus.BAD_REQUEST).send(response);
      });
  }

  @Get('estado-transaccion/:id')
  async estadoTransaccion(@Param('id') id: string, @Res() res: Response) {
    console.log('estado-transaccion');
    await this.consultoraMutualService
      .estadoTransaccion(id)
      .then((result) => {
        const response = {
          statusCode: HttpStatus.ACCEPTED,
          message: 'estado-transaccion',
          data: result,
        };
        res.status(HttpStatus.ACCEPTED).send(response);
      })
      .catch((error) => {
        console.log(error);
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error estado-transaccion',
          data: error,
        };
        res.status(HttpStatus.BAD_REQUEST).send(response);
      });
  }
}
