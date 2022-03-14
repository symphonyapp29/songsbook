import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutJeevaswaraluPage } from './about-jeevaswaralu.page';

describe('AboutJeevaswaraluPage', () => {
  let component: AboutJeevaswaraluPage;
  let fixture: ComponentFixture<AboutJeevaswaraluPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutJeevaswaraluPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutJeevaswaraluPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
