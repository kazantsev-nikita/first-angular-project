import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CatInfoComponent } from './cat-info.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login.component';
import { FriendsListComponent } from './friends-list.component';
import { CatsTableComponent } from './cats-table.component';

import { CatService } from './cat.service';
import { AuthenticationService } from './login.service';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		CatInfoComponent,
    LoginComponent,
    FriendsListComponent,
    CatsTableComponent
	],
	providers: [ 
		CatService,
  AuthenticationService    
	],
	bootstrap: [ AppComponent ]
})

export class AppModule { }