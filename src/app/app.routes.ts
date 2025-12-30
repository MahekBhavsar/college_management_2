import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Teacher } from './teacher/teacher';
import { Student } from './student/student';

export const routes: Routes = [
    {path:'dashboard',component:Dashboard},
    {path:'teacher',component:Teacher},
    {path:'student',component:Student},
    {path:'',redirectTo:'dashboard',pathMatch:"full"}
];
