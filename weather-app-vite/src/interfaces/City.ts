export interface ICity {
  id: number;
  name: string;
}

export interface IRenderCity {
  value: ICity[];
  onClick: (cityName: string) => void;
}
