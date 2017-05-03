import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cat } from './cat';
import { CatService } from './cat.service';
import { Sort } from './sort';

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
	templateUrl: './cats-table.component.html',
  styleUrls: ['cats-table.component.css']
})

export class CatsTableComponent implements OnInit {
	
  selectedCat: Cat;
  cats: Cat[];
  sort =  new Sort("IsOnline", true);
  public model: any = {};
		
	constructor(
    private router: Router,
		private catService: CatService,
    private route: ActivatedRoute
	) {}
	
	ngOnInit(): void {
    this.catService.getAllCats(this.sort).then(cats => this.cats = cats);		
	}  

  showUser(cat: Cat): void {
		this.selectedCat = cat;
	}
  
  search(): void {
    if (this.model.value !== undefined && this.model.value.trim() !== "")
      this.catService.search(this.model.value, this.sort).then(cats => this.cats = cats);
    else
      this.catService.getAllCats(this.sort).then(cats => this.cats = cats);	
  }
  
  changeSorting(columnName: string): void{
    let sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
    this.search();
  }
  
	gotoDetail(): void {
		this.router.navigate(['/cat', this.selectedCat.id]);
	} 
}