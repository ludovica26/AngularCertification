import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../shared/services/common.services';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent implements OnInit {
  /**
   * Costructor import the service util
   * @param commonService 
   * @param router 
   */
  constructor(private commonService: CommonService, private router: Router) { }

  /**boolean to defined enabled or disalbed button step three */
  isStepThree: boolean = true;
  /**boolean to defined enabled or disalbed button step two */
  isStepTwo: boolean = true;
  stepOneSub!: Subscription;
  stepTwoSub!: Subscription;
  /**
   * open sabscription stepOne for lissen the change value and 
   * anabled or disabled step two and three
   */
  ngOnInit(): void {

    this.stepOneSub = this.commonService.stepOne.subscribe(value => {
      if (value) {
        this.isStepTwo = false;
      } else {
        this.isStepTwo = true;
        this.isStepThree = true
        this.router.navigate(['/'])
      }
    })
    this.commonService.stepTwo.subscribe(value => {
      if (value?.option) {
        this.isStepThree = false;
      } else {
        this.isStepThree = true;
      }
    })
  }
  /**
 * close the subscription stepTwoSub and stepOneSub
 */
  ngOnDestroy(): void {
    this.stepTwoSub?.unsubscribe();
    this.stepOneSub?.unsubscribe();
  }
}
