export class Loan {
    constructor(
      private _id: string,
      private _bookId: string,
      private _userId: string,
      private _loanDate: Date,
      private _returnDate: Date | null = null,
      private _createdAt: Date = new Date(),
      private _updatedAt: Date = new Date(),
    ) {}

    get id(): string {
      return this._id
    }
    
    get bookId(): string {
      return this._bookId;
    }
    
    get userId(): string {
      return this._userId;
    }
    
    get loanDate(): Date {
      return this._loanDate;
    }
    
    get returnDate(): Date | null {
      return this._returnDate;
    }
    
    get createdAt(): Date {
      return this._createdAt;
    }
    
    get updatedAt(): Date {
      return this._updatedAt;
    }

    // 返却期限を決めるためのメソッド
    get dueDate(): Date {
      const dueDate = new Date(this.loanDate) // 貸出日を返却日の基準にセット
      dueDate.setDate(dueDate.getDate() + 14) // 貸出期間を14後にセット

      return dueDate;
    }
}
