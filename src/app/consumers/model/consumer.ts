export interface IConsumer {
  id?: number;
  civility: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
