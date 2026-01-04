import { Loan } from "../entities/loan";


export interface LoanRepositoryInterface {
    create(loan: Loan): Promise<Loan>
    findByLoanId(id: string): Promise<Loan>
    returnByLoanId(id: string): Promise<Loan>
}
