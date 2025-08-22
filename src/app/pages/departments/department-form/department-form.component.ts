import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoDynamicModule, PoDynamicFormComponent, PoDynamicFormField, PoNotificationService, PoButtonModule, PoPageModule } from '@po-ui/ng-components';
import { DepartmentsService } from '../../../services/departments.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    CommonModule,
    PoButtonModule,
    PoDynamicModule,
    PoPageModule,
    RouterModule,
  ],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  providers: [DepartmentsService]
})
export class DepartmentFormComponent implements OnInit {

  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;

  department: any = {};
  pageTitle = 'Cadastrar Departamento';

  fields: PoDynamicFormField[] = [
    {
      property: 'name',
      label: 'Nome do Departamento',
      required: true,
      minLength: 3,
      maxLength: 50
    }
  ];

  constructor(
    private departmentsService: DepartmentsService,
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editar Departamento';
      this.departmentsService.getDepartmentById(+id).subscribe({
        next: (data) => {
          this.department = data;
        },
        error: (error) => {
          this.poNotification.error('Erro ao carregar o departamento para edição.');
        }
      });
    }
  }

  save() {
    this.departmentsService.saveDepartment(this.department).subscribe({
      next: (data) => {
        this.poNotification.success('Departamento salvo com sucesso!');
        this.router.navigate(['/departamentos']);
      },
      error: (error) => {
        this.poNotification.error('Erro ao salvar o departamento.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/departamentos']);
  }
}
