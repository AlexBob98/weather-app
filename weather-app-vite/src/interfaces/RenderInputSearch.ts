import { ChangeEvent, KeyboardEvent } from 'react';

export interface IPropsInputSearch {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}
