import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isListCompany:boolean=true
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToAddEmployee() {
    this.isListCompany=false
    this.router.navigateByUrl('add')
  }
  goToListEmployee() {
    this.isListCompany=true
    this.router.navigateByUrl('')
  }
}
