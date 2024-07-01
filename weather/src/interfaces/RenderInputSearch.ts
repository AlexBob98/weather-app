import { ChangeEventHandler, KeyboardEventHandler } from 'react';

export interface IPropsInputSearch {
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string,
    onKeyUp: KeyboardEventHandler<HTMLInputElement>
}