import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDropdownComponent } from './menu-dropdown.component';
import { By } from '@angular/platform-browser';

describe('MenuDropdownComponent', () => {
  let component: MenuDropdownComponent;
  let fixture: ComponentFixture<MenuDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir o texto "Menu" no botão quando carregado', () => {
    const button = fixture.nativeElement.querySelector('.dropdown-toggle');
    component.label = 'Menu';
    fixture.detectChanges();

    expect(button.textContent.trim()).toBe('Menu');
  });

  it('Deve abrir o menu quando clicar no botão', () => {
    const button = fixture.nativeElement.querySelector('.dropdown-toggle');
    button.click();

    fixture.detectChanges();

    const menu = fixture.nativeElement.querySelector('.dropdown-menu');
    expect(menu.classList.contains('show')).toBeTrue();
  });

  it('Deve exibir os itens do menu corretamente ', () => {
    component.items = [
      { label: 'Item 1', value: 'item-1'}, 
      { label: ' Item 2', value: 'item-2'}
    ];

    const button = fixture.nativeElement.querySelector('.dropdown-toggle');
    button.click();
    fixture.detectChanges();

    const menuItens = fixture.nativeElement.querySelectorAll('.dropdown-item');
    console.log(menuItens);
    expect(menuItens[0].textContent.trim()).toBe('Item 1');
  });

  it('Deve acionar o evento "selected" com o valor correto ao selecionar um item do menu ', () => {
    component.items = [
      { label: 'Item 1', value: 'item-1'}, 
      { label: ' Item 2', value: 'item-2'}
    ];
    const button = fixture.nativeElement.querySelector('.dropdown-toggle');
    button.click();

    fixture.detectChanges();

    const spied = spyOn(component.selected, 'emit');

    const menuItens = fixture.nativeElement.querySelectorAll('.dropdown-item');
    const item = component.items[0];
    menuItens[0].click();
    expect(spied).toHaveBeenCalledWith(item.value);

  })

});
