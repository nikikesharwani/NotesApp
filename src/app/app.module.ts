import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoteComponent } from './note/note.component';
import { notesReducer } from './reducers/note.reducer';
import { NoteService } from './services/note.service';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { FilterdataPipe } from './pipes/filterdata.pipe';
import { CustomOptions } from './custom-option';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NoteComponent,
    HighlighterPipe,
    FilterdataPipe,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.provideStore({
      notes: notesReducer
    }),
    ToastModule.forRoot()
  ],
  providers: [NoteService, ToastOptions, { provide: ToastOptions, useClass: CustomOptions }],
  bootstrap: [AppComponent]
})
export class AppModule { }
