import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.services';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent implements OnInit {

  /**value link image */
  imgLink: string | null = null;
  /**subscription link img for lissen the change value */
  linkImgSub!: Subscription;
  /**
   * Costructor inport the service util
   * @param commonService 
   */
  constructor(private commonService: CommonService) { }

  /**
   * open the subscription linkImg and set the value of attribute imageLink with the value
   */
  ngOnInit(): void {
    this.linkImgSub = this.commonService.imgLink.subscribe(img => {
      this.imgLink = img ?? null;
    })
  }
  /**
   * close the subscription linkImag
   */
  ngOnDestroy(): void {
    this.linkImgSub?.unsubscribe();
  }
}
