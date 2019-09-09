import { Component, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NoteService } from './services/note.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  successMessageSubscription: Subscription;
  errorMessageSubscription: Subscription;

  // subscribing to show success and error message subjects to show corresponding toastr messages
  constructor(private noteService: NoteService, private toastr: ToastsManager,
    private _vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(_vcr);

    this.successMessageSubscription = this.noteService.successToastr.subscribe(message => {
      this.toastr.success(message, 'Success!');
    });

    this.errorMessageSubscription = this.noteService.errorToastr.subscribe(message => {
      this.toastr.error(message, 'Oops!');
    });

  }

  // unsubscribe to subjects on destroying component
  ngOnDestroy() {
    this.successMessageSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }
}
