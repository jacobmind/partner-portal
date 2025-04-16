import { Component } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-table-toolbar',
  imports: [
    ModalComponent,
    NgOptimizedImage
  ],
  templateUrl: './table-toolbar.component.html',
  styleUrl: './table-toolbar.component.css'
})
export class TableToolbarComponent {
  modalMessage = '';
  isModalOpen = false;

  openModal(message: string) {
    this.modalMessage = message;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
