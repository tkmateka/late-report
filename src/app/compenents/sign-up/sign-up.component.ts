import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerFormData: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private snackbar: MatSnackBar, private router: Router) { }

  submit(): void {
    // Check if password was confirmed
    if(this.registerFormData.password !== this.registerFormData.confirmPassword) {
      this.snackbar.open(`Password don't match`, 'Ok', { duration: 3000 })
      return;
    }

    // Fetch all users
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : []

    if (users?.length > 0) {
      // Check if user already exist
      const foundUser = users.find((user: any) => users.email === this.registerFormData.email);

      if (foundUser) {
        // If it does
        this.snackbar.open(`${foundUser.email} already exist`, 'Ok', { duration: 3000 })
      } else {
        this.addNewUser(users);
      }
    } else {
      this.addNewUser(users);
    }
  }

  addNewUser(users:any):void {
    // Remove confirmPassword prperty
    delete this.registerFormData.confirmPassword;
    // If it doesn't, add the new user to the list
    users.push(this.registerFormData);
    // Update local storage
    localStorage.setItem('users', JSON.stringify(users));
    this.snackbar.open(`${this.registerFormData.email} was added successfully`, 'Ok', { duration: 3000 });
    // Send user to the login page
    this.router.navigate(['/sign-in']);
  }
}
