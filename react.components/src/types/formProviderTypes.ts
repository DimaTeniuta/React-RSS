import { FormData } from './formTypes';

export enum FormReducer {
  DATA = 'data',
  FILE = 'file',
}

export type ActionFormData = { type: FormReducer.DATA; payload: FormData };
export type ActionFormFile = { type: FormReducer.FILE; payload: File };
