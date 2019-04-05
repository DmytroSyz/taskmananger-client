import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import {
    MAT_DIALOG_DATA,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialog,
    MatDialogRef,
    MatFormFieldControl,
    MatFormFieldModule,
    MatInput,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBar
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('AddTaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;

    beforeEach(async(() => {
        const mock = {
            close: jasmine.createSpy('close')
        };

        TestBed.configureTestingModule({
            declarations: [AddTaskComponent, MatInput],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSelectModule
            ],
            providers: [
                MatFormFieldControl,
                {
                    provide: MatDialogRef,
                    useValue: mock
                },
                HttpHandler,
                HttpClient,
                {
                    provide: MatSnackBar,
                    useValue: mock
                },
                {
                    provide: MatDialog,
                    useValue: mock
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: mock
                }


            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AddTaskComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
