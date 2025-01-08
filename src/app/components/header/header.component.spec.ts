import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ComponenteHeader', () => {
  let componente: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deve alternar o estado do menu', () => {
    expect(componente.menuOpen).toBe(false);
    componente.toggleMenu();
    expect(componente.menuOpen).toBe(true);
    componente.toggleMenu();
    expect(componente.menuOpen).toBe(false);
  });

  it('deve renderizar o logo com os atributos src e alt corretos', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const logoImage = elementoRenderizado.querySelector('img') as HTMLImageElement;
    expect(logoImage).toBeTruthy();
    expect(logoImage.src).toContain('assets/imagens/logo/ibm-svgrepo-com.svg');
    expect(logoImage.alt).toBe('Logo IBM');
  });

  it('deve renderizar o nome da aplicação com o routerLink correto', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const appName = elementoRenderizado.querySelector('a') as HTMLAnchorElement;
    expect(appName).toBeTruthy();
    expect(appName.textContent).toBe('TechManage');
    expect(appName.getAttribute('routerLink')).toBe('/');
  });

  it('deve incluir o componente app-menu', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const menuElement = elementoRenderizado.querySelector('app-menu');
    expect(menuElement).toBeTruthy();
  });

  it('deve alternar o estado menuOpen ao chamar toggleMenu', () => {
    expect(componente.menuOpen).toBe(false);
    componente.toggleMenu();
    expect(componente.menuOpen).toBe(true);
    componente.toggleMenu();
    expect(componente.menuOpen).toBe(false);
  });

  it('deve aplicar as classes CSS corretas ao contêiner do cabeçalho', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const headerContainer = elementoRenderizado.querySelector('div') as HTMLElement;
    expect(headerContainer.classList).toContain('flex');
    expect(headerContainer.classList).toContain('items-center');
    expect(headerContainer.classList).toContain('bg-gray-800');
    expect(headerContainer.classList).toContain('text-white');
  });
});
