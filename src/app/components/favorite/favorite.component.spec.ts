import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DATA_TEST_USERPROFILE } from 'src/app/services/data-test';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { defer } from 'rxjs';

import { FavoriteComponent } from './favorite.component';
import { MatMenuModule } from '@angular/material/menu';

let responseUserProfile = DATA_TEST_USERPROFILE;

let spyProfileService = { getProfileUser: () => { return {subscribe: () => {} } } };

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserprofileService, useValue: spyProfileService }
      ],
      imports: [MatMenuModule],
      declarations: [ FavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    spyProfileService = TestBed.get(UserprofileService);
    fixture.detectChanges();
  });

  it('should create', 
    fakeAsync(() => {
      spyOn(spyProfileService, 'getProfileUser').and.returnValue({ subscribe: () => {} });
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

  });

});
