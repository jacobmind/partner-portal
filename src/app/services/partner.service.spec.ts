import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PartnerService } from './partner.service';
import { PARTNER_API_URL } from '../constants/api-endpoints';
import { Partner } from '../models/partner.model';

describe('PartnerService', () => {
  let service: PartnerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PartnerService],
    });
    service = TestBed.inject(PartnerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch partners', () => {
    const mockPartners: Partner[] = [
      { id: "1", partnerName: "Green Living", partnerType: "Influencer", conversions: 7, commissions: 420, grosssales: 620, contract: "Partner Default" },
      { id: "2", partnerName: "Tech Innovators", partnerType: "Affiliate", conversions: 5, commissions: 300, grosssales: 500, contract: "Custom Contract" },
    ];

    service.getPartners().subscribe((partners) => {
      expect(partners).toEqual(mockPartners);
    });

    const req = httpMock.expectOne(PARTNER_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockPartners);
  });
});
