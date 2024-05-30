import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { IModel, IOption } from "../model/common.interface";

@Injectable({
    providedIn: 'root'
})
export class TeslaService {
    /**url modal service */
    protected urlModels = '/models';
    /**url option service */
    protected urlOption = '/options/';
    /**Costructor inport the service util */
    constructor(private http: HttpClient) { }

    getModelList(): Observable<IModel[]> {
        return this.http.get<IModel[]>(this.urlModels);
    }

    getOption(modelCode: string): Observable<IOption> {
        return this.http.get<IOption>(this.urlOption + modelCode);
    }
}  