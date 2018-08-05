import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  public searchValue: string;
  @Output() search = new EventEmitter<string>();

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public find(): void {
    this.search.emit(this.searchValue);
  }

  public openAddCoursePage() {
    this.router.navigate(['courses', 'new']);
  }

}
