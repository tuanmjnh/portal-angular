import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  fillerNav = [
    { routerLink: 'auth', name: 'Login' },
    { routerLink: 'dashboard', name: 'Dashboard' },
    { routerLink: 'languages', name: 'Language' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
