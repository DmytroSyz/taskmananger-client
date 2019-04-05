import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { MatDialog, MatDialogRef, MatFormFieldControl, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MaterialModule } from '../../../../material-module';

fdescribe('TodosComponent', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async(() => {
        const mock = {
            close: jasmine.createSpy('close')
        };


        TestBed.configureTestingModule({
            declarations: [TodosComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MaterialModule
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
                    provide: MatTableDataSource,
                    useValue: mock
                }


            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodosComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
