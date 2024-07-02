import { CashOutDto, LoginDto } from '../common/dto/create-consultora-mutual.dto';
export declare class ConsultoraMutualService {
    private url;
    private urlValidate;
    login(body: LoginDto): Promise<any>;
    cashOut(body: CashOutDto, token: string): Promise<any>;
    getCustomerByAlias(alias: string, token: string): Promise<any>;
    getCustomerByCbu(cbu: string, token: string): Promise<any>;
}
