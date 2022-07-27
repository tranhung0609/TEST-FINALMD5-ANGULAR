import { Component, OnInit } from '@angular/core';
import {TourService} from "../../services/tour.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Tour} from "../../models/tour";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  formTour!: FormGroup;
  tours: Tour[] = [];
  tour?: Tour;

  constructor(private tourService:TourService,
              private fb : FormBuilder,
              private toast: NgToastService) { }


  ngOnInit(): void {
    this.formTour = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getAllTours();
  }

  get id() {
    return this.formTour?.get('id')
  }

  get title() {
    return this.formTour?.get('title')
  }

  get price() {
    return this.formTour?.get('price')
  }

  get description() {
    return this.formTour?.get('description')
  }
  getAllTours() {
    this.tourService.getAllTours().subscribe(data => {this.tours = data});

    this.formTour?.reset();
    // @ts-ignore
    document.getElementById('form-create').hidden = false;
    // @ts-ignore
    document.getElementById('form-update').hidden =true;
  }

  getTours(id: number) {
    this.tourService.getToursById(id).subscribe((data) => {
      this.tours = [];
      this.tours.push(data);
    });
  }

  createTours() {
    const tours = {
      id: this.formTour?.value.id,
      title: this.formTour?.value.title,
      price: this.formTour?.value.price,
      description: this.formTour?.value.description
    };
    this.tourService.createTours(tours).subscribe(() => {
      this.toast.success({detail : "Notification",summary: "Create Tours Successfully",duration :3000})
      this.formTour?.reset();
      this.getAllTours();
    });
  }

  editTours(id: any) {
    this.tourService.getToursById(id).subscribe(data => this.formTour?.patchValue(data));
    // @ts-ignore
    document.getElementById("form-update").hidden = false;
    // @ts-ignore
    document.getElementById("form-create").hidden = true;
  }

  updateTours() {
    const tour = {
      id: this.formTour?.value.id,
      title: this.formTour?.value.title,
      price: this.formTour?.value.price,
      description: this.formTour?.value.description
    };
    this.tourService.updateTours(tour.id, tour).subscribe(() => {
      this.toast.success({detail : "Notification",summary: "Update Tours Successfully",duration :3000})

      this.formTour?.reset();
      this.getAllTours();
      // @ts-ignore
      document.getElementById("form-update").hidden = true;
    });
  }

  deleteTours(id: any, title: any) {
    if (confirm('Are you sure you want to delete tour: ' + title + ' ?')) {
      this.tourService.deleteTours(id).subscribe(() => {
        this.toast.success({detail : "Notification",summary: "Delete Tours Successfully",duration :3000})

        this.getAllTours();
      });
    }
  }
}
