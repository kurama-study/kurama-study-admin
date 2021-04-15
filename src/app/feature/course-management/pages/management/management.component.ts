import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModel} from '../../../../core/models/course.model';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {CourseModalComponent} from '../../components/course-modal/course-modal.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, AfterViewInit {

  listCourse!: CourseModel[];
  loading = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row!: ElementRef;

  elements: CourseModel[] = [];
  headElements = ['#', 'name', 'student quantity', 'lesson quantity', 'status' , 'command'];

  searchText = '';
  previous!: string;
  modalRef!: MDBModalRef;


  maxVisibleItems = 8;

  constructor(private cdRef: ChangeDetectorRef,
              private courseService: CourseService,
              private modalService: MDBModalService
  ) {}


  ngOnInit(): void {
    this.loading = true;
    this.initData();
  }

  initData(): void {
    this.courseService.getListCourse().subscribe(res => {
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
  onAddCourse(): void {
    const modalOptions = {
      class: 'modal-lg',
    };
    this.modalRef = this.modalService.show(CourseModalComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((res: any) => {
      this.loading = true;
      this.initData();
    });
  }

  updateStatus(id: string, status: boolean, index: number): void {
    this.courseService.updateStatus(id, status).subscribe(res => {
      this.elements[index].status = res.status;
    });
  }

}
