import { Component } from '@angular/core';

@Component({
  selector: 'app-viewbids',
  templateUrl: './viewbids.component.html',
  styleUrl: './viewbids.component.css'
})
export class ViewbidsComponent {
  globalCounterBid: number = 0; // Single input for all counter bids

  bids = [
    {
      contractorName: 'Rajesh Kumar',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.7,
      amount: 5000,
      time: '2 Weeks',
    },
    {
      contractorName: 'Sunita Sharma',
      profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9,
      amount: 4800,
      time: '10 Days',
    },
    {
      contractorName: 'Amit Verma',
      profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.5,
      amount: 5200,
      time: '3 Weeks',
    }
    , {
      contractorName: 'Rajesh Kumar',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.7,
      amount: 5000,
      time: '2 Weeks',
    },
    {
      contractorName: 'Sunita Sharma',
      profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9,
      amount: 4800,
      time: '10 Days',
    },
    {
      contractorName: 'Amit Verma',
      profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.5,
      amount: 5200,
      time: '3 Weeks',
    }
  ];

  counterAllBids() {
    if (this.globalCounterBid > 0) {
      alert(`You countered ₹${this.globalCounterBid} for all contractors.`);
    } else {
      alert('Please enter a valid counter bid.');
    }
  }

  acceptBid(bid: any) {
    alert(`${bid.contractorName}'s bid of ₹${bid.amount} has been accepted!`);
  }

  rejectBid(bid: any) {
    alert(`${bid.contractorName}'s bid has been rejected.`);
  }

}
