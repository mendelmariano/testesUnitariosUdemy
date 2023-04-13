import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingComponentComponent } from './testing-component.component';
import { By } from '@angular/platform-browser';

describe('TestingComponentComponent', () => {
  let component: TestingComponentComponent;
  let fixture: ComponentFixture<TestingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve acessar lemento na DOM com debugElement.query()', ()=> {
    let title = fixture.debugElement.query(By.css('h1')).nativeElement

    expect(title.textContent).toContain('Trabalhando')
  });

  it('Deve acessar elemento na DOM com nativeElemet.querySelector()', () => {
    let paragaph = fixture.debugElement.nativeElement.querySelector('p');

    expect(paragaph.textContent).toContain('esta');
  });

  it('Deve ter background-color green botão sim', ()=> {
    let btnYes = fixture.debugElement.query(By.css('.btn-yes')).nativeElement

    expect(btnYes.style.backgroundColor).toBe('green')
  });

  it('Deve ter background-color red botão não', ()=> {
    let btnNo = fixture.debugElement.query(By.css('.btn-no')).nativeElement

    expect(btnNo.style.backgroundColor).toBe('red')
  });
});
