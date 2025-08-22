import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  PoDialogService,
  PoNotificationService,
  PoTableColumn,
  PoTableAction,
  PoPageAction,
  PoPageModule,
  PoTableModule,
  PoModalComponent,
  PoModalModule,
  PoButtonModule,
  PoFieldModule
} from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

import { DepartmentsService } from '../../services/departments.service';
import { HttpClientModule } from '@angular/common/http';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    PoPageModule,
    PoTableModule,
    PoTemplatesModule,
    HttpClientModule,
    RouterModule,
    PoModalModule,
    PoButtonModule,
    PoFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers: [ DepartmentsService ]
})
export class DepartmentsComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  departmentForm!: FormGroup;

  departments: Department[] = [];
  selectedDepartments: Department[] = [];
  columns: PoTableColumn[] = [];
  actions: PoTableAction[] = [];
  pageActions: PoPageAction[] = [];

  modalTitle: string = 'Criar Departamento';

  constructor(
    private departmentsService: DepartmentsService,
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.setupTable();
    this.setupPageActions();
    this.loadDepartments();
  }

  createForm() {
    this.departmentForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      code: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      city: ['', [Validators.maxLength(50)]]
    });
  }

  setupTable() {
    this.columns = [
      { property: 'name', label: 'Nome', type: 'string', sortable: true },
      { property: 'code', label: 'Código', type: 'number', sortable: true },
      { property: 'city', label: 'Cidade', type: 'cellTemplate' }
    ];

    this.actions = [
      { label: 'Editar', icon: 'po-icon-edit', action: this.onEdit.bind(this) },
      { label: 'Excluir', icon: 'po-icon-delete', action: this.onDelete.bind(this) }
    ];
  }

  // configurar as ações da página
  setupPageActions() {
    this.pageActions = [
      {
        label: 'Criar',
        icon: 'po-icon-plus',
        action: this.openModal.bind(this)
      },
      {
        label: 'Excluir Selecionados',
        icon: 'po-icon-delete',
        action: this.deleteSelected.bind(this),
        disabled: () => this.selectedDepartments.length === 0
      }
    ];
  }

  loadDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        this.poNotification.error('Erro ao carregar os departamentos.');
        console.error('Erro ao carregar departamentos', err);
      }
    });
  }

  // modal e crud
  openModal() {
    this.modalTitle = 'Criar Departamento';
    this.departmentForm.reset();
    this.poModal.open();
  }

  onSave() {
    if (this.departmentForm.invalid) {
      this.poNotification.warning('Verifique os campos do formulário.');
      return;
    }

    const departmentToSave: Department = this.departmentForm.value;
    if(!departmentToSave.id)
    {delete departmentToSave.id}
    this.departmentsService.saveDepartment(departmentToSave).subscribe({
      next: () => {
        this.poNotification.success('Departamento salvo com sucesso!');
        this.loadDepartments();
        this.poModal.close();
      },
      error: (err) => {
        this.poNotification.error('Erro ao salvar o departamento.');
        console.error('Erro ao salvar departamento', err);
      }
    });
  }

  onCancel() {
    this.departmentForm.reset();
    this.poModal.close();
  }

  onEdit(department: Department) {
    this.modalTitle = 'Editar Departamento';
    this.departmentForm.patchValue(department);
    this.poModal.open();
  }

  // seleciona
  onRowSelected(event: any) {
    this.selectedDepartments.push(event);
  }

  onRowUnselected(event: any) {
    this.selectedDepartments = this.selectedDepartments.filter(dep => dep.id !== event.id);
  }

  onAllRowsSelected() {
    this.selectedDepartments = [...this.departments];
  }

  onAllRowsUnselected() {
    this.selectedDepartments = [];
  }

  // delete
  onDelete(department: Department) {
    this.poDialog.confirm({
      title: 'Excluir Departamento',
      message: `Tem certeza que deseja excluir o departamento "${department.name}"?`,
      confirm: () => {
        if (department.id) {
            this.departmentsService.deleteDepartment(department.id).subscribe({
            next: () => {
              this.poNotification.success('Departamento excluído com sucesso!');
              this.loadDepartments();
            },
            error: (err) => {
              this.poNotification.error('Erro ao excluir departamento.');
              console.error('Erro ao excluir departamento', err);
            }
          });
        }
      }
    });
  }

  deleteSelected() {
    const selectedIds = this.selectedDepartments.map(d => d.id);
    const selectedNames = this.selectedDepartments.map(d => d.name).join(', ');

    this.poDialog.confirm({
      title: 'Excluir Departamentos Selecionados',
      message: `Tem certeza que deseja excluir os seguintes departamentos: ${selectedNames}?`,
      confirm: () => {
        console.log('Excluindo departamentos com IDs:', selectedIds);
        this.poNotification.success('Departamentos selecionados foram excluídos com sucesso!');
        this.selectedDepartments = [];
        this.loadDepartments();
      }
    });
  }
}
