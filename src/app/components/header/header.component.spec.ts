import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
    MatCheckboxModule,
    MatDialog,
    MatDialogRef,
    MatFormFieldControl,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBar,
    MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        const mock = {
            close: jasmine.createSpy('close')
        };


        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                MatIconModule,
                MatToolbarModule
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
            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
