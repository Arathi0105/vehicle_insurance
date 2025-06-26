import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './newPolicy.html',
  styleUrls: ['./newPolicy.css'],
})
export class NewPolicy implements OnInit {
  form: any = {
    vehicleNo: '',
    vehicleType: '',
    customerName: '',
    phoneNo: '',
    engineNo: '',
    chassisNo: '',
    premiumAmt: '',
    fromDate: '',
    toDate: '',
    underwriterId: '',
    insuranceType: '',
  };

  errors: { [key: string]: string } = {};
  showSuccess = false;
  showFail = false;
  underwriters: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/underwriters').subscribe(data => {
      this.underwriters = data;
    });
  }

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
    if (!/^[0-9]{10}$/.test(this.form.phoneNo)) {
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
    if (!this.form.underwriterId) {
      this.errors['underwriterId'] = 'This field is required.';
      valid = false;
    }
    if (!this.form.vehicleType) {
      this.errors['vehicleType'] = 'Vehicle type is required.';
      valid = false;
    }
    if (!this.form.insuranceType) {
      this.errors['insuranceType'] = 'Insurance type is required.';
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
    if (!valid) {
      this.showSuccess = false;
      this.showFail = true;
      this.cdr.detectChanges();
      return;
    }
    // Map insuranceType to backend expected value
    let type = '';
    if (this.form.insuranceType === 'full') type = 'Full Insurance';
    else if (this.form.insuranceType === 'third-party') type = 'Third Party';
    // Prepare payload for backend
    const payload = {
      ...this.form,
      type,
      underwriter: { underwriterId: this.form.underwriterId },
    };
    delete payload.underwriterId;
    delete payload.insuranceType;
    this.http.post('http://localhost:8080/api/insurances', payload).subscribe({
      next: (res) => {
        this.showSuccess = true;
        this.showFail = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.showSuccess = false;
        this.showFail = true;
        this.cdr.detectChanges();
      }
    });
  }
}
