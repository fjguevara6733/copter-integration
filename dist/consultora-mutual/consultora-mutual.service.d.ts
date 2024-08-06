import { CashOutDto, LoginDto } from '../common/dto/create-consultora-mutual.dto';
import { transferenciaCreditoDto } from 'src/common/dto/copter.validator';
export declare class ConsultoraMutualService {
    private url;
    private urlValidate;
    private urlNew;
    private token;
    login(body: LoginDto): Promise<any>;
    cashOut(body: CashOutDto, token: string): Promise<any>;
    getCustomerByAlias(alias: string, token: string): Promise<any>;
    getCustomerByCbu(cbu: string, token: string): Promise<any>;
    loginExchange(): Promise<any>;
    transactionExchange(body: transferenciaCreditoDto): Promise<any>;
    checkCBU(cbu: string): Promise<any>;
    saldo(): Promise<any>;
    estadoTransaccion(id: string): Promise<any>;
}
