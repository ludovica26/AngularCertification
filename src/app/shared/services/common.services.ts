import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IColors, IModel, IStepOne, IStepTwo } from "../model/common.interface";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    public modelSelected: BehaviorSubject<Partial<IModel> | null> = new BehaviorSubject<Partial<IModel> | null>(null);
    public colorSelected: BehaviorSubject<IColors | null> = new BehaviorSubject<IColors | null>(null);
    public stepOne: BehaviorSubject<IStepOne | null> = new BehaviorSubject<IStepOne | null>(null);
    public stepTwo: BehaviorSubject<IStepTwo | null> = new BehaviorSubject<IStepTwo | null>(null);
    public imgLink: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public setModelSelected(model: Partial<IModel> | null): void {
        this.modelSelected.next(model)
    }
    public setColorSelected(color: IColors | null): void {
        this.colorSelected.next(color)
    }
    public setStepOne(stepOne: IStepOne | null): void {
        this.stepOne.next(stepOne)
    }
    public setStepTwo(stepTwo: IStepTwo | null): void {
        this.stepTwo.next(stepTwo)
    }
    public setImgLink(imgLink: string | null): void {
        this.imgLink.next(imgLink)
    }
    public resetAll(): void {
        this.imgLink.next(null)
        this.stepTwo.next(null)
        this.colorSelected.next(null)
        this.stepOne.next(null)
    }

}