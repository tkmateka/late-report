import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  classes: any = [];
  roles: string[] = ['facilitator', 'candidate', 'admin']
  registerFormData: any = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private snackbar: MatSnackBar, private router: Router, private sharedService: SharedService) {
    this.classes = this.sharedService.get('classes', 'local');
  }

  submit(): void {
    // Check if password was confirmed
    if (this.registerFormData.password !== this.registerFormData.confirmPassword) {
      this.snackbar.open(`Password don't match`, 'Ok', { duration: 3000 })
      return;
    }

    // Fetch all users
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : []

    if (users?.length > 0) {
      // Check if user already exist
      const foundUser = users.find((user: any) => user.email.toLowerCase() === this.registerFormData.email.toLowerCase());

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

  addNewUser(users: any): void {
    // Remove confirmPassword prperty
    delete this.registerFormData.confirmPassword;
    // If this is a candidate, then add them into their specific class
    if (this.registerFormData.role === 'candidate') {
      this.registerFormData['lateReports'] = [];
      this.classes.forEach((_class: any) => {
        if (_class.classId === this.registerFormData.classId) {
          // Add the new candidate to the current class
          _class.candidates.push(this.registerFormData);
          _class.candidateCount++;
        }
      })
      // Update classes
      localStorage.setItem('classes', JSON.stringify(this.classes));
    }
    // If it doesn't, add the new user to the list
    users.push(this.registerFormData);
    // Update local storage
    localStorage.setItem('users', JSON.stringify(users));
    this.snackbar.open(`${this.registerFormData.email} was added successfully`, 'Ok', { duration: 3000 });
    // Send user to the login page
    this.router.navigate(['/sign-in']);
  }
}
