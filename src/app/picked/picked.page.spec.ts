import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickedPage } from './picked.page';

describe('PickedPage', () => {
  let component: PickedPage;
  let fixture: ComponentFixture<PickedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
