import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';

describe('ComponenteMainLayout', () => {
  let componente: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MainLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deve chamar ngOnInit e inicializar corretamente', () => {
    const ngOnInitSpy = jest.spyOn(componente, 'ngOnInit');
    componente.ngOnInit();
    expect(ngOnInitSpy).toHaveBeenCalled();
  });

  it('deve renderizar o app-header', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const headerElement = elementoRenderizado.querySelector('app-header');
    expect(headerElement).toBeTruthy();
  });

  it('deve renderizar o router-outlet', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const routerOutletElement = elementoRenderizado.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy();
  });

  it('deve renderizar o app-footer', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const footerElement = elementoRenderizado.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });

  it('deve ter as classes CSS corretas no contêiner principal do layout', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const mainContainer = elementoRenderizado.querySelector('div') as HTMLElement;
    expect(mainContainer.classList).toContain('flex');
    expect(mainContainer.classList).toContain('flex-col');
    expect(mainContainer.classList).toContain('h-screen');
  });

  it('deve ter o elemento main com as classes corretas', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const mainElement = elementoRenderizado.querySelector('main') as HTMLElement;
    expect(mainElement).toBeTruthy();
    expect(mainElement.classList).toContain('flex-1');
    expect(mainElement.classList).toContain('bg-gray-100');
  });

  it('deve ter um contêiner com classes de padding', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const container = elementoRenderizado.querySelector('.container') as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.classList).toContain('mx-auto');
    expect(container.classList).toContain('px-4');
    expect(container.classList).toContain('py-6');
  });
});
