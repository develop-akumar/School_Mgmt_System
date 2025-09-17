import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api/api';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-notice',
  imports: [RouterLink],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
})
export class Notice implements OnInit {
  constructor(private apiService: Api) {}

  getNotices() {
    this.apiService.getNotices().subscribe((res: any) => {
      if (res && res['status'] === 'Y') {
        let noticeArray = res.data.map((n: any) => n.title);
        this.notices = noticeArray.join(', ');
        console.log('this.notices = ', this.notices);
      }
    });
  }

  ngOnInit(): void {
    this.getNotices();
  }

  notices = '';
}
