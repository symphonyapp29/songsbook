import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SongPagePage } from './song-page.page';

describe('SongPagePage', () => {
  let component: SongPagePage;
  let fixture: ComponentFixture<SongPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SongPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
