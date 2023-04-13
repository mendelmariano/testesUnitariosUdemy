import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

import { FormLoginComponent } from './form-login.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let service: HttpService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar que o formulário é inválido', () => {
    const result = component.isValidForm();

    expect(result).toBe(false)
  });

  it('Deve retornar que formulário é válido', () => {
    component.form.controls['email'].setValue('email@email.com');
    component.form.controls['password'].setValue('asdasdasdasd');

    const result = component.isValidForm();

    expect(result).toBe(true);
  });

  it('Deve estar desabilitado o botão quando o formulário for inválido', () => {
    // Duas formas de selecionar o botão
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    const button2 = fixture.debugElement.nativeElement.querySelector('button');

    expect(button.disabled).toBeTruthy();
    expect(button2.disabled).toBeTruthy();
  });

  it('Deve testar se o botão está ativo quando o formulário estiver válido', () => {
    component.form.controls['email'].setValue('email@email.com');
    component.form.controls['password'].setValue('asdasdasdasd');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();

  });

  it('Deve retornar o valor de um controle de formulário', () => {
    component.form = new FormGroup({
      email: new FormControl('mendel@email.com'),
      password: new FormControl('123123'),
    });

    expect(component.getValueControl(component.form, 'password')).toBe('123123')
  });

  it('Deve criar payload para submeter para api', () => {
    const payload = {
      email: 'mendel@email.com',
      password: '123456'
    }
    expect(component.createPayload('mendel@email.com', '123456')).toEqual(payload)
  });

  it('Deve realizar login', ()=> {
    component.form = new FormGroup({
      email: new FormControl('joao@email.com'),
      password: new FormControl('123456'),
    });

    let response = {
      "email": "joao@email.com",
      "password": "123456",
      "id": 8
    }

    let spied = spyOn(service, 'login').and.returnValue(of(response));

    component.isValidForm();
    component.login();

    expect(spied).toHaveBeenCalledTimes(1)
  })

});
