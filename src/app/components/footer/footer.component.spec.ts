import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('ComponenteFooter', () => {
  let componente: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deve renderizar a imagem do logo com os atributos src e alt corretos', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const logoImage = elementoRenderizado.querySelector('img') as HTMLImageElement;
    expect(logoImage).toBeTruthy();
    expect(logoImage.src).toContain('assets/imagens/logo/ibm-svgrepo-com.svg');
    expect(logoImage.alt).toBe('Logo IBM');
  });

  it('deve exibir o texto de direitos autorais correto', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const textoDireitosAutorais = elementoRenderizado.querySelector('p')?.textContent;
    expect(textoDireitosAutorais).toBe('© 2025 TechManage');
  });

  it('deve aplicar as classes CSS corretas ao contêiner do rodapé', () => {
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const footerContainer = elementoRenderizado.querySelector('div') as HTMLElement;
    expect(footerContainer.classList).toContain('flex');
    expect(footerContainer.classList).toContain('bg-gray-800');
    expect(footerContainer.classList).toContain('text-white');
  });
});
