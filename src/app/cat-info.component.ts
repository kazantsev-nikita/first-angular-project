import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { CatService } from './cat.service';
import { Cat } from './cat';

import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
	selector: 'cat-info',
	templateUrl: './cat-info.component.html'
})

export class CatInfoComponent implements OnInit {
	
  
  cat: Cat;
	
	constructor(
		private catService: CatService,
		private route: ActivatedRoute,
		private location: Location
	) {}
	
	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.catService.getById(params['id']))
			.subscribe(cat => this.cat = cat);
	}	  
}