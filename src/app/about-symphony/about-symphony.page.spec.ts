import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutSymphonyPage } from './about-symphony.page';

describe('AboutSymphonyPage', () => {
  let component: AboutSymphonyPage;
  let fixture: ComponentFixture<AboutSymphonyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSymphonyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSymphonyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
