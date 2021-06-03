import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {StudentService} from '../../../../core/services/student.service';
import {StudentModel} from '../../../../core/models/student.model';
import {StudentModalComponent} from '../../components/student-modal/student-modal.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, AfterViewInit {

  loading = false;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable!: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row!: ElementRef;

  headElements = ['#', 'image', 'name', 'email', 'birthday', 'Location', 'Status', 'command'];
  sort = ['#', 'name', 'image', 'email', 'birthDay', 'location', 'status', 'command'];
  searchText = '';
  previous!: string;
  modalRef!: MDBModalRef;
  elements: StudentModel[] = [];

  maxVisibleItems = 8;

  constructor(private cdRef: ChangeDetectorRef,
              private modalService: MDBModalService,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.studentService.getListStudent().subscribe(res => {
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

  onCreateStudent(): void {
    const modalOptions = {
      class: 'modal-lg',
    };
    this.modalRef = this.modalService.show(StudentModalComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((res: any) => {
      this.loading = true;
      this.initData();
    });
  }
  onDetail(student: StudentModel) {
    const modalOptions = {
      class: 'modal-lg',
      data: {
        student: student
      }
    };
    this.modalRef = this.modalService.show(StudentModalComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((res: any) => {
      this.loading = true;
      this.initData();
    });
  }


}
