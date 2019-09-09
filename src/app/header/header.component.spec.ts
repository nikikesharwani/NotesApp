import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from '../reducers/note.reducer';
import { ToastModule } from 'ng2-toastr';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        FormsModule,
        StoreModule.provideStore({
          notes: notesReducer
        }),
        ToastModule.forRoot()
      ],
      providers: [NoteService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
