import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Auth/actions';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<AppState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<AppState>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show NoAuth section when user is not logged in', () => {
    store.overrideSelector('auth', { credentials: { access_token: '' } });
    fixture.detectChanges();

    expect(component.showNoAuthSection).toBeTrue();
    expect(component.showAuthSection).toBeFalse();
  });

  it('should show Auth section when user is logged in', () => {
    store.overrideSelector('auth', { credentials: { access_token: 'mock-token' } });
    fixture.detectChanges();

    expect(component.showAuthSection).toBeTrue();
    expect(component.showNoAuthSection).toBeFalse();
  });

  it('should dispatch logout action and navigate to home on logout', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigateByUrl');

    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(AuthAction.logout());
    expect(router.navigateByUrl).toHaveBeenCalledWith('home');
  });
});
