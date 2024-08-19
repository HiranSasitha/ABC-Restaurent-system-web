import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pic-card-v',
  templateUrl: './pic-card-v.component.html',
  styleUrls: ['./pic-card-v.component.scss']
})
export class PicCardVComponent implements OnInit{
  ngOnInit(): void {
    this.startImageRotations();
  }
  images1: string[] = [
    'assets/11.jpg',
    'assets/12.jpg',
    'assets/13.jpg',
    'assets/14.jpg'
  ];

  imageIndexs = 0;
  private intervalIds: any;


  startImageRotations(): void {
    this.intervalIds = setInterval(() => {
      this.nextImages()
    }, 5000);   // Change image every 2 seconds
  }

  nextImages(): void {
    if (this.imageIndexs < this.images1.length - 1) {
      this.imageIndexs++;
    } else {
      this.imageIndexs = 0;
    }
  }
}
