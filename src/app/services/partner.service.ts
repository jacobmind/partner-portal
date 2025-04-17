import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Partner {
  id: string;
  partnerName: string;
  partnerType: string;
  contract: string;
  grosssales: number;
  commissions: number;
  conversions: number;
}

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private apiUrl = 'https://mockanapi.com/s/67ae1b3403f9ffca6f47eb79/partners?mock_delay=1000';

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl);
  }
}
