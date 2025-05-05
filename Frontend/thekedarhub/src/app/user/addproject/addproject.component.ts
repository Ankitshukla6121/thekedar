import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import {  AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent  implements AfterViewInit {
  renovationForm: FormGroup;
  projects: any[] = [];
  taskOptions = [
    { name: 'Painting' },
    { name: 'Flooring' },
    { name: 'Plumbing' },
    { name: 'Electrical' },
    { name: 'Roofing' },
    { name: 'Carpentry' },
    { name: 'Demolition' },
    { name: 'Tiling' },
    { name: 'Masonry' },
    { name: 'Landscaping' },
    { name: 'HVAC' },  // Heating, Ventilation, and Air Conditioning
    { name: 'Renovation' },  // Includes work such as kitchen and bathroom renovations
    { name: 'Construction' },  // New building construction
    // Add other options
  ];
  

  locationOptions = [
    { category: 'Urban' },
    { category: 'Suburban' },
    { category: 'Rural' },
    { category: 'Coastal' },  // Coastal areas may have different building codes and materials
    { category: 'Mountainous' },  // Some projects in mountain regions may have higher complexity
    { category: 'Industrial Area' },
    { category: 'Historical Area' },  // Can affect renovation costs due to preservation rules
    // Add other options
  ];
  

  materialQualities = [
    { type: 'Standard' },
    { type: 'Premium' },
    { type: 'Luxury' },  // High-end, exclusive materials (e.g., marble, high-end fixtures)
    { type: 'Economy' },  // Budget materials (e.g., low-cost flooring, cheap paint)
    { type: 'Eco-Friendly' },  // Environmentally conscious, sustainable materials
    { type: 'Industrial' },  // Materials designed for industrial or heavy-duty use
    // Add other options
  ];
  
  urgencyOptions = [
    { label: 'Standard', value: 1.0 },
    { label: 'Urgent', value: 1.5 },
    { label: 'Very Urgent', value: 2.0 },  // Adds higher cost for extreme urgency
    { label: 'Emergency', value: 3.0 },  // Adds a significant surcharge for emergency cases
    // Add other options
  ];
  

  complexityOptions = [
    { label: 'Simple', value: 1.0 },
    { label: 'Medium', value: 1.2 },
    { label: 'Complex', value: 1.5 },
    { label: 'Very Complex', value: 2.0 },  // Projects that require highly specialized skills or planning
    { label: 'Extremely Complex', value: 2.5 },  // Large-scale projects requiring detailed planning and multiple stages
    // Add other options
  ];
  

  constructor(private fb: FormBuilder, private projectService: UserService) {
    this.renovationForm = this.fb.group({
      squareFeet: [null],
      taskType: [null],
      location: [null],
      materialQuality: [null],
      urgency: [1.0],
      complexity: [1.0],
    });
  }

  onSubmit() {
    console.log(sessionStorage.getItem("id"));
    const formData = this.renovationForm.value;
    this.projectService.addProject(formData).subscribe(
      (response) => {
      
        alert('Project added successfully!');
        this.renovationForm.reset();
      },
      (error) => {
        console.error('Error adding project', error);
        alert('Failed to add project. Please try again.');
      }
    );
  }
  @ViewChild('crudModal', { static: false }) modalElement!: ElementRef;

  
  
  ngAfterViewInit() {
    if (this.modalElement) {
      const modal = new bootstrap.Modal(this.modalElement.nativeElement);
  
      // Show modal after a short delay to avoid focus conflicts
      setTimeout(() => modal.show(), 300);
  
      // Remove focus when closing
      this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
        const activeEl = document.activeElement as HTMLElement;
        if (activeEl && typeof activeEl.blur === 'function') {
          activeEl.blur();
        }
      });
    }
  }
  
}
