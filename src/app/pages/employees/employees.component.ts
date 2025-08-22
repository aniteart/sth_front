import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  PoButtonModule,
  PoWidgetModule,
  PoPageModule,
  PoTableModule,
  PoModalModule,
  PoDynamicModule,
  PoFieldModule,
  PoModalComponent,
  PoNotificationService,
  PoSearchModule
} from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { Employees as EmployeesService, Employees } from '../../root/employees-service/employees.service'

interface Employee {
  id?: number;
  name: string;
  email: string;
  birthdate: string;
  position: string;
  department: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    PoButtonModule,
    PoWidgetModule,
    PoPageModule,
    PoTableModule,
    PoModalModule,
    PoDynamicModule,
    PoFieldModule,
    FormsModule,
    PoSearchModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {

  @ViewChild('modal', { static: true }) modal!: PoModalComponent;

  list: Employees[] = [];
  // Inicializar com um array vazio
  fields = [
    { property: 'name', label: 'Nome', required: true, showRequired: true, gridColumns: 6 },
    { property: 'email', label: 'Email', type: 'email', required: true, showRequired: true, gridColumns: 6 },
    { property: 'birthdate', label: 'Data de Nascimento', type: 'date', required: true, showRequired: true, gridColumns: 6 },
    { property: 'position', label: 'Cargo', gridColumns: 6 },
    { property: 'department', label: 'Departamento', gridColumns: 6 },
  ];

  columns: any[] = [];
  formData: any = {};
  isEditing: boolean = false;
  editingIndex: number | null = null;

  constructor(private router: Router, private poNotification: PoNotificationService, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.loadEmployees();

    this.columns = [
      { property: 'name', label: 'Nome' },
      { property: 'email', label: 'Email' },
      { property: 'birthdate', label: 'Data de Nascimento', type: 'date' },
      { property: 'position', label: 'Cargo' },
      { property: 'department', label: 'Departamento' },
      {
        property: 'actions',
        label: 'Ações',
        type: 'icon',
        sortable: false,
        icons: [
            {
              action: this.edit.bind(this),
              icon: 'po-icon po-icon-edit',
              tooltip: 'Editar'
            }
          ]
      }
    ];
  }

  loadEmployees() {
    this.employeesService.getAllEmployees().subscribe(
      (data: Employees[]) => {
        this.list = data;
      },
      (error) => {
        this.poNotification.error('Erro ao carregar funcionários.');
        console.error('Erro ao buscar funcionários:', error);
      }
    );
  }

  getActions() {
    return [
      {
        label: 'Editar',
        action: (item: Employees) => this.edit(item)
      }
    ];
  }

  edit(item: Employees) {
    this.isEditing = true;
    this.editingIndex = this.list.indexOf(item);
    this.formData = { ...item,
      birthdate: new Date(item.birthdate)
     };
    this.modal.open();
  }

  confirm() {
  if (this.formData && this.formData.name) {
    if (this.isEditing && this.editingIndex !== null) {
      // Atualizar
      this.employeesService.updateEmployee({ ...this.formData, id: this.list[this.editingIndex].id }).subscribe(
        () => {
          if (this.editingIndex !== null) { // Verifica se editingIndex não é null
            this.list[this.editingIndex] = { ...this.formData };
          }
          this.poNotification.success('Funcionário atualizado com sucesso!');
        },
        (error) => {
          this.poNotification.error('Erro ao atualizar funcionário.');
          console.error('Erro ao atualizar funcionário:', error);
        }
      );
    } else {
      // Adicionar
      this.employeesService.createEmployee(this.formData).subscribe({
        next: (newEmployee) => {
          this.list.push(newEmployee);
          this.poNotification.success('Funcionário cadastrado com sucesso!');
        },
        error: (error) => {
          this.poNotification.error('Erro ao cadastrar funcionário.');
          console.error('Erro ao cadastrar funcionário:', error);
    },
  });
}
    this.closeModal();
      } else {
        this.poNotification.warning('Preencha os campos obrigatórios.');
      }
  }

  remove(item: Employees) {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.employeesService.deleteEmployee(item.id!).subscribe(
        () => {
          this.list.splice(index, 1);
          this.poNotification.success('Funcionário deletado com sucesso!');
        },
        (error) => {
          this.poNotification.error('Erro ao deletar funcionário.');
          console.error('Erro ao deletar funcionário:', error);
        }
      );
    }
  }

  openModal() {
      this.isEditing = false;
      this.formData = {
        name: '',
        email: '',
        birthdate: '',
        position: '',
        department: ''
      };
      this.modal.open();
    }

  closeModal() {
      this.modal.close();
      this.formData = {};
      this.isEditing = false;
      this.editingIndex = null;
    }


  onUploadSuccess(event: any): void {
    this.poNotification.success('Upload realizado com sucesso!');
    console.log('Arquivo enviado:', event);
  }

  onUploadError(error: any): void {
    this.poNotification.error('Erro ao realizar upload.');
    console.error('Erro no upload:', error);
  }

  deleteFromEdit() {
  if (this.editingIndex !== null) {
    const employee = this.list[this.editingIndex];
    if (employee && employee.id) {
      this.employeesService.deleteEmployee(employee.id).subscribe(
        () => {
          this.list.splice(this.editingIndex!, 1);
          this.poNotification.success('Funcionário deletado com sucesso!');
          this.closeModal();
        },
        (error) => {
          this.poNotification.error('Erro ao deletar funcionário.');
          console.error('Erro ao deletar funcionário:', error);
        }
      );
    }
  }
}

}

