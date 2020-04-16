import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/components/rob/wobertidle/services/utils.service';

@Component({
  selector: 'app-robsidenav',
  templateUrl: './robsidenav.component.html',
  styleUrls: ['./robsidenav.component.scss']
})
export class RobsidenavComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  public move() {
    const $threshhold = document.getElementById('robandmindysubnav');
    const $scroller = document.getElementById('rob-card');
    const threshBottom = $threshhold.getBoundingClientRect().bottom;
    const scrollerTop = $scroller.getBoundingClientRect().top;
    if (scrollerTop < threshBottom - 50) {
      this.utilsService.setNavPosStyles({position: 'fixed', top: threshBottom});
    } else {
      this.utilsService.setNavPosStyles({position: 'relative', top: 0});
    }
  }

}
