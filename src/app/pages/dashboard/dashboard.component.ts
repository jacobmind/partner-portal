import { Component } from '@angular/core';
import {NgForOf } from '@angular/common';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {SortArrowComponent} from '../../components/sort-arrow/sort-arrow.component';
export interface Partner {
  id: number;
  name: string;
  type: string;
  contract: string;
  grossSales: string;
  commissions: string;
  conversions: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    PaginationComponent,
    SortArrowComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  itemsPerPage = 5;
  currentPage = 1;

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

  partners: Partner[] = [
    { id: 3235, name: 'CP', type: '', contract: 'Partner Default', grossSales: '$42.60', commissions: '$2.00', conversions: 2 },
    { id: 3651, name: 'CP QA 0404', type: '', contract: 'Partner Default', grossSales: '$0.00', commissions: '$0.00', conversions: 0 },
    { id: 3192, name: 'CPQA Signup Live 3', type: '', contract: 'Super Affiliate', grossSales: '$0.00', commissions: '$0.00', conversions: 0 },
    { id: 3077, name: 'CP Taste Shop Email', type: 'Influencer', contract: 'Super Affiliate', grossSales: '$0.00', commissions: '$0.00', conversions: 0 },
    { id: 2497, name: 'Oura Testing Partner', type: '', contract: 'Partner Default', grossSales: '$0.00', commissions: '$0.00', conversions: 0 },
    { id: 3088, name: 'Payment Testing 2', type: 'Brand Partnership', contract: 'Partner Default', grossSales: '$0.00', commissions: '$0.00', conversions: 0 },
    { id: 3076, name: 'Sweet & Bitter – Demo Partner', type: 'Ambassador', contract: 'Partner Default', grossSales: '$33,596.52', commissions: '$1,812.00', conversions: 1812 },
    // Add more if needed
  ];
}
