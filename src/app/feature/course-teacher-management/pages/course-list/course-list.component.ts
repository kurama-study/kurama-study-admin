import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseModel} from '../../../../core/models/course.model';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModalComponent} from '../../../course-management/components/course-modal/course-modal.component';
import {CommonService} from '../../../../core/services/common.service';
import {UserInfoModel} from '../../../../core/models/user-info.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  listCourse!: CourseModel[];
  loading = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row!: ElementRef;

  elements: CourseModel[] = [];
  headElements = ['#', 'name', 'student quantity', 'lesson quantity', 'status' ];

  searchText = '';
  previous!: string;
  modalRef!: MDBModalRef;


  maxVisibleItems = 8;
  currentUser!: UserInfoModel;
  constructor(private cdRef: ChangeDetectorRef,
              private courseService: CourseService,
              private modalService: MDBModalService,
              private commonService: CommonService
  ) {}


  ngOnInit(): void {
    this.loading = true;
    this.commonService.currentUser.subscribe(res => {
      this.currentUser = res;
      this.initData();
    })
  }

  initData(): void {
    this.courseService.getCourseOfTeacher(this.currentUser._id).subscribe(res => {
      this.listCourse = res;
      this.elements = res;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.loading = false;

    });
  }
  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  searchItems(): void {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }


  updateStatus(id: string, status: boolean, index: number): void {
    this.courseService.updateStatus(id, status).subscribe(res => {
      this.elements[index].status = res.status;
    });
  }


}
