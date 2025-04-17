import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';
import {PARTNER_API_URL} from '../constants/api-endpoints';
@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(PARTNER_API_URL);
  }
}
