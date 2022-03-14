import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavouriteChildrenSongsListPage } from './favourite-children-songs-list.page';

describe('FavouriteChildrenSongsListPage', () => {
  let component: FavouriteChildrenSongsListPage;
  let fixture: ComponentFixture<FavouriteChildrenSongsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteChildrenSongsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteChildrenSongsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
