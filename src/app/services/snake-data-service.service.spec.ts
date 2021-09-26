import { TestBed } from '@angular/core/testing';

import { SnakeDataServiceService } from './snake-data-service.service';

describe('SnakeDataServiceService', () => {
  let service: SnakeDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
