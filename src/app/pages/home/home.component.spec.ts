import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { DATA_TEST_PLAYLIST, DATA_TEST_USERPROFILE } from 'src/app/services/data-test';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { defer } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { TracklistService } from 'src/app/services/tracklist.service';
import { FavoriteComponent } from '../favorite/favorite.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthGuardGuard } from 'src/app/services/guard/auth-guard.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let responsePlayList = DATA_TEST_PLAYLIST;
let responseUserProfile = DATA_TEST_USERPROFILE;

let spyPlayList = { getPlaylistImg: () => { return {subscribe: () => {} } } };
let spyProfileService = { getProfileUser: () => { return {subscribe: () => {} } } };

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserprofileService, useValue: spyProfileService },
        { provide: PlaylistService, useValue: spyPlayList },
      ],
      imports: [HttpClientTestingModule,MatSnackBarModule,MatMenuModule,RouterTestingModule.withRoutes(
        [{path: '', component: WelcomeComponent },
        {path: 'welcome', component: WelcomeComponent },
        {path: 'home', component: HomeComponent},
        {path: 'favorite',canActivate:[AuthGuardGuard], component: FavoriteComponent}]
        )],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spyProfileService = TestBed.get(UserprofileService);
    spyPlayList = TestBed.get(PlaylistService);
    fixture.detectChanges();
  });

  it('should create', 
    fakeAsync(() => {
      spyOn(spyPlayList, 'getPlaylistImg').and.returnValue({ subscribe: () => {} });
      spyOn(spyProfileService, 'getProfileUser').and.returnValue({ subscribe: () => {} });
      tick();
      expect(component).toBeTruthy();
  }));

  describe('GetDataPlaylist()', () => {
    it('When the PlayList service is consumed and does not respond with the expected data',  
    fakeAsync(() => {
      spyOn(spyPlayList, 'getPlaylistImg').and.returnValue(defer(() => Promise.resolve(responsePlayList)));
       component.GetDataPlaylist();
       tick();
       expect(component.nameplaylist).toEqual(responsePlayList.name);
    }));

    it('When the UserProfile service is consumed and does not respond with the expected data',  
    fakeAsync(() => {
      spyOn(spyProfileService, 'getProfileUser').and.returnValue(defer(() => Promise.resolve(responseUserProfile)));
       component.GetDataUser();
       tick();
       expect(component.nombre).toEqual(responseUserProfile.display_name);
    }));

  });
  
});
