import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined | product[];
constructor(private activaterout :ActivatedRoute , private product :ProductService){}
ngOnInit(): void {
  let query=this.activaterout.snapshot.paramMap.get('query');
  console.warn(query);
  query && this.product.searchproduct(query).subscribe((result)=>{
    this.searchResult=result;

  })
}
}
