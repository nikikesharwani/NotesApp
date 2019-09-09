import { ToastOptions } from 'ng2-toastr/ng2-toastr';

export class CustomOptions extends ToastOptions {
  animate = 'fade';
  dismiss = 'click';
  showCloseButton = true;
  newestOnTop = true;
  enableHTML = true;
}
