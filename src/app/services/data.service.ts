import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../../../todo';
import { User } from '../../../user';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public subject = new Subject<any>();
    public subject$ = this.subject.asObservable();
    public todos: Todo[];
    public isDisplay = false;

    constructor(private http: HttpClient,
                private snackBar: MatSnackBar) {

    }

    static getCookie(name): string {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static getId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    getData(): void {
        const userId = DataService.getCookie('id');
        this.postFunction('http://127.0.0.1:8080', {userId}).subscribe((jsonTodos: Todo[]) => {
            this.todos = jsonTodos;
            this.subject.next(this.todos);
        }, () => {
            document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            this.subject.next(null);

        });
    }

    saveData(todo): Observable<object> {
        return this.postFunction('http://127.0.0.1:8080/create', {todo});
    }

    deleteTask(deleteId): Observable<object> {
        return this.http.post('http://127.0.0.1:8080/delete', {deleteId}, {
            headers: new HttpHeaders({
                'token': DataService.getCookie('token')
            })
        });
    }

    editTask(editId, editTask): Observable<object> {
        return this.postFunction('http://127.0.0.1:8080/edit', {editId, editTask});
    }

    changeStatus(statusId, status): Observable<object> {
        const newStatus = !status;
        return this.postFunction('http://127.0.0.1:8080/status', {statusId, newStatus});
    }

    login(user: User): Observable<object> {
        return this.http.post('http://127.0.0.1:8080/login', user);
    }

    signUp(user: User): Observable<object> {
        return this.http.post('http://127.0.0.1:8080/signup', user);
    }

    postFunction(url, body): Observable<object> {
        return this.http.post(url, body, {
            headers: new HttpHeaders({
                'token': DataService.getCookie('token')
            })
        });
    }

    logout(): void {
        this.getData();
        this.snackBar.open('Your time is up', 'Please, login', {
            duration: 3000,
        });
        this.isDisplay = false;

    }
}
