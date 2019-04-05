import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../../../../todo';
import { DataService } from '../../services/data.service';


@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    public validForm: FormGroup;
    private selected = '';

    constructor(public dialogRef: MatDialogRef<AddTaskComponent>,
                private fb: FormBuilder,
                private dataService: DataService,
    ) {
    }


    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.validForm = this.fb.group({
            title: ['', []],
            startDate: ['', []],
            finishDate: ['', []],
            description: [''
            ]
        });
    }

    onSubmit(): void {
        const controls = this.validForm.controls;
        if (this.validForm.invalid) {
            Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
            return;
        }
        this.clickButton();
    }

    clickButton(): void {
        const task: Todo = {
            id: DataService.getId(),
            title: this.validForm.controls['title'].value,
            description: this.validForm.controls['description'].value,
            startDate: this.validForm.controls['startDate'].value || new Date(),
            finishDate: this.validForm.controls['finishDate'].value,
            priority: this.selected,
            status: false,
            isChecked: false,
            userId: DataService.getCookie('id')
        };
        this.dataService.saveData(task).subscribe(() => {
            this.dataService.todos.push(task);
            this.dataService.subject.next(this.dataService.todos);
        }, () => {
            this.dataService.logout();
        });
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
