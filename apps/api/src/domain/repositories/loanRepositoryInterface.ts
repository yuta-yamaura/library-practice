import { Loan } from "../entities/loan";


export interface LoanRepositoryInterface {
    create(loan: Loan): Promise<Loan>
}
