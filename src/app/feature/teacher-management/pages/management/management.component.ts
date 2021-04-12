import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {TeacherService} from '../../../../core/services/teacher.service';
import {TeacherModel} from '../../../../core/models/teacher.model';
import {TeacherModalComponent} from '../../components/teacher-modal/teacher-modal.component';
import {TeacherDetailModalComponent} from '../../components/teacher-detail-modal/teacher-detail-modal.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, AfterViewInit {

  loading = false;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row!: ElementRef;

  headElements = ['stt', 'name', 'email', 'birth day', 'Location', 'command'];
  sort = ['i', 'name', 'email', 'birthDay', 'location', 'command'];
  searchText = '';
  previous!: string;
  modalRef!: MDBModalRef;
  elements: TeacherModel[] = [];

  maxVisibleItems = 8;

  constructor(private cdRef: ChangeDetectorRef,
              private modalService: MDBModalService,
              private teacherService: TeacherService
  ) {}


  ngOnInit(): void {
    this.initData();
  }
  initData(): void {
    this.teacherService.getListTeacher().subscribe(res => {
      this.elements = res;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
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
  onCreateTeacher(): void {
    const modalOptions = {
      class: 'modal-md',
    };
    this.modalRef = this.modalService.show(TeacherModalComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((res: any) => {
      this.initData();
    });
  }
  onDetailTeacher(id: string): void {
    const modalOptions = {
      class: 'modal-lg',
      data: {
        idTeacher: id
      }
    };
    this.modalRef = this.modalService.show(TeacherDetailModalComponent, modalOptions);
  }

}
