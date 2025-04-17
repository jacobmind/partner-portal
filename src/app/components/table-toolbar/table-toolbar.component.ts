import { Component } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-table-toolbar',
  imports: [
    ModalComponent,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './table-toolbar.component.html',
})
export class TableToolbarComponent {
  modalMessage = '';
  isModalOpen = false;
  showMobileActions = false;

  openModal(message: string) {
    this.modalMessage = message;
    this.isModalOpen = true;
  }
}
