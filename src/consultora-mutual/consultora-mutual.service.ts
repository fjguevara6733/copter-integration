import { Injectable } from '@nestjs/common';
import {
  CashOutDto,
  LoginDto,
} from '../common/dto/create-consultora-mutual.dto';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class ConsultoraMutualService {
  private url =
    process.env.URL_GENERAL ?? 'https://apisrv.itconsultoramutual.com.ar/api';
  private urlValidate =
    process.env.URL_VALIDATE ?? 'https://wallet.consultoramutual.com.ar/api';
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

  async cashOut(body: CashOutDto, token:string) {
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
}
