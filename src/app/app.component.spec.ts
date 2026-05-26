import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let platformReadySpy: Promise<void>;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(waitForAsync(() => {
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: platformSpy },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call platform.ready on init', waitForAsync(async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
  }));

  it('should have navigation pages defined', waitForAsync(async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.appPages.length).toBeGreaterThan(0);
    expect(app.appPages[0].url).toBe('/home');
  }));
});
