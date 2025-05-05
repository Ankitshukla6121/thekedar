import { Component } from '@angular/core';
import { ContractorService } from '../contractor.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { CurrentUserInfoService } from '../../shared/services/current-user-info.service';
import { response } from 'express';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  contractorForm!: FormGroup;
  profileImageForm!: FormGroup;
  originalProfileData:any={};
  selectedFile : File | null=null;
  profileImageUrl: string | ArrayBuffer | null = null;
  contractorProfile : any = null;
  loading=true;
  errorMessage='';
  currentUserData:any ;
  userId:string='';
  uploadedProfileImageUrl:string|null = null;
  imagePreview: string | ArrayBuffer | null = null; // For showing preview
  previousImage: string = '';
  isLoading: boolean = false;  // Add this in your component
  specializations = ['Painting', 'Flooring', 'Plumbing', 'Electrical', 'Roofing', 
    'Carpentry', 'Demolition', 'Tiling', 'Masonry', 'Landscaping', 
    'HVAC', 'Renovation', 'Construction'];

  constructor(private contractorService: ContractorService, private router: Router, private fb: FormBuilder , private CurrentUserInfoService : CurrentUserInfoService ) {
    this.profileImageForm=this.fb.group({
    });
    this.currentUserData=this.CurrentUserInfoService.getUserInfo();
  }

  ngOnInit(): void {
    this.contractorProfileFetch();
    this.initializeForm();

  }
  initializeForm(){
    this.contractorForm=this.fb.group({
      contractorName: ['', Validators.required],
      contractorEmail: ['', [Validators.required, Validators.email]],
      contractorPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contractorAddress: ['', Validators.required],
      contractorPincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      contractorExperience: [0, [Validators.required, Validators.min(1)]],
      contractorSpecialization: ['', Validators.required],
      contractorLicenseNumber: ['', Validators.required],
      contractorProfileImage: [''],
      completedProjects: [0, Validators.min(0)],
      availabilityStatus: ['available', Validators.required]
    });
  }
  

  uploadProfilePicture(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profileImageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.contractorForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    this.contractorService.addContractorPersonalDetails(this.contractorForm.value).subscribe(
      () => {
        alert('Profile Updated Successfully');
        this.router.navigate(['/contractor/profile']);
      },
      (err) => {
        alert('Error in updating profile');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/contractor/profile']);
        });
      }
    );
  }

  get f() {
    return this.contractorForm.controls;
  }

  contractorProfileFetch(){
    this.contractorService.fetchContractorProfile().subscribe({
      next: (response:any) => {
        this.contractorProfile=response.contractorProfile;
        this.loading=false;
        if(this.contractorProfile){
          this.originalProfileData={...this.contractorProfile};
          this.contractorForm.patchValue(this.originalProfileData);
        }
      },


      error:(error)=>{
        this.loading=false;
        if(error.status===404){
          this.contractorProfile=null;
        }else{
          this.errorMessage='An error occur while Featching the profile';
        }
        this.loading=false;
      }
    });
  }

  updateProfile(){
    if(this.contractorForm.invalid){
      alert('Please fill all required fields correctly.');
      return;
    }
    const updatedData : any = {};
    Object.keys(this.contractorForm.value).forEach((key) => {
      if(this.contractorForm.controls[key].dirty && this.contractorForm.value[key] !== this.originalProfileData[key]){
        updatedData[key] = this.contractorForm.value[key];
      }
    });
    if(Object.keys(updatedData).length===0){
      alert('No changes found');
      return ;
    }
    this.contractorService.updateContractorProfile(updatedData).subscribe({
      next: (response:any) => {
        alert('Profile Updated SuccessFully');
        this.originalProfileData={...this.contractorForm.value};
        
      },
      error:(err)=>{
        console.log(updatedData);
        console.log(err);
        alert('Error Updating During Profile Updating . Please Try Again');
      }
    });

  }

 onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      console.log("Selected File:", file); // Logs the first selected file
      this.selectedFile = file;

      // ✅ Show image preview before uploading
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result ?? null; // Convert file to data URL for preview
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected.");
    }
  }
 onSubmit(){
  
  if(!this.selectedFile){
    alert('Please select a file to upload');
    return ;
  }
  this.isLoading = true;
  
  const formData = new FormData();
  formData.append('image', this.selectedFile);
  this.contractorService.uploadProfileImage(this.currentUserData.id,formData).subscribe(response=>{

    const modalElement = document.getElementById('yourModalId') as HTMLElement;
    this.closeModal();

        // ✅ Refresh the page after closing the modal
        setTimeout(() => {
          window.location.reload();
        }, 500); 
        this.isLoading = false; 
  
  });
 }
 closeModal() {
  const modalElement = document.getElementById('exampleModal') as HTMLElement;
  if (modalElement) {
    modalElement.classList.remove('show'); // Remove Bootstrap 'show' class
    modalElement.style.display = 'none'; // Hide modal
    document.body.classList.remove('modal-open'); // Remove backdrop effect


    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
}
