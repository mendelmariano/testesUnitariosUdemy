import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureDetectChangeComponent } from './fixture-detect-change.component';
import { By } from '@angular/platform-browser';

describe('FixtureDetectChangeComponent', () => {
  let component: FixtureDetectChangeComponent;
  let fixture: ComponentFixture<FixtureDetectChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureDetectChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureDetectChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve renderizar o title', () => {
    let title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toContain('Aprendendo')
  })
});
