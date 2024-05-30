import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.services';
import { Subscription } from 'rxjs';
import { TeslaService } from '../shared/services/car.services';
import { IConfiguration, IStepTwo } from '../shared/model/common.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-option.component.html',
  styleUrl: './config-option.component.scss'
})
export class ConfigOptionComponent implements OnInit {
  /**
   * object used to manipulate the DOM 
   * (display or hide selected options and checkbox if present) 
   * and save the user's choices
   */
  optionStepTwo!: IStepTwo;
  /**subscription stepOne
     * for lissen the value save for model for get the configuration */
  stepOneSub!: Subscription;
  /**subscription stepTwo 
   * for lissen the value save when user returns to step 2 */
  stepTwoSub!: Subscription;
  /**list of configuration */
  configList!: IConfiguration[];

  /**
  * Costructor inport the service util
  * @param teslaService 
  * @param commonService 
  * @param fb 
  */
  constructor(private teslaService: TeslaService, private commonsService: CommonService) { }

  /**
   * open the subscription stepOne and get the optionServices 
   * open the subscription stepTwo for listen to the previously 
   * saved values ​​when returning to the page
   */
  ngOnInit(): void {
    this.stepOneSub = this.commonsService.stepOne.subscribe(stepOne => {
      if (stepOne?.model) {
        this.getOptionService(stepOne.model);
      }
    })
    this.stepTwoSub = this.commonsService.stepTwo.subscribe(stepTwo => {
      this.optionStepTwo = {
        option: stepTwo?.option ?? null,
        yoke: stepTwo?.yoke ?? { isExist: false, isSelected: false },
        towHitch: stepTwo?.towHitch ?? { isExist: false, isSelected: false }
      }
    })
  }
  /**get value of range user selected */
  public get range(): number | null {
    return this.optionStepTwo?.option?.range ?? null
  }
  /**get value of speed user selected */
  public get speed(): number | null {
    return this.optionStepTwo?.option?.speed ?? null
  }
  /**get value of price user selected */
  public get price(): number | null {
    return this.optionStepTwo?.option?.price ?? null
  }
  /**get value of option id user selected */
  public get optionId(): number | string {
    return this.optionStepTwo?.option?.id ?? ''
  }

  /**
   * services option list set the attribute isExist for object towHitch and yoke 
   * populate the list of config
   * in case of error build a popup that informs the user
   * @param modelCode 
   */
  getOptionService(modelCode: string) {
    this.teslaService.getOption(modelCode).subscribe({
      next: (res) => {
        if (this.optionStepTwo) {
          this.optionStepTwo.towHitch.isExist = res.towHitch;
          this.optionStepTwo.yoke.isExist = res.yoke;
        }
        this.configList = res.configs;
      },
      error: (err) => { console.log("Error service") }
    });
  }

  /**
   * function that intercepts the change of the configSelect select.
   * set the new value of the BehaviorSubject with the user selected
   * @param configSelect 
   */
  onSelectConfig(configSelect?: string) {
    if (configSelect) {
      this.optionStepTwo.option = this.configList.find(config => config.id == Number(configSelect))
      this.commonsService.setStepTwo(this.optionStepTwo)
    } else {
      this.optionStepTwo.option = null;
      this.commonsService.setStepTwo(this.optionStepTwo)
    }
  }
  /**
   * function that intercepts the change of the inputTow.
   * set the new value of the BehaviorSubject with the user selected
   * @param value 
   */
  changeTow(value: boolean) {
    this.optionStepTwo.towHitch.isSelected = value
    this.commonsService.setStepTwo(this.optionStepTwo)
  }
  /**
   * function that intercepts the change of the inputyoke.
   * set the new value of the BehaviorSubject with the user selected
   * @param value 
   */
  changeYoke(value: boolean) {
    this.optionStepTwo.yoke.isSelected = value
    this.commonsService.setStepTwo(this.optionStepTwo)
  }

  /**
   * close the subscription stepOne and stepTwo
   */
  ngOnDestroy(): void {
    this.stepOneSub?.unsubscribe();
    this.stepTwoSub?.unsubscribe();
  }
}
