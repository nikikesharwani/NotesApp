import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from '../reducers/note.reducer';
import { ToastModule } from 'ng2-toastr';
import { NoteService } from '../services/note.service';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain current date only if selectedNote input is empty', () => {
    component.currentDate = new Date();
    fixture.detectChanges();
    const pTag: HTMLDivElement = fixture.debugElement
      .query(By.css('#showNote'))
      .nativeElement;
    expect(pTag.textContent).toEqual(DatePipe.prototype.transform(component.currentDate, 'MMMM d, y, h:mm a'));
  });

  it('should show readonly note details if selectedNote input is present and is not editable', () => {
    component.currentDate = new Date();
    component.selectedNote = {id: 'note1', title: 'demo', desc: 'demo test', timeStamp: new Date()};
    component.editableNote = false;
    fixture.detectChanges();
    const pTag: HTMLDivElement = fixture.debugElement
      .query(By.css('#showNote'))
      .nativeElement;
    const title: HTMLDivElement = fixture.debugElement
      .query(By.css('#noteTitle'))
      .nativeElement;
    const desc: HTMLDivElement = fixture.debugElement
      .query(By.css('#noteDescription'))
      .nativeElement;
    expect(pTag.textContent).toEqual(DatePipe.prototype.transform(component.currentDate, 'MMMM d, y, h:mm a'));
    expect(title.textContent).toEqual(component.selectedNote.title);
    expect(desc.textContent).toEqual(component.selectedNote.desc);
  });

  it('should show editable note details if selectedNote input is present and its editable', () => {
    component.currentDate = new Date();
    component.selectedNote = {id: 'note1', title: 'demo', desc: 'demo test', timeStamp: new Date()};
    component.editableNote = true;
    component.noteForm.patchValue(component.selectedNote);
    fixture.detectChanges();
    const title = fixture.debugElement
      .query(By.css('input[type="text"]'))
      .nativeElement;
    const desc = fixture.debugElement
      .query(By.css('textarea[type="text"]'))
      .nativeElement;
    expect(title.value).toEqual(component.selectedNote.title);
    expect(desc.value).toEqual(component.selectedNote.desc);
  });
});
