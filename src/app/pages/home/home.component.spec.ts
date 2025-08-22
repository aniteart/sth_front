import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/departments/departments.component.spec.ts
import { DepartmentsComponent } from './departments.component';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsComponent);
========
import { HomeComponent } from './home.component';

describe('MenuAdminComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
>>>>>>>> dd1c0f930f1424f1dc2847bf4392a81fc1005b82:src/app/pages/home/home.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
