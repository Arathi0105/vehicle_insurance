import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newPolicy.html',
  styleUrls: ['./newPolicy.css'],
})
export class NewPolicy {
  form: any = {
    vehicleNo: '',
    customerName: '',
    phoneNo: '',
    engineNo: '',
    chassisNo: '',
    premiumAmt: '',
    fromDate: '',
    toDate: '',
    underwriterId: '',
    
  };

  errors: { [key: string]: string } = {};
  showSuccess = false;
  showFail = false;

  validateForm() {
    this.errors = {};
    let valid = true;

    if (!this.form.vehicleNo.trim() || this.form.vehicleNo.length > 10) {
      this.errors['vehicleNo'] = 'Max 10 characters required.';
      valid = false;
    }

    if (!this.form.customerName.trim() || this.form.customerName.length > 50) {
      this.errors['customerName'] = 'Max 50 characters required.';
      valid = false;
    }

    if (!/^\d{10}$/.test(this.form.phoneNo)) {
      this.errors['phoneNo'] = 'Enter exactly 10 digits.';
      valid = false;
    }

    if (
      this.form.engineNo.length < 10 ||
      this.form.engineNo.length > 18
    ) {
      this.errors['engineNo'] = '10–18 characters required.';
      valid = false;
    }

    if (
      this.form.chassisNo.length < 10 ||
      this.form.chassisNo.length > 18
    ) {
      this.errors['chassisNo'] = '10–18 characters required.';
      valid = false;
    }

    const premium = Number(this.form.premiumAmt);
    if (!this.form.premiumAmt || isNaN(premium) || premium <= 0) {
      this.errors['premiumAmt'] = 'Enter a valid positive number.';
      valid = false;
    }

    if (this.form.toDate <= this.form.fromDate) {
      this.errors['toDate'] = 'To Date must be after From Date.';
      valid = false;
    }

    if (!this.form.underwriterId.trim()) {
      this.errors['underwriterId'] = 'This field is required.';
      valid = false;
    }
    return valid;
  }

  closePopup() {
    this.showSuccess = false;
    this.showFail = false;
  }

  submitForm() {
    let valid = this.validateForm();
    this.showSuccess = valid;
    this.showFail = !valid;
  }
}
