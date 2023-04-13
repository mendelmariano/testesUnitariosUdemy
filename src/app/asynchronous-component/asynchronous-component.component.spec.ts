import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AsynchronousComponentComponent } from './asynchronous-component.component';
import { HttpService } from '../service/http.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AsynchronousComponentComponent', () => {
  let component: AsynchronousComponentComponent;
  let fixture: ComponentFixture<AsynchronousComponentComponent>;
  let http: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsynchronousComponentComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsynchronousComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Deve fazer teste para obter lista de usuários', () => {
    const response = [
      {
        "name": "Mendel",
        "email": "mendel@emal.com",
        "age": "34",
        "id": 1
      },
      {
        "id": 3,
        "name": "Joao",
        "email": "joao@gmail.com",
        "age": 22
      },
      {
        "id": 4,
        "name": "Joao",
        "email": "joao@gmail.com",
        "age": 22
      },
      {
        "id": 0.8230837961873159,
        "name": "Danilo ",
        "email": "danilo@gmail.com",
        "age": "30"
      },
      {
        "id": 0.5650054352053537,
        "name": "Mendel",
        "email": "mendel@emal.com",
        "age": "33"
      }
    ];

    spyOn(http, 'getUsers').and.returnValue(of(response));

    component.getUsers();
    expect(component.data).toEqual(response);
  });


  it('Deve fazer teste para obter lista de usuários com PROMISE', async () => {
    const response = [
      {
        "name": "Mendel",
        "email": "mendel@emal.com",
        "age": "34",
        "id": 1
      },
      {
        "id": 3,
        "name": "Joao",
        "email": "joao@gmail.com",
        "age": 22
      },
      {
        "id": 4,
        "name": "Joao",
        "email": "joao@gmail.com",
        "age": 22
      },
      {
        "id": 0.8230837961873159,
        "name": "Danilo ",
        "email": "danilo@gmail.com",
        "age": "30"
      },
      {
        "id": 0.5650054352053537,
        "name": "Mendel",
        "email": "mendel@emal.com",
        "age": "33"
      }
    ];

    spyOn(http, 'getUsersWithPromise').and.returnValue(Promise.resolve(response));

    await component.getUsersWithPromise();
    expect(component.dataPromise).toEqual(response);
  });

  it('Deve logar usuário', (done: DoneFn) => {
    const loggedOut = fixture.debugElement.query(By.css('.logged-out')).nativeElement

    let spy = spyOn(http, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.isAuthenticaded();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      const logged = fixture.debugElement.query(By.css('.logged')).nativeElement
      expect(logged.textContent).toBe('Logado')
      done()
    });
    expect(loggedOut.textContent).toBe('Deslogado')
  });


  it('Deve logar usuário com whenStable', async () => {
    const loggedOut = fixture.debugElement.query(By.css('.logged-out')).nativeElement;
    expect(loggedOut.textContent).toBe('Deslogado');

    spyOn(http, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.isAuthenticaded();

    fixture.whenStable().then(()=> {
      fixture.detectChanges();
      const logged = fixture.debugElement.query(By.css('.logged')).nativeElement;

      expect(logged.textContent).toBe('Logado');
    })
  });

  it('Deve setar o nome', fakeAsync(
    () => {
      component.defineValue();
      tick(100);
      expect(component.name).toEqual('Jessica');
    }
  ) )


});
