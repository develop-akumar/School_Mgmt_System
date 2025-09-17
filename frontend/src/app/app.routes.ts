import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admission } from './features/admission/admission';
import { Events } from './features/events/events';
import { Gallery } from './features/gallery/gallery';
import { Notices } from './features/notices/notices';
import { Teachers } from './features/teachers/teachers';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Disclaimer } from './pages/disclaimer/disclaimer';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

export const routes: Routes = [
    {path:"", component:Home},
    {path:"home", component:Home},
    {path:"admission", component:Admission},
    {path:"event", component:Events},
    {path:"gallery", component:Gallery},
    {path:"notice", component:Notices},
    {path:"teacher", component:Teachers },
    {path:"contact-us", component:Contact},
    {path:"about", component:About},
    {path:"privacy", component:PrivacyPolicy},
    {path:"disclaimer", component:Disclaimer},
    {path:"dashboard", component:Dashboard},
    {path:"login", component:Login},
    {path:"**", redirectTo:"home"},
];
