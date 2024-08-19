import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pic-card',
  templateUrl: './pic-card.component.html',
  styleUrls: ['./pic-card.component.scss']
})
export class PicCardComponent implements OnInit{
  ngOnInit(): void {
    this.startImageRotations();
  }
  images1: string[] = [
    'assets/1.jpg',
    'assets/2.jpg',
    'assets/3.jpg',
    'assets/4.jpg'
  ];

  imageIndexs = 0;
  private intervalIds: any;


  startImageRotations(): void {
    this.intervalIds = setInterval(() => {
      this.nextImages()
    }, 3000);   // Change image every 2 seconds
  }

  nextImages(): void {
    if (this.imageIndexs < this.images1.length - 1) {
      this.imageIndexs++;
    } else {
      this.imageIndexs = 0;
    }
  }
}
