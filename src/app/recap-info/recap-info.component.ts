import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.services';
import { Subscription } from 'rxjs';
import { IColors, IStepTwo } from '../shared/model/common.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recap-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recap-info.component.html',
  styleUrl: './recap-info.component.scss'
})
export class RecapInfoComponent implements OnInit {
  /**modal subscription use for gat the modal selected */
  modalSub!: Subscription;
  /**color subscription use for get the color attribute selected */
  colorSub!: Subscription;
  /**stepTwo subscription use fot get the attribute config, yoke and  towHitch*/
  stepTwoSub!: Subscription;
  /**modal description selected */
  modal!: string | null;
  /**color object selected */
  color!: IColors | null;
  /** object option includes objects Config,yoke and  towHitch */
  option!: IStepTwo | null;
  /**
   * Costructor inport the service util
   * @param commonsService 
   */
  constructor(private commonsService: CommonService) { }

  /**
   * open the sabscription modelselect and set value of modal paramiter with the description
   * open the sabscription colorselect and set value of color paramiter
   * open the sabscription stepTwo and set value of option paramiter
   */
  ngOnInit(): void {
    this.modalSub = this.commonsService.modelSelected.subscribe(modal => {
      this.modal = modal?.description ?? null
    })
    this.colorSub = this.commonsService.colorSelected.subscribe(color => {
      this.color = color ?? null
    })
    this.stepTwoSub = this.commonsService.stepTwo.subscribe(stepTwo => {
      this.option = stepTwo ?? null
    })
  }
  /**
   * get the price of attribute option, color, yoke and towHitch
   * and return the total value
   */
  public get total(): number {
    let option = this.option?.option?.price ?? 0;
    let color = this.color?.price ?? 0
    let yoke = this.option?.yoke?.isSelected ? 1000 : 0;
    let towHitch = this.option?.towHitch?.isSelected ? 1000 : 0;
    return option + color + yoke + towHitch;
  }
  /**
   * close the modal subscription,
   * color subscription 
   * and stepTwo subscription
   */
  ngOnDestroy(): void {
    this.modalSub?.unsubscribe();
    this.colorSub?.unsubscribe();
    this.stepTwoSub?.unsubscribe();
  }
}
