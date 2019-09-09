import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterdataPipe } from '../pipes/filterdata.pipe';
import { HighlighterPipe } from '../pipes/highlighter.pipe';
import { NoteService } from '../services/note.service';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from '../reducers/note.reducer';
import { ToastModule } from 'ng2-toastr';
import { NoteComponent } from '../note/note.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        NoteComponent,
        FilterdataPipe,
        HighlighterPipe,
        TimeAgoPipe
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.provideStore({
          notes: notesReducer
        }),
        ToastModule.forRoot()
      ],
      providers: [
        NoteService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show No notes found!!! if notesList is empty', () => {
    component.notesList = [];
    fixture.detectChanges();
    const pTag: HTMLDivElement = fixture.debugElement
      .query(By.css('#emptyNotes p'))
      .nativeElement;
    expect(pTag.textContent).toEqual('No notes found!!!');
  });

  it('should show cards with note details if notesList is not empty', () => {
    component.notesList = [{id: 'note1', title: 'demo', desc: 'demo test', timeStamp: new Date(), checked: false}];
    fixture.detectChanges();
    const title: HTMLDivElement = fixture.debugElement
      .query(By.css('.card-title'))
      .nativeElement;
    const desc: HTMLDivElement = fixture.debugElement
      .query(By.css('.card-text'))
      .nativeElement;
    expect(title.textContent).toEqual('demo');
    expect(desc.textContent).toEqual('demo test');
  });

  it('should send selected note to note component on card click', () => {
    component.notesList = [{id: 'note1', title: 'demo', desc: 'demo test', timeStamp: new Date(), checked: false}];
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.card-title')).triggerEventHandler('click', null);
    component.onNoteSelect(0, component.notesList[0]);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(0);
      expect(component.selectedNote).toEqual(component.notesList[0]);
    });
  });
});
