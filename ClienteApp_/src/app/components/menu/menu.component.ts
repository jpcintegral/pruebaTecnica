import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAdmin: boolean = false;
  constructor() { 
   
  }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

}
