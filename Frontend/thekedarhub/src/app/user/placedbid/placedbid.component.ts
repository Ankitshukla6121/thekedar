import { Component } from '@angular/core';

@Component({
  selector: 'app-placedbid',
  templateUrl: './placedbid.component.html',
  styleUrl: './placedbid.component.css'
})
export class PlacedbidComponent {
  bids = [
    {
      _id: '1',
      amount: 15000,
      completionTime: '2 weeks',
      contractor: {
        name: 'Ravi Verma',
        profileImage: 'assets/ravi.jpg'
      }
    },
    {
      _id: '2',
      amount: 14500,
      completionTime: '1 month',
      contractor: {
        name: 'Priya Singh',
        profileImage: 'assets/priya.jpg'
      }
    },
    {
      _id: '3',
      amount: 16000,
      completionTime: '1 week',
      contractor: {
        name: 'Amit Chauhan',
        profileImage: ''
      }
    }
  ];

  counterBid: number = 0;
  selectedTimeOption: string = '';
  customTime: string = '';

  getFinalCompletionTime(): string {
    return this.selectedTimeOption === 'custom' ? this.customTime : this.selectedTimeOption;
  }

  submitCounterBid() {
    const payload = {
      amount: this.counterBid,
      completionTime: this.getFinalCompletionTime()
    };
    console.log('Submitting counter bid to all contractors:', payload);
    // Add your backend/socket logic here
  }

  acceptBid(bidId: string) {
    console.log('Bid accepted with ID:', bidId);
    // Add backend call here
  }

  rejectBid(bidId: string) {
    console.log('Bid rejected with ID:', bidId);
    // Add backend call here
  }
}
