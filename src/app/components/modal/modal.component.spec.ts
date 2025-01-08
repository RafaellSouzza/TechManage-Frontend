import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ComponenteModal', () => {
  let componente: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  it('não deve renderizar o modal quando isOpen for falso', () => {
    componente.isOpen = false;
    fixture.detectChanges();
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const modal = elementoRenderizado.querySelector('.fixed');
    expect(modal).toBeNull();
  });

  it('deve renderizar o modal quando isOpen for verdadeiro', () => {
    componente.isOpen = true;
    fixture.detectChanges();
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const modal = elementoRenderizado.querySelector('.fixed');
    expect(modal).toBeTruthy();
  });

  it('deve emitir o evento confirmar quando o método confirmar for chamado', () => {
    const confirmarSpy = jest.spyOn(componente.confirm, 'emit');
    componente.confirmar();
    expect(confirmarSpy).toHaveBeenCalled();
  });

  it('deve emitir o evento cancelar quando o método cancelar for chamado', () => {
    const cancelarSpy = jest.spyOn(componente.cancel, 'emit');
    componente.cancelar();
    expect(cancelarSpy).toHaveBeenCalled();
  });

  it('deve exibir o título e a mensagem corretos', () => {
    const tituloTeste = 'Teste de Título';
    const mensagemTeste = 'Teste de Mensagem';
    componente.title = tituloTeste;
    componente.message = mensagemTeste;
    componente.isOpen = true;
    fixture.detectChanges();

    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const elementoTitulo = elementoRenderizado.querySelector('h2')?.textContent;
    const elementoMensagem = elementoRenderizado.querySelector('p')?.textContent;

    expect(elementoTitulo).toContain(tituloTeste);
    expect(elementoMensagem).toContain(mensagemTeste);
  });

  it('deve exibir título e mensagem padrão quando não forem fornecidos', () => {
    componente.isOpen = true;
    fixture.detectChanges();

    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const elementoTitulo = elementoRenderizado.querySelector('h2')?.textContent;
    const elementoMensagem = elementoRenderizado.querySelector('p')?.textContent;

    expect(elementoTitulo).toContain('Confirmação');
    expect(elementoMensagem).toContain('Tem certeza que deseja continuar?');
  });

  it('deve emitir o evento confirmar ao clicar no botão de confirmação', () => {
    const confirmarSpy = jest.spyOn(componente.confirm, 'emit');
    componente.isOpen = true;
    fixture.detectChanges();

    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const botaoConfirmar = elementoRenderizado.querySelector('button.bg-red-500') as HTMLElement;
    botaoConfirmar.click();

    expect(confirmarSpy).toHaveBeenCalled();
  });

  it('deve emitir o evento cancelar ao clicar no botão de cancelar', () => {
    const cancelarSpy = jest.spyOn(componente.cancel, 'emit');
    componente.isOpen = true;
    fixture.detectChanges();

    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const botaoCancelar = elementoRenderizado.querySelector('button.bg-gray-500') as HTMLElement;
    botaoCancelar.click();

    expect(cancelarSpy).toHaveBeenCalled();
  });

  it('deve renderizar corretamente a estrutura do modal', () => {
    componente.isOpen = true;
    fixture.detectChanges();
    const elementoRenderizado = fixture.nativeElement as HTMLElement;
    const contêinerModal = elementoRenderizado.querySelector('.fixed');
    const conteudoModal = elementoRenderizado.querySelector('.bg-white');
    expect(contêinerModal).toBeTruthy();
    expect(conteudoModal).toBeTruthy();
  });
});
