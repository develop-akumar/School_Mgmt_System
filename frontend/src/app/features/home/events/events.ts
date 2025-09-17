import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../../services/api/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [DatePipe],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private apiService = inject(Api);

  ngOnInit(): void {
    this.getEvents();
  }

  events: any = [];
  getEvents() {
    this.apiService.getEvents().subscribe((res: any) => {
      if (res && res.status === 'Y') {
        this.events = res.data;
        console.log('this.events = ', this.events);
      }
    });
  }
}
