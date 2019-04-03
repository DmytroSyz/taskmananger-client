import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public validForm: FormGroup;
  public invalidUser = false;

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
              private fb: FormBuilder,
              public dataService: DataService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    const controls = this.validForm.controls;
    if (this.validForm.controls['pass'].value !== this.validForm.controls['rePass'].value) {
      this.validForm.controls['rePass'].setErrors({no: controls});
    }
    if (this.validForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    const user: User = {
      id: DataService.getId(),
      email: this.validForm.controls['email'].value,
      pass: this.validForm.controls['pass'].value,
      remember: false
    };

    this.dataService.signUp(user).subscribe(() => {
      this.dialogRef.close();
    }, () => {
      this.invalidUser = true;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.validForm = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      pass: ['', [
        Validators.required
      ]],
      rePass: ['', [
        Validators.required
      ]]
    });
  }

}
