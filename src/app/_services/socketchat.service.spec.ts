import { TestBed } from '@angular/core/testing';

import { SocketchatService } from './socketchat.service';

describe('SocketchatService', () => {
  let service: SocketchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
