import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavouriteMainSongsListPage } from './favourite-main-songs-list.page';

describe('FavouriteMainSongsListPage', () => {
  let component: FavouriteMainSongsListPage;
  let fixture: ComponentFixture<FavouriteMainSongsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteMainSongsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteMainSongsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
