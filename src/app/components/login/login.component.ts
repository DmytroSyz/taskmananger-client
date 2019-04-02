import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../user';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public validForm: FormGroup;
  public invalidData = false;


  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private fb: FormBuilder,
              private dataService: DataService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const controls = this.validForm.controls;
    if (this.validForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    const user: User = {
      id: '',
      email: this.validForm.controls['email'].value,
      pass: this.validForm.controls['pass'].value,
      remember: this.validForm.controls['remember'].value
    };

    this.dataService.login(user).subscribe((res: any) => {
      if (res.token !== undefined) {
        document.cookie = 'token=' + res.token;
        document.cookie = 'id=' + res.id;
        document.cookie = 'name=' + res.email;
        this.dataService.getData();
      }
      this.dialogRef.close();
    }, () => {
      this.invalidData = true;

    });

  }

  onSignUp(): void {
    this.dialogRef.close();
    const dialogSignUp = this.dialog.open(SignUpComponent, {
      width: '400px',
      data: ''
    });
    dialogSignUp.afterClosed().subscribe((res) => {
    });
  }

  initForm(): void {
    this.validForm = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      pass: ['', [
        Validators.required,
      ]],
      remember: [false]
    });
  }

}
