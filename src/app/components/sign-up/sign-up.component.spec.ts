import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
    MatCheckboxModule,
    MatDialog,
    MatDialogRef,
    MatFormFieldControl,
    MatFormFieldModule,
    MatInput,
    MatSnackBar
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async(() => {
        const mock = {
            close: jasmine.createSpy('close')
        };

        TestBed.configureTestingModule({
            declarations: [SignUpComponent, MatInput],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatCheckboxModule,
                BrowserAnimationsModule
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
                }

            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SignUpComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
