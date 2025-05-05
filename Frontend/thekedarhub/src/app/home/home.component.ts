import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  contractors = [
    { name: 'Mohan Kumar', image: 'src/assets/images/rennovation.jpg', rating: '★★★★☆', services: ['Renovation', 'Plumbing', 'Electrical'] },
    { name: 'Rites Yadav', image: 'contractor_image.jpg', rating: '★★★☆☆', services: ['Roofing', 'Carpentry'] },
    { name: 'Amit Anand', image: 'contractor_image.jpg', rating: '★★★★★', services: ['Landscaping', 'Interior Design'] },
    { name: 'Sohan Raj', image: 'contractor_image.jpg', rating: '★★★★☆', services: ['Painting', 'Tiling'] },
    { name: 'Prithav Raj', image: 'contractor_image.jpg', rating: '★★★★☆', services: ['HVAC', 'Cleaning'] },
    { name: 'Ramesh Kumar', image: 'contractor_image.jpg', rating: '★★★★☆', services: ['Renovation', 'Plumbing', 'Electrical'] },
    { name: 'Vikarant singh', image: 'contractor_image.jpg', rating: '★★★☆☆', services: ['Roofing', 'Carpentry'] },
    { name: 'Moahn singh', image: 'contractor_image.jpg', rating: '★★★★★', services: ['Landscaping', 'Interior Design'] },
    { name: 'Soni Singh', image: 'contractor_image.jpg', rating: '★★★★☆', services: ['Painting', 'Tiling'] },
    { name: 'Ram Raj', image: 'contractor_image.jpg', rating: '★★★★☆', services: ['HVAC', 'Cleaning'] }
  ];
  steps = [
    { title: 'Step 1', description: 'Submit your project details.' },
    { title: 'Step 2', description: 'Contractors submit their bids.' },
    { title: 'Step 3', description: 'Choose the best contractor for your needs.' },
    // Add more steps as needed
  ];
  
  constructor() { }

  
  title = 'ThekedarHub';
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngAfterViewInit() {
    // Placeholder for any future JS initialization (e.g., Swiper, Particles.js)
  }
  testimonials = [
    {
      initials: 'RK',
      name: 'Rajesh Kumar',
      role: 'Property Owner',
      quote: 'Found the perfect contractor for my house renovation through ThekedarHub. The bidding system helped me get competitive prices and the work quality was excellent.',
    },
    {
      initials: 'AS',
      name: 'Amit Singh',
      role: 'Professional Contractor',
      quote: 'ThekedarHub has transformed my business. I get regular projects and the payment system ensures I\'m paid on time. Highly recommended for all contractors!',
    },
    {
      initials: 'PG',
      name: 'Priya Gupta',
      role: 'Interior Designer',
      quote: 'The platform makes it easy to collaborate with clients and other professionals. The transparent system builds trust and helps deliver better results.',
    },
  ];
  categories = [
    {
      title: 'Home Construction',
      description: 'Complete house construction services from foundation to finishing',
      items: ['Architectural Planning', 'Structural Work', 'Interior Finishing'],
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      title: 'Renovation',
      description: 'Transform your existing space with modern renovation solutions',
      items: ['Kitchen Remodeling', 'Bathroom Upgrades', 'Room Extensions'],
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      title: 'Commercial Projects',
      description: 'Professional construction services for business spaces',
      items: ['Office Buildings', 'Retail Spaces', 'Warehouses'],
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];
  quickLinks = ['Home', 'Features', 'How It Works', 'Benefits', 'Categories', 'Contact'];
  legalLinks = ['About Us', 'Terms of Service', 'Privacy Policy', 'Contact', 'FAQ'];

}
