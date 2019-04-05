import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('EditTaskComponent', () => {
    let component: EditTaskComponent;
    let fixture: ComponentFixture<EditTaskComponent>;

    beforeEach(async(() => {
        const mock = {
            close: jasmine.createSpy('close')
        };

        TestBed.configureTestingModule({
            declarations: [EditTaskComponent, MatInput],
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
            fixture = TestBed.createComponent(EditTaskComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
