import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Cat } from './cat';
import { CatService } from './cat.service';

import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
	selector: 'friends-list',
	templateUrl: './friends-list.component.html'
})

export class FriendsListComponent implements OnInit {
	
  selectedCat: Cat;
  friends: Cat[];
		
	constructor(
    private router: Router,
		private catService: CatService,
    private route: ActivatedRoute
	) {}
	
	ngOnInit(): void {
		this.route.params
        .switchMap((params: Params) => this.catService.getFriends(+params['id']))
        .subscribe(friends => this.friends = friends);
	}

  showUser(cat: Cat): void {
		this.selectedCat = cat;
	}
	
	gotoDetail(): void {
		this.router.navigate(['/cat', this.selectedCat.id]);
	}
  
  goToTable() : void {
    this.router.navigate(['/table']);
  }
}