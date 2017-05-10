import { TestBed, inject } from '@angular/core/testing';

//aanmaken nog
import { KweetService } from './kweet.service';

describe('KweetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KweetService]
    });
  });

  it('should ...', inject([KweetService], (service: KweetService) => {
    expect(service).toBeTruthy();
  }));
});