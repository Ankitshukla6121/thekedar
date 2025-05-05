import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { ContractorService } from '../../contractor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  projectId = ''; 
  contractorId = ''; 
  contractorProfile: any = null;
  bids: any[] = [];

  contractorBidAmount: number = 0;
  selectedTimeOption: string = '';
  customTime: string = '';
  loading = false;
  errorMessage = '';
  originalProfileData: any = {};
  counterBid: number = 0;

  constructor(
    private socketService: SocketService,
    private contractorService: ContractorService,
    private modalService: NgbModal 
  ) {}

  ngOnInit(): void {
    this.contractorProfileFetch();
    this.socketService.joinProjectRoom(this.projectId);

    this.socketService.onNewBid().subscribe(({ bid }) => {
      this.bids.push(bid);
    });

    this.socketService.onCounteredBid().subscribe(({ contractorId, newAmount }) => {
      if (contractorId === this.contractorId) {
        alert(` User countered your bid to ₹${newAmount}`);
      }
    });

    this.socketService.onFinalized().subscribe(data => {
      if (data.contractorId === this.contractorId) {
        alert(' Your bid has been finalized!');
      }
    });
  }

  contractorProfileFetch() {
    this.loading = true;
    this.contractorService.fetchContractorProfile().subscribe({
      next: (response: any) => {
        this.contractorProfile = response.contractorProfile;
        this.loading = false;
        if (this.contractorProfile) {
          this.originalProfileData = { ...this.contractorProfile };
          this.contractorId = this.contractorProfile._id || this.contractorProfile.id;
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 404) {
          this.contractorProfile = null;
        } else {
          this.errorMessage = 'An error occurred while fetching the profile.';
        }
      }
    });
  }

  submitContractorBid() {
    const completionTime =
      this.selectedTimeOption === 'custom' ? this.customTime : this.selectedTimeOption;

    if (!this.contractorBidAmount || !completionTime || !this.contractorProfile) {
      return alert('❗ Please complete your bid and make sure your profile is loaded');
    }

    const bidData = {
      projectId: this.projectId,
      contractorId: this.contractorId,
      contractor: {
        name: this.contractorProfile.name,
        profileImage: this.contractorProfile.profileImage || 'https://via.placeholder.com/40'
      },
      amount: this.contractorBidAmount,
      completionTime
    };

    this.socketService.submitBid(bidData);
    this.bids.push(bidData);

    
    this.contractorBidAmount = 0;
    this.selectedTimeOption = '';
    this.customTime = '';
  }

  openBidModal(bid: any) {
    
    this.modalService.open(bid, { centered: true });
  }

  submitCounterBid() {
    if (this.counterBid <= 0) {
      return alert('❗ Please enter a valid counter bid amount.');
    }

    const counterBidData = {
      projectId: this.projectId,
      contractorId: this.contractorId,
      newAmount: this.counterBid,
    };

    this.socketService.counterBid(counterBidData);
    this.counterBid = 0;
  }
}
