import { TestBed } from '@angular/core/testing';

import { FtchdrpdwnService } from './ftchdrpdwn.service';

describe('FtchdrpdwnService', () => {
  let service: FtchdrpdwnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtchdrpdwnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
