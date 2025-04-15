import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  imports: [
  ]
})
export class SortArrowComponent {
  @Input() direction: 'asc' | 'desc' | '' = '';
}
