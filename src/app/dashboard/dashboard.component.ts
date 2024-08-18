import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/88.jpg',
    'assets/89.jpg',
    'assets/90.jpg'
  ];

  images1: string[] = [
    'assets/1.jpg',
    'assets/2.jpg',
    'assets/3.jpg',
    'assets/4.jpg'
  ];



  imageIndex = 0;
  imageIndexs = 0;
  private intervalId: any;
  private intervalIds: any;

  ngOnInit(): void {
    this.startImageRotation();
    this.startImageRotations();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 4000);   // Change image every 2 seconds
  }

  startImageRotations(): void {
    this.intervalIds = setInterval(() => {
      this.nextImages()
    }, 3000);   // Change image every 2 seconds
  }

  nextImage(): void {
    if (this.imageIndex < this.images.length - 1) {
      this.imageIndex++;
    } else {
      this.imageIndex = 0;
    }
  }

  previousImage(): void {
    if (this.imageIndex > 0) {
      this.imageIndex--;
    } else {
      this.imageIndex = this.images.length - 1;
    }
  }

  nextImages(): void {
    if (this.imageIndexs < this.images1.length - 1) {
      this.imageIndexs++;
    } else {
      this.imageIndexs = 0;
    }
  }
}
