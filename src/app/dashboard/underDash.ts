import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-under-dash',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './underDash.html',
  styleUrls: ['./underDash.css'],
})
export class UnderDash {
  showRenewModal = false;
  renewFormData = { policyNo: '', renewDate: '' };

  submitRenewal() {
    // For now, just close the modal and reset the form
    this.showRenewModal = false;
    this.renewFormData = { policyNo: '', renewDate: '' };
    // You can add actual renewal logic here
    alert('Policy renewal submitted!');
  }
}