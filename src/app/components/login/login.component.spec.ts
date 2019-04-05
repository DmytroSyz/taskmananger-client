import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
    MatCheckboxModule,
    MatDialog,
    MatDialogRef,
    MatFormFieldControl,
    MatFormFieldModule,
    MatInput,
    MatSnackBar
} from '@angular/material';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        const mock = {
            close: jasmine.createSpy('close')
        };

        TestBed.configureTestingModule({
            declarations: [LoginComponent, MatInput],
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
            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
