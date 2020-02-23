import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GelesenPage } from './gelesen.page';

describe('GelesenPage', () => {
  let component: GelesenPage;
  let fixture: ComponentFixture<GelesenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelesenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GelesenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
