// import { MatSnackBar } from '@angular/material';
// let snackBar: MatSnackBar;
export const snackBarOptions = function() {
  return {
    duration: 2500,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'default'
  };
};
export const SNACK_BAR_DEFAULT: any = {
  duration: 2500,
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: 'default'
};
export const SNACK_BAR_SUCCESS: any = {
  duration: 2500,
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: 'success'
};
export const SNACK_BAR_DANGER: any = {
  duration: 2500,
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: 'danger'
};
export const SNACK_BAR_WARN: any = {
  duration: 2500,
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: 'warning'
};
export const DIALOG_OPTIONS: any = {
  // hasBackdrop: false,
  width: '80%'
};

// export const open = function(panelClass, content, action = null) {
//   snackBarOptions.panelClass = panelClass;
//   snackBar.open(content, action, snackBarOptions);
// };
