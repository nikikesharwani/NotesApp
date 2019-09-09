import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoteComponent } from './note/note.component';
import { FilterdataPipe } from './pipes/filterdata.pipe';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from './reducers/note.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { TimeAgoPipe } from 'time-ago-pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        NoteComponent,
        FilterdataPipe,
        HighlighterPipe,
        TimeAgoPipe
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.provideStore({
          notes: notesReducer
        }),
        ToastModule.forRoot()
      ],
      providers: [NoteService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
