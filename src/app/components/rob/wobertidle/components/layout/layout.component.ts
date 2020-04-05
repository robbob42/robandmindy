import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public navigation: string;
  constructor() { }

  ngOnInit(): void {
    this.navigation = 'home';
  }

  setNav(nav) {
    this.navigation = nav;
  }

}
