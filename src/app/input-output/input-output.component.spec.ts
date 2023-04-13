import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputComponent } from './input-output.component';
import { By } from '@angular/platform-browser';

describe('InputOutputComponent', () => {
  let component: InputOutputComponent;
  let fixture: ComponentFixture<InputOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve receber usuário', () => {
    const user = {name: 'Danilo', email: 'danilodev.silva@gmail.com', password: '091011'};

    component.user = user;

    expect(component.user).toBe(user);
  });

  it('Deve emitir mensagem quando clicar no botão', ()=> {
    const emitMessageSpy = spyOn(component.userMessage, 'emit');

    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(emitMessageSpy).toHaveBeenCalled();
  })

});
