import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DATA_TEST_LISTFAVORITE, DATA_TEST_USERPROFILE } from 'src/app/services/data-test';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { defer } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FavoriteComponent } from './favorite.component';
import { MatMenuModule } from '@angular/material/menu';
import { TracklistService } from 'src/app/services/tracklist.service';

let responseUserProfile = DATA_TEST_USERPROFILE;
let responseTrackFavorite = DATA_TEST_LISTFAVORITE;

let spyProfileService = { getProfileUser: () => { return {subscribe: () => {} } } };
let spyTrackFavorite  = { getListFavorite: () => { return {subscribe: () => {} } }};

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserprofileService, useValue: spyProfileService },
        { provide: TracklistService, userValue: spyTrackFavorite},
      ],
      imports: [ HttpClientTestingModule,MatMenuModule],
      declarations: [ FavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    spyProfileService = TestBed.get(UserprofileService);
    spyTrackFavorite = TestBed.get(TracklistService);
    fixture.detectChanges();
  });

  it('should create', 
    fakeAsync(() => {
      spyOn(spyProfileService, 'getProfileUser').and.returnValue({ subscribe: () => {} });
      spyOn(spyTrackFavorite, 'getListFavorite').and.returnValue({ subscribe: () => {} });
      tick();
      expect(component).toBeTruthy();
  }));

  describe('GetDataPlaylist()', () => {
    it('When the UserProfile service is consumed and does not respond with the expected data',  
    fakeAsync(() => {
      spyOn(spyProfileService, 'getProfileUser').and.returnValue(defer(() => Promise.resolve(responseUserProfile)));
       component.GetDataUser();
       tick();
       expect(component.nombre).toEqual(responseUserProfile.display_name);
    }));

    it('When the TracklistService service is consumed and does not respond with the expected data',  
    fakeAsync(() => {
      spyOn(spyTrackFavorite, 'getListFavorite').and.returnValue(defer(() => Promise.resolve(responseTrackFavorite)));
       component.getDataTrack();
       tick();
       expect(component.totalsong.toString()).toEqual(responseTrackFavorite.total.toString());
    }));

  });

});
