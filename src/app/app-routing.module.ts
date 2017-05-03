import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatInfoComponent } from './cat-info.component';
import { LoginComponent } from './login.component';
import { CatsTableComponent } from './cats-table.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'cat/:id', component: CatInfoComponent },
	{ path: 'table', component: CatsTableComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}