import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import { Partner, PartnerService } from '../../services/partner.service';
import {TableToolbarComponent} from '../../components/table-toolbar/table-toolbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    PaginationComponent,
    NgIf,
    TableToolbarComponent,
    NgOptimizedImage,
    CurrencyPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  partners: Partner[] = [];
  loading = false;
  itemsPerPage = 14;
  currentPage = 1;
  error: string | null = null;
  empty = false;

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.fetchPartners();
  }

  fetchPartners() {
    this.loading = true;
    this.error = null;
    this.empty = false;

    this.partnerService.getPartners().subscribe({
      next: (data: any) => {
        const items = Object.values(data || {}).map(item => item as Partner);

        if (!items.length) {
          this.empty = true;
        }

        this.partners = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load partners. Please try again later.';
        console.error('Fetch error:', err);
        this.loading = false;
      }
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
