import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const service: ItemsService = TestBed.get(ItemsService);
    expect(service).toBeTruthy();
  });
});
