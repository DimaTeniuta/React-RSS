import { FormData } from './formTypes';

export enum FormReducer {
  DATA = 'data',
  FILE = 'file',
}

export type FormPayload = FormData | File;
export type ActionForm = { type: Partial<FormReducer>; payload: Partial<FormPayload> };
