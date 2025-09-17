import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit{

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

}
