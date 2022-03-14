import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SongsListPage } from './songs-list.page';

describe('SongsListPage', () => {
  let component: SongsListPage;
  let fixture: ComponentFixture<SongsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SongsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
