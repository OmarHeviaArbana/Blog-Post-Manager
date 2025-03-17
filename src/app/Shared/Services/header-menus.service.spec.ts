import { TestBed } from '@angular/core/testing';
import { HeaderMenusService } from './header-menus.service';
import { HeaderMenus } from '../Models/header-menus.dto';

describe('HeaderMenusService', () => {
  let service: HeaderMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial header state with showAuthSection: false and showNoAuthSection: true', () => {
    service.headerManagement.subscribe((menuState: HeaderMenus) => {
      expect(menuState.showAuthSection).toBeFalse();
      expect(menuState.showNoAuthSection).toBeTrue();
    });
  });

  it('should update header state correctly', () => {
    const newState: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false,
    };

    service.headerManagement.next(newState);

    service.headerManagement.subscribe((menuState: HeaderMenus) => {
      expect(menuState.showAuthSection).toBeTrue();
      expect(menuState.showNoAuthSection).toBeFalse();
    });
  });
});
