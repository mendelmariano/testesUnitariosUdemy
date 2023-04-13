import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { AutoDetectChangeComponent } from './auto-detect-change.component';
import { By } from '@angular/platform-browser';


describe('AutoDetectChangeComponent', () => {
  let component: AutoDetectChangeComponent;
  let fixture: ComponentFixture<AutoDetectChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDetectChangeComponent ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoDetectChangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar a exibição de texto ao clicar no botão usando um trigger', () => {
    
    let emoji = fixture.debugElement.query(By.css('h1')).nativeElement;
    let button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);
    
    fixture.detectChanges();
    expect(emoji.textContent).toBe('👨‍🎓');
  });

  it('Deve testar a exibição de texto ao clicar no botão', () => {
    
    let emoji = fixture.debugElement.query(By.css('h1')).nativeElement;
    let button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();
    expect(emoji.textContent).toBe('👨‍🎓');
  });

});
