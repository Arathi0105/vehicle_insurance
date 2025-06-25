// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { NewPolicy } from './newPolicy/newPolicy';
import { UnderDash } from './dashboard/underDash';

export const routes: Routes = [
  { path: '', component: NewPolicy },
  { path: 'dashboard', component: UnderDash}
];
