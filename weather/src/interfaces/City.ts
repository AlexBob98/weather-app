import { MouseEventHandler } from 'react';

export interface ICity {
  id: number;
  name: string;
}

export interface IRenderCity {
  value: ICity[],
  onClick: MouseEventHandler<HTMLDivElement>
}