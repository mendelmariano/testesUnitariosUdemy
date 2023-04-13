import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let htppTestingController: HttpTestingController;
  let url: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    htppTestingController = TestBed.inject(HttpTestingController)
    url = 'http://localhost:3000'
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET por id', () => {
    const id = 3;
    const response = { name: 'Danilo' }
    service.getUsersById(id).subscribe(
      res => {
        expect(res).toBe(response)
      }
    )
    const request = htppTestingController.expectOne(`${url}/users/${id}`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response)

  });

  it('Deve realizar chamada GET para obter usuários', () => {
    service.getUsers().subscribe();
    const request = htppTestingController.expectOne(`${url}/users`)
    request.flush({});
    expect(request.request.method).toBe('GET');
  });

  it('Deve gerar erro ao obter usuarios', () => {
    service.getUsers().subscribe({
      error: (erro) => {
        expect(erro.status).toBe(500)
      }
    });

    const request = htppTestingController.expectOne(`${url}/users`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users`);

    request.flush(500, {
      status: 500,
      statusText: 'Erro ao obter usuário'
    })
  });


  it('Deve fazer requisição POST para cadastrar usuário', () => {
    const user = {
      "id": 0.5650054352053537,
      "name": "Mendel",
      "email": "mendel@emal.com",
      "age": "33"
    };
    const response = {
      "id": 0.5650054352053537,
      "name": "Mendel",
      "email": "mendel@emal.com",
      "age": "33"
    }

    service.postUser(user).subscribe(res => {
      expect(res).toBe(response)
    });
    const request = htppTestingController.expectOne(`${url}/users`);
    expect(request.request.method).toBe('POST');
    request.flush(response)
  });

  it('Deve testar o method PUT de usuários', () => {
    const id = 1;
    const user = {
      "name": "Mendel",
      "email": "mendel@emal.com",
      "age": "34",
      "id": 1
    }

    const response = {
      "name": "Mendel",
      "email": "mendel@emal.com",
      "age": "34",
      "id": 1
    }

    service.putUser(id, user).subscribe(res => {
      expect(res).toBe(response)
    })

    const request = htppTestingController.expectOne(`${url}/users/${id}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);
  })

  it('Deve testar o DELETE usuários', () => {
    const id = 2;
    const response = {};
    service.deleteUser(id).subscribe( res => {
      expect(res).toBe(response)
    });

    const request = htppTestingController.expectOne(`${url}/users/${id}`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);  
  });

  it('Deve testar headers com token', () => {
    service.getUserWithHeaders().subscribe();

    const request = htppTestingController.expectOne(`${url}/users`);

    expect(request.request.headers.has('content-type')).toEqual(true);
    expect(request.request.headers.has('Authorization')).toEqual(true);
  });

});
