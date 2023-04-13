import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MyServiceService } from './my-service.service';

class MyServiceMock extends MyServiceService {
  response = [
    {
      "id": 1,
      "name": "Mendel",
      "email": "mendel@email.com",
      "age": "33"
    }
  ];
  override getUsers() {
    return of(this.response)
  }

}

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MyServiceService,
          useClass: MyServiceMock
        }
      ]
    });
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada HTTP', () => {
    const response = [
      {
        "id": 1,
        "name": "Mendel",
        "email": "mendel@email.com",
        "age": "33"
      }
    ];
    service.getUsers().subscribe(res => {
      expect(res).toEqual(response)
    })
  });
});
