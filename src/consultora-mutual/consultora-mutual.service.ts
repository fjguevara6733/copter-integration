import { Injectable } from '@nestjs/common';
import {
  CashOutDto,
  LoginDto,
} from '../common/dto/create-consultora-mutual.dto';
import axios, { AxiosRequestConfig } from 'axios';
import { transferenciaCreditoDto } from 'src/common/dto/copter.validator';

@Injectable()
export class ConsultoraMutualService {
  private url =
    process.env.URL_GENERAL ?? 'https://apisrv.itconsultoramutual.com.ar/api';
  private urlValidate =
    process.env.URL_VALIDATE ?? 'https://wallet.consultoramutual.com.ar/api';
  private urlNew = 'https://api.exchangecopter.com';
  private token = '';

  async login(body: LoginDto) {
    const requestOptions: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.url}/Login/LoginM`,
      data: body,
    };

    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw new Error('Failed to get FX rate');
    }
  }

  async cashOut(body: CashOutDto, token: string) {
    const requestOptions: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `${this.url}/CobrosPagos/CreaTTAPI`,
      data: body,
    };

    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw new Error('Failed to get FX rate');
    }
  }
  async getCustomerByAlias(alias: string, token: string) {
    const requestOptions: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: `${this.urlValidate}/cvu/accounts?${alias}`,
    };

    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw new Error('Failed to get FX rate');
    }
  }
  async getCustomerByCbu(cbu: string, token: string) {
    console.log(cbu);

    const requestOptions: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: `${this.urlValidate}/cvu/accounts?cbu_cvu=${cbu}`,
    };

    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw new Error('Failed to get FX rate');
    }
  }

  async loginExchange() {
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.urlNew}/login`,
      data: {
        username: 'matias@chronosnetwork.io',
        password: 'X?GQ8d0)0k{hLnfK',
      },
    };
    const response = await axios(requestOptions)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
    this.token = response.token;
    return response;
  }

  async transactionExchange(body: transferenciaCreditoDto) {
    if (this.token === '') throw 'No autorizado, generar un token.';

    const existCbu = await this.checkCBU(body.cbuCredito)
      .then((result) => result)
      .catch((error) => error);

    const saldo = await this.saldo()
      .then((result) => result)
      .catch((error) => error);
    if (saldo < body.importe) throw 'Saldo insuficiente';

    if (typeof existCbu === 'string') throw existCbu;

    const requestOptions: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      url: `${this.urlNew}/Transferencia`,
      data: body,
    };
    return await axios(requestOptions)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async checkCBU(cbu: string) {
    if (this.token === '') throw 'No autorizado, generar un token.';
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      url: `${this.urlNew}/checkCBUALIAS?aliasOcvu=${cbu}`,
    };
    return await axios(requestOptions)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async saldo() {
    if (this.token === '') throw 'No autorizado, generar un token.';
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      url: `${this.urlNew}/saldo`,
    };
    return await axios(requestOptions)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async estadoTransaccion(id: string) {
    if (this.token === '') throw 'No autorizado, generar un token.';
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      url: `${this.urlNew}/estadoTransferencia?idOperacion=${id}`,
    };
    return await axios(requestOptions)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
