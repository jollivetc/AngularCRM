export interface IConsumer {
  id?: number;
  civility: string;
  firstname: string;
  lastname: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CIVILITY_LIST = [
  'Mr',
  'Mme'
];

export const DEFAULT_CIVILITY: string = CIVILITY_LIST[0];
