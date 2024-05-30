import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/services/car.services';
import { IColors, IModel } from '../shared/model/common.interface';
import { CommonModule } from '@angular/common';
import { CommonService } from '../shared/services/common.services';
import { formatImgLink, pathImgLink } from './config-moder-color.component.const';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-config-model-color',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './config-model-color.component.html',
})
export class ConfigModelColorComponent implements OnInit {

  /**Form group with model and color select */
  formStepOne!: FormGroup;
  /**list of model */
  modelList!: IModel[];
  /**list of color valued when a model is selected */
  colorList: IColors[] = [];
  /**subscription stepOne 
   * for lissen the value save when user returns to step 1 */
  stepOneSub!: Subscription;

  /**
   * Costructor inport the service util
   * @param teslaService 
   * @param commonService 
   * @param fb 
   */
  constructor(private teslaService: TeslaService,
    private commonService: CommonService,
    private fb: FormBuilder) { }

  /**
   * initializes the form 
   * and listens to the stepone parameter to override the form.
   * calls the modelList service
   */
  ngOnInit(): void {
    this.formStepOne = this.fb.group({
      model: new FormControl(''),
      color: new FormControl(''),
    })

    this.getModelService();
    this.stepOneSub = this.commonService.stepOne.subscribe(value => {
      if (value) {
        this.model.setValue(value.model ?? '')
        this.color.setValue(value.color ?? '')
      }
    })
  }
  /**Get form controls "model" */
  public get model() {
    return this.formStepOne.controls['model'];
  }
  /**Get form controls "color" */
  public get color() {
    return this.formStepOne.controls['color'];
  }
  /**
   * services for get the list of model 
   * in case of error build a popup that informs the user
   */
  getModelService() {
    this.teslaService.getModelList().subscribe({
      next: (res) => {
        this.modelList = res;
        this.setColorList()
      },
      error: (err) => { console.log("error service") }
    });
  }

  /**
   * function that intercepts the change of the modelSelect select.
   *  Reset session items. 
   * Populate the list with colors
   * set the object modal selected in a modalSelected BehaviorSubject
   */
  selectedModel(): void {
    this.colorList = []
    this.color.setValue('')
    this.commonService.resetAll();
    let modal: IModel | undefined = this.modelList?.find(model => model.code == this.model.value)
    this.commonService.setModelSelected(modal ?? null)
    this.setColorList();
  }


  /**
   * function that intercepts the change of the colorSelect select.
   * set the object color selected in a colorSelected BehaviorSubject
   * create a string imgLink with the model and color user selected
   */
  selectedColor(): void {

    if (this.color.value) {
      let color: IColors | undefined = this.colorList?.find(color => color.code == this.color.value)
      this.commonService.setColorSelected(color ?? null)
      this.commonService.setStepOne({ model: this.model.value, color: this.color.value })
      this.commonService.setImgLink(pathImgLink + this.model.value + "/" + this.color.value + formatImgLink)
    } else {
      this.commonService.resetAll();
    }
  }

  /**
   * function that enhances the list of possible colors based on the chosen model
   */
  setColorList(): void {
    if (this.model.value) {
      this.modelList.forEach(model => {
        if (model.code == this.model.value) {
          this.colorList = model.colors;
        }
      });
    }
  }
  /**
   * close the subscription stepOne
   */
  ngOnDestroy(): void {
    this.stepOneSub?.unsubscribe();
  }
}
