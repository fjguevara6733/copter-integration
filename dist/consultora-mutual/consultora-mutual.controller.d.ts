import { HttpStatus } from '@nestjs/common';
import { ConsultoraMutualService } from './consultora-mutual.service';
import { CashOutDto, LoginDto } from 'src/common/dto/create-consultora-mutual.dto';
import { Response } from 'express';
import { transferenciaCreditoDto } from 'src/common/dto/copter.validator';
export declare class ConsultoraMutualController {
    private readonly consultoraMutualService;
    constructor(consultoraMutualService: ConsultoraMutualService);
    login(body: LoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    cashOut(body: CashOutDto, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getCustomerByAlias(alias: string, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getCustomerByCbu(cbu: string, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    loginExchange(res: Response): Promise<void>;
    transactionExchange(body: transferenciaCreditoDto, res: Response): Promise<void>;
    checkCBU(cbu: string, res: Response): Promise<void>;
    saldo(res: Response): Promise<void>;
    estadoTransaccion(id: string, res: Response): Promise<void>;
}
