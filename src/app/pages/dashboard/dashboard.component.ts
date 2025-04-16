import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {SortArrowComponent} from '../../components/sort-arrow/sort-arrow.component';
import { Partner, PartnerService } from '../../services/partner.service';
import {TableToolbarComponent} from '../../components/table-toolbar/table-toolbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    PaginationComponent,
    SortArrowComponent,
    NgIf,
    TableToolbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  partners: Partner[] = [];
  loading = false;
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.fetchPartners();
  }

  fetchPartners() {
    this.loading = true;
    this.partnerService.getPartners().subscribe({
      next: (data: any) => {
        // Convert the object with numeric keys to an array
        this.partners = Object.values(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch partners', err);
        this.loading = false;
      },
    });
  }

  get paginatedPartners() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.partners.slice(start, start + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortBy(column: string) {
    if (this.sortColumn === column) {
      // Toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortPartners();
  }

  sortPartners() {
    this.partners.sort((a: any, b: any) => {
      let valueA = a[this.sortColumn];
      let valueB = b[this.sortColumn];

      // If it's money, strip $ and commas
      if (typeof valueA === 'string' && valueA.includes('$')) {
        valueA = parseFloat(valueA.replace(/[$,]/g, '')) || 0;
        valueB = parseFloat(valueB.replace(/[$,]/g, '')) || 0;
      }

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }


}
