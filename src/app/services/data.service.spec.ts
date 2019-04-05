import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

fdescribe('DataService', () => {
    const mock = {
        close: jasmine.createSpy('close')
    };
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: MatSnackBar,
                useValue: mock
            },
            HttpClient,
            HttpHandler
        ]
    }));

    it('should be created', () => {
        const service: DataService = TestBed.get(DataService);
        expect(service).toBeTruthy();
    });
});
