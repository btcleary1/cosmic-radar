'use client';

import { useState } from 'react';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    name: 'Landscape Design',
    description: 'Custom landscape design and planning services for your property, specializing in native plants and climate-appropriate solutions.',
    features: [
      'Site analysis and soil testing',
      'Custom design consultation',
      '3D landscape visualization',
      'Plant selection for your climate',
      'Professional installation',
      '1-year plant warranty',
    ],
    price: 'Starting at $2,500',
    priceNote: 'Price varies by property size and complexity',
  },
  {
    name: 'Lawn Maintenance',
    description: 'Professional lawn care and maintenance services for your home or business, including mowing, fertilization, and weed control.',
    features: [
      'Weekly or bi-weekly mowing',
      'Edge trimming and cleanup',
      'Fertilization program',
      'Weed control treatment',
      'Seasonal lawn care',
      'Equipment and supplies included',
    ],
    price: 'Starting at $150/month',
    priceNote: 'Based on property size and frequency',
  },
  {
    name: 'Tree & Shrub Care',
    description: 'Expert tree trimming, pruning, and shrub care services to ensure healthy growth and storm resistance.',
    features: [
      'Professional pruning and shaping',
      'Tree and shrub planting',
      'Disease and pest treatment',
      'Fertilization and soil care',
      'Removal of dead or damaged trees',
      'Native species expertise',
    ],
    price: 'Starting at $300',
    priceNote: 'Per service visit or project',
  },
  {
    name: 'Irrigation Systems',
    description: 'Professional irrigation system installation, repair, and maintenance for efficient water management.',
    features: [
      'Smart irrigation system design',
      'Professional installation',
      'Zone-based watering control',
      'Water-efficient sprinkler heads',
      'System maintenance and repairs',
      'Water regulation compliance',
    ],
    price: 'Starting at $1,800',
    priceNote: 'Complete system installation',
  },
  {
    name: 'Landscape Cleanup',
    description: 'Comprehensive landscape cleanup and debris removal services for storm cleanup, seasonal maintenance, and property preparation.',
    features: [
      'Seasonal leaf and debris removal',
      'Storm damage cleanup',
      'Overgrown vegetation clearing',
      'Mulch installation and refresh',
      'Property preparation services',
      'Eco-friendly disposal methods',
    ],
    price: 'Starting at $200',
    priceNote: 'Per cleanup service',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'Windsurf transformed our backyard into a beautiful oasis. Their attention to detail and plant knowledge is unmatched!',
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'Professional, punctual, and outstanding work. Our commercial property has never looked better. Highly recommend!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Property Manager',
    content: 'Reliable maintenance service that keeps our HOA looking pristine year-round. Great communication and fair pricing.',
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isOpen, setIsOpen] = useState(false);

  function openModal(service: typeof services[0]) {
    setSelectedService(service);
    setIsOpen(true);
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your</span>
                  <span className="block text-primary">Outdoor Space</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Professional landscaping services to enhance your property's beauty and value. From design to maintenance, we bring your vision to life with quality craftsmanship.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#services"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                    >
                      Our Services
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#contact"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Get a Quote
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Beautifully landscaped garden"
          />
        </div>
      </div>

      {/* Services section */}
      <div id="services" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Professional Landscaping Solutions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Comprehensive services to enhance your outdoor living space
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {services.map((service) => (
                <div key={service.name} className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="absolute -top-4 right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                    {service.price}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(service)}
                    className="mt-2 text-sm font-medium text-primary hover:text-primary-dark flex items-center"
                  >
                    View full details
                    <ChevronRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div id="about" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Trusted Landscaping Partner
            </p>
          </div>

          <div className="mt-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="relative">
                <img
                  className="relative w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Landscaping team working"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg w-2/3">
                  <p className="text-xl font-bold">15+ Years</p>
                  <p className="text-sm">Of landscaping excellence</p>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <p className="text-lg text-gray-600 mb-6">
                  At Windsurf Landscaping, we're passionate about creating beautiful, functional outdoor spaces that enhance your property's value and your quality of life. With over 15 years of experience in the industry, our team of certified professionals brings expertise, creativity, and attention to every project.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We believe in sustainable landscaping practices that work in harmony with the local environment. Our commitment to quality and customer satisfaction has made us a trusted name in residential and commercial landscaping services.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-primary">500+</p>
                    <p className="text-sm text-gray-600">Projects Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your outdoor space?</span>
            <span className="block text-primary-light">Get your free quote today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
              >
                Call Now
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="mailto:info@windsurflandscaping.com"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark hover:bg-opacity-90"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  {selectedService.name}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {selectedService.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-lg font-medium text-primary">{selectedService.price}</p>
                    <p className="text-sm text-gray-500">{selectedService.priceNote}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
