import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchersJasmineComponent } from './matchers-jasmine.component';

describe('MatchersJasmineComponent', () => {
  let component: MatchersJasmineComponent;
  let fixture: ComponentFixture<MatchersJasmineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchersJasmineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchersJasmineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar o uso do matcher toEqual', () => {
    expect(true).toEqual(true);
    expect([1,2,3]).toEqual([1,2,3])
  });

  it('Deve testar o uso do mtcherr toBe', () => {
    let nomes = ['Mendel', 'João'];
    let nomes2 = ['Mendel', 'João'];

    expect(nomes).toBe(nomes);
  });

  it('Deve testar o uso do mtcherr toBeTruthy', () => {
    
    expect(true).toBeTruthy();
    expect(10).toBeTruthy();
    expect({}).toBeTruthy();
    
  });

  it('Deve testar o uso do mtcherr toBeFalsy', () => {
    
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
    expect(NaN).toBeFalsy(); 
  });

  it('Deve testar o uso do mtcherr toBeTrue', () => {
    expect(true).toBeTrue();
  });

  it('Deve testar o uso do mtcherr toBeFalse', () => {
    expect(false).toBeFalse();
    
  });

  it('Deve testar o uso do mtcherr not', () => {
    expect(10).not.toBeTrue();
  });

  it('Deve testar o uso do mtcherr toContain', () => {
    expect('10').toContain('10');
    expect(['10']).toContain('10');
  });

  it('Deve testar o uso do mtcherr toBeDefined', () => {
    let nomes = ['Mendel', 'João'];
    let nomes2 = ['Mendel', 'João'];

    expect(nomes).toBeDefined();
  });

  it('Deve testar o uso do mtcherr toBeUndefined', () => {
    let nomes = ['Mendel', 'João'];
    let nomes2;

    expect(nomes2).toBeUndefined();
  });

  it('Deve testar o uso do matcher toBeNull', () => {
    let nomes;
    let nomes2 = null;

    expect(nomes2).toBeNull();
  });

  it('Deve testar o uso do matcher toBeCloseTo', () => {
    expect(35.20).toBeCloseTo(35.2, 1);
  });

  it('Deve testar o uso do matcher toBeCloseTo', () => {
    expect('Marvel').toMatch(/rvel/);
  });

  it('Deve testar o uso do matcher toThrow', () => {
    expect( function () {
      throw new Error('Meu erro')
    }).toThrow();
  })
});


