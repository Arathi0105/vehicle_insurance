import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Underwriter {
  underwriterId: string;
  name: string;
}

interface Insurance {
  policyNo: string;
  vehicleNo: string;
  vehicleType: string;
  customerName: string;
  engineNo: number;
  chassisNo: number;
  phoneNo: number;
  type: string;
  premiumAmt: number;
  fromDate: string;
  toDate: string;
  underwriter: Underwriter;
}

@Component({
  selector: 'app-under-dash',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './underDash.html',
  styleUrls: ['./underDash.css'],
})
export class UnderDash {
  showRenewModal = false;
  renewFormData = { policyNo: '', renewDate: '' };

  underwriters: Underwriter[] = [];
  selectedUnderwriterId: string = '';
  policies: Insurance[] = [];
  loadingPolicies = false;
  loadingUnderwriters = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.fetchUnderwriters();
  }

  fetchUnderwriters() {
    this.loadingUnderwriters = true;
    this.http.get<Underwriter[]>('http://localhost:8080/api/underwriters')
      .subscribe({
        next: (data) => {
          this.underwriters = data;
          this.loadingUnderwriters = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching underwriters:', error);
          this.loadingUnderwriters = false;
          this.cdr.detectChanges();
        }
      });
  }

  onUnderwriterChange() {
    if (!this.selectedUnderwriterId) {
      this.policies = [];
      this.cdr.detectChanges();
      return;
    }
    
    this.loadingPolicies = true;
    this.policies = []; // Clear previous policies
    this.cdr.detectChanges();
    
    this.http.get<Insurance[]>(`http://localhost:8080/api/insurances/by-underwriter/${this.selectedUnderwriterId}`)
      .subscribe({
        next: (data) => {
          this.policies = data;
          this.loadingPolicies = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching policies:', error);
          this.policies = [];
          this.loadingPolicies = false;
          this.cdr.detectChanges();
        }
      });
  }

  submitRenewal() {
    this.showRenewModal = false;
    this.renewFormData = { policyNo: '', renewDate: '' };
    alert('Policy renewal submitted!');
  }
}