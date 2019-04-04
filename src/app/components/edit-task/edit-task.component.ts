import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Todo } from '../../../../todo';

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
    public validForm: FormGroup;
    private todos: Todo[];

    public value = {
        titleValue: '',
        descriptionValue: '',
        startDateValue: '',
        finishDateValue: '',
        priorityValue: ''
    };

    constructor(public dialogRef: MatDialogRef<EditTaskComponent>,
                private fb: FormBuilder,
                private dataService: DataService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.dataService.subject.subscribe((todos) => {
            this.todos = todos;
            this.onSearch(this.data.id);

        });
        this.dataService.getData();
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

        const todo: Todo = {
            id: this.data.id,
            title: this.validForm.controls['title'].value || this.value.titleValue,
            description: this.validForm.controls['description'].value || this.value.descriptionValue,
            startDate: this.validForm.controls['startDate'].value || this.value.startDateValue,
            finishDate: this.validForm.controls['finishDate'].value || this.value.finishDateValue,
            priority: this.value.priorityValue,
            status: false,
            isChecked: false,
            userId: DataService.getCookie('id')
        };

        this.dataService.editTask(this.data.id, todo).subscribe(() => {

            for (let i = 0; i < this.dataService.todos.length; i++) {
                if (this.dataService.todos[i].id === this.data.id) {
                    this.dataService.todos[i].title = todo.title;
                    this.dataService.todos[i].description = todo.description;
                    this.dataService.todos[i].startDate = todo.startDate;
                    this.dataService.todos[i].finishDate = todo.finishDate;
                    this.dataService.todos[i].priority = todo.priority;
                    this.dataService.subject.next(this.dataService.todos);
                }
            }
        }, () => {
            this.dataService.logout();
        });
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSearch(id): string {
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {

                this.value.titleValue = this.todos[i].title;
                this.value.descriptionValue = this.todos[i].description;
                this.value.startDateValue = this.todos[i].startDate;
                this.value.finishDateValue = this.todos[i].finishDate;
                this.value.priorityValue = this.todos[i].priority;

                return (this.value.titleValue, this.value.descriptionValue,
                    this.value.startDateValue, this.value.finishDateValue);
            }
        }
    }
}
