import { Component, OnInit } from '@angular/core';
import {Tour} from "../../models/tour";
import {TourService} from "../../services/tour.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tour?: Tour
  id: any

  constructor(private tourService: TourService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'));
      this.getToursById(this.id);
    })
  }

  ngOnInit(): void {
  }

  getToursById(id: number) {
    this.tourService.getToursById(id).subscribe(tour => {
      this.tour = tour;
    })
  }
}
