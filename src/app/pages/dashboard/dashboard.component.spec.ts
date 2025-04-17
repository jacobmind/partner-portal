import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { PartnerService } from '../../services/partner.service';
import { of, throwError } from 'rxjs';
import { Partner } from '../../models/partner.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockPartnerService: jasmine.SpyObj<PartnerService>;

  const mockPartners: Partner[] = [
    {
      id: '1',
      partnerName: 'Partner A',
      partnerType: 'Influencer',
      contract: 'Default',
      grosssales: 1000,
      commissions: 100,
      conversions: 5
    },
    {
      id: '2',
      partnerName: 'Partner B',
      partnerType: 'Affiliate',
      contract: 'Custom',
      grosssales: 2000,
      commissions: 200,
      conversions: 10
    }
  ];

  beforeEach(async () => {
    mockPartnerService = jasmine.createSpyObj('PartnerService', ['getPartners']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: PartnerService, useValue: mockPartnerService }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and map partner data correctly', () => {
    mockPartnerService.getPartners.and.returnValue(of(mockPartners));
    component.ngOnInit();

    expect(component.loading).toBeFalse();
    expect(component.partners.length).toBe(2);
    expect(component.partners[0].partnerName).toBe('Partner A');
  });

  it('should handle empty data response', () => {
    mockPartnerService.getPartners.and.returnValue(of([]));
    component.ngOnInit();

    expect(component.empty).toBeTrue();
    expect(component.partners.length).toBe(0);
  });

  it('should handle API error', () => {
    mockPartnerService.getPartners.and.returnValue(throwError(() => new Error('API failed')));
    component.ngOnInit();

    expect(component.loading).toBeFalse();
    expect(component.error).toContain('Something went wrong');
    expect(component.partners.length).toBe(0);
  });

  it('should return correct paginated data', () => {
    component.partners = mockPartners;
    component.itemsPerPage = 1;
    component.currentPage = 2;

    const result = component.paginatedPartners;
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should sort partners by conversions in ascending order', () => {
    component.partners = [...mockPartners];
    component.sortColumn = 'conversions';
    component.sortDirection = 'asc';

    component.sortPartners();

    expect(component.partners[0].conversions).toBeLessThan(component.partners[1].conversions);
  });

  it('should sort partners by conversions in descending order', () => {
    component.partners = [...mockPartners];
    component.sortColumn = 'conversions';
    component.sortDirection = 'desc';

    component.sortPartners();

    expect(component.partners[0].conversions).toBeGreaterThan(component.partners[1].conversions);
  });
});
