import { Component } from '@angular/core';
// import { ContactDashboard } from './contact-dashboard/contact-dashboard';
import { EventsDashboard } from './events-dashboard/events-dashboard';
import { GalleryDashboard } from './gallery-dashboard/gallery-dashboard';
import { NoticeDashboard } from './notice-dashboard/notice-dashboard';
import { TeachersDashboard } from './teachers-dashboard/teachers-dashboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    TeachersDashboard,
    FormsModule,
    // ContactDashboard,
    TeachersDashboard,
    GalleryDashboard,
    NoticeDashboard,
    EventsDashboard,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  selectedMenu: string = 'events';
}
