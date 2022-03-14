import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChildrenSongsPage } from './children-songs.page';

describe('ChildrenSongsPage', () => {
  let component: ChildrenSongsPage;
  let fixture: ComponentFixture<ChildrenSongsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenSongsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChildrenSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
