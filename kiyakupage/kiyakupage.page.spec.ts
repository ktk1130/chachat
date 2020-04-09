import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KiyakupagePage } from './kiyakupage.page';

describe('KiyakupagePage', () => {
  let component: KiyakupagePage;
  let fixture: ComponentFixture<KiyakupagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiyakupagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KiyakupagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
