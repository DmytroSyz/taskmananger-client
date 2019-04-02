import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'startDate', 'finishDate', 'priority', 'status', 'check', 'edit', 'delete'];
  public todos = new BehaviorSubject([]);

  public filterValues = {
    title: '',
    startDate: '',
    finishDate: '',
    priority: '',
    status: ''
  };

  public titleFilter = new FormControl('');
  public startDateFilter = new FormControl('');
  public finishDateFilter = new FormControl('');
  public priorityFilter = new FormControl('');
  public statusFilter = new FormControl('');
  public dataSource = new MatTableDataSource();


  constructor(private dataService: DataService,
              private dialog: MatDialog) {
    this.dataSource.filterPredicate = this.createFilter();
  }


  ngOnInit(): void {
    this.dataService.subject$.subscribe((todos) => {
      this.todos.next(todos);
      this.dataSource.data = this.todos.value;
      if (todos) {
        this.dataService.isDisplay = true;
      }
    });
    this.dataService.getData();


    this.titleFilter.valueChanges.subscribe((val) => {
      this.filterValues.title = val;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.startDateFilter.valueChanges.subscribe((val) => {
      this.filterValues.startDate = val;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.finishDateFilter.valueChanges.subscribe((val) => {
      this.filterValues.finishDate = val;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.priorityFilter.valueChanges.subscribe((val) => {
      this.filterValues.priority = val;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.statusFilter.valueChanges.subscribe((val) => {
      this.filterValues.status = val;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  onDelete(deleteId): void {
    this.dataService.deleteTask(deleteId).subscribe((res) => {
        const todoArr = Object.assign([], this.todos.value);
        for (let i = 0; i < todoArr.length; i++) {
          if (todoArr[i].id === deleteId) {
            todoArr.splice(i, 1);
          }
        }
        this.dataService.todos = todoArr;
        this.dataService.subject.next(todoArr);
      }, () => {
        this.dataService.logout();
      }
    );
  }

  editTask(id): void {
    const dialogNewTask = this.dialog.open(EditTaskComponent, {
      width: '400px',
      data: {id}
    });
    dialogNewTask.afterClosed().subscribe((res) => {
    });
  }

  saveStatus(stat, id): void {

    this.dataService.changeStatus(id, stat).subscribe(() => {
      const todoArr = Object.assign([], this.todos.value);
      for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].id === id) {
          todoArr[i].status = !stat;
        }
      }
      this.dataService.todos = todoArr;
      this.dataService.subject.next(todoArr);
    }, () => {
      this.dataService.logout();
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.startDate.toString().indexOf(searchTerms.startDate) !== -1
        && data.finishDate.toString().indexOf(searchTerms.finishDate) !== -1
        && data.priority.toString().indexOf(searchTerms.priority) !== -1
        && data.status.toString().indexOf(searchTerms.status) !== -1;
    };
    return filterFunction;
  }
}
