import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpyonServiceService } from './spyon-service.service';
import { of } from 'rxjs';

describe('SpyonServiceService', () => {
  let service: SpyonServiceService;
  const logger = jasmine.createSpy("log");
  const status = jasmine.createSpyObj('service', ['name', 'age', 'email'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SpyonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar uma lista de usuários', () => {
    const response = [
      {name: 'Mendel', age: 33, email: 'mendel@email.com'},
      {name: 'João', age: 335, email: 'joaoa@email.com'}
    ]

    spyOn(service, 'getUsers').and.returnValue(of(response));

    service.getUsers().subscribe(res => {
      expect(res).toEqual(response)
    })
  });

  it('Deve criar método com jasmine createSpy', () => {
    logger('Loguei no sistema');
    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith('Loguei no sistema');
  });

  it('Deve criar métodos com jasmine.createSpyObj', () => {
    status.name('Danilo');
    status.email('mendeel@gmail.com')

    expect(status.name).toHaveBeenCalledTimes(1);
    expect(status.email).toHaveBeenCalledWith('mendeel@gmail.com');
  })


});
