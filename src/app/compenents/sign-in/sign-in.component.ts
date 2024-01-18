import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginFormData: any = {
    email: '',
    password: ''
  }

  constructor(private snackbar: MatSnackBar, private router: Router) { }

  submit(): void {
    // Fetch all users
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : []

    if (users?.length > 0) {
      // Check if user exist
      const foundUser = users.find((user: any) => user.email === this.loginFormData.email);

      if(foundUser) {
        if(foundUser.password === this.loginFormData.password) {
          // Store current user in session
          sessionStorage.setItem('user', JSON.stringify(foundUser));
          // Navigate the user to the dashboard
          this.router.navigate(['/home']);
        }
      } else {
        this.snackbar.open(`${this.loginFormData.email} is not found`, 'Ok', { duration: 3000 });
      }
    } else {
      this.snackbar.open(`There are no users found.`, 'Ok', { duration: 3000 });
      this.router.navigate(['/sign-up']);
    }
  }
}
