import {Component, OnInit} from '@angular/core';
import {AddTaskComponent} from '../add-task/add-task.component';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userName: string;

  constructor(public dialog: MatDialog,
              public dataService: DataService) {
  }

  ngOnInit(): void {
    this.userName = null;
    setTimeout(() => {
      this.userName = DataService.getCookie('name');
    }, 100);
  }

  addNewTask(): void {
    const dialogNewTask = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: ''
    });
    dialogNewTask.afterClosed().subscribe(() => {
    });
  }

  onLogin(): void {
    const dialogLogin = this.dialog.open(LoginComponent, {
      width: '400px',
      data: ''
    });
    dialogLogin.afterClosed().subscribe(() => {
      if (document.cookie) {
        this.userName = DataService.getCookie('name');
      }
    });
  }

  onLogout(): void {
    document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    this.userName = null;
    this.dataService.subject.next(null);
    this.dataService.isDisplay = false;
  }
}
