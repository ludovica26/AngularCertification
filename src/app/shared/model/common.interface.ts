export interface IModel {
    code: string;
    description: string;
    colors: IColors[];
}
export interface IColors {
    code: string;
    description: string;
    price: number;
}
export interface IStepOne {
    model: string;
    color: string;
}
export interface IOption {
    configs: IConfiguration[];
    towHitch: boolean;
    yoke: boolean;
}
export interface IConfiguration {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}
export interface IStepTwo {
    option?: IConfiguration | null;
    towHitch: ICheckbox;
    yoke: ICheckbox;
}
export interface ICheckbox {
    isExist: boolean;
    isSelected: boolean
}