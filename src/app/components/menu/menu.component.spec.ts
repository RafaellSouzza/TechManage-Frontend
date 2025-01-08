import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu state', () => {
    expect(component.menuOpen).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should have menu closed initially', () => {
    expect(component.menuOpen).toBe(false);
  });

  it('should render menu items when menu is open', () => {
    component.menuOpen = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('.block.px-4.py-2');
    expect(menuItems.length).toBe(3);
    expect(menuItems[0].textContent).toContain('Página Inicial');
    expect(menuItems[1].textContent).toContain('Criar Usuário');
    expect(menuItems[2].textContent).toContain('Sair');
  });

  it('should not render menu items when menu is closed', () => {
    component.menuOpen = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector('.absolute');
    expect(menu).toBeNull();
  });

  it('should have correct router links', () => {
    component.menuOpen = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const routerLinks = compiled.querySelectorAll('a[routerLink]');
    expect(routerLinks.length).toBe(2);
    expect(routerLinks[0].getAttribute('routerLink')).toBe('/');
    expect(routerLinks[1].getAttribute('routerLink')).toBe('/create-user');
  });
});
