"use client";

import { useState } from "react";
import ProgressStepper from "./ProgressStepper";

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestServiceModal({ isOpen, onClose }: RequestServiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    // Step 2 - Service Details
    serviceCategory: '',
    serviceDescription: '',
    serviceArea: '',
    // Step 3 - Past Service
    servedInPast: null as boolean | null,
    // Step 4 - Availability
    preferredDays: [] as string[],
    startTime: '',
    endTime: '',
    additionalNotes: '',
    // Consent
    consentToEmails: false
  });

  const steps = [
    { id: 1, title: 'Personal Details' },
    { id: 2, title: 'Service Details' },
    { id: 3, title: 'Past Service' },
    { id: 4, title: 'Availability' }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }));
  };

  const nextStep = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare data for Zapier webhook
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        serviceType: formData.serviceCategory,
        description: formData.serviceDescription,
        servedInPast: formData.servedInPast !== null ? (formData.servedInPast ? 'Yes' : 'No') : 'Not specified',
        preferredDays: formData.preferredDays.join(', '),
        timeStart: formData.startTime,
        timeEnd: formData.endTime,
        consentToEmails: formData.consentToEmails ? 'Yes' : 'No'
      };

      console.log('Submitting data:', submitData);

      // Try using a form submission approach as fallback
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://hooks.zapier.com/hooks/catch/25016398/uryq5s4';
      form.target = '_blank';
      
      // Add form data as hidden inputs
      Object.entries(submitData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Show success message
      alert('Thank you! Your service request has been submitted successfully.');
      onClose();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Fallback: Show contact information
      const contactInfo = `
        Thank you for your interest! Please contact us directly:
        
        Phone: 301-949-2500
        Email: Info@bettarappliance.com
        Address: 10503 Wheatley St, Kensington, MD 20895
        
        We'll be happy to help you with your service request!
      `;
      
      alert(contactInfo);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] shadow-2xl max-w-4xl w-full">
        <div className="p-3">
          {/* Modal Header */}
          <div className="relative flex justify-center items-center mb-8">
            <h2 className="text-2xl font-bold text-[#002D72]">Request Service</h2>
            <button 
              onClick={onClose}
              className="absolute right-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mb-6">
            <ProgressStepper 
              currentStep={currentStep} 
              steps={steps.map(step => step.title)} 
            />
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Step 1 - Personal Details */}
            {currentStep === 1 && (
              <div className="max-w-2xl mx-auto px-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">PERSONAL INFORMATION</h3>
                <p className="text-gray-600 mb-6 text-center">Provide your personal information to get started.</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2 - Service Details */}
            {currentStep === 2 && (
              <div className="max-w-2xl mx-auto px-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">SERVICE DETAILS</h3>
                <p className="text-gray-600 mb-2 text-center">Tell us about the services you provide or need.</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                  <select 
                    value={formData.serviceCategory}
                    onChange={(e) => handleInputChange('serviceCategory', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="appliance-repair">Appliance Repair</option>
                    <option value="handyman">Handyman Services</option>
                    <option value="plumbing">Plumbing & Heating</option>
                    <option value="electrical">Electrical</option>
                    <option value="renovations">Renovations & Remodeling</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                  <textarea 
                    value={formData.serviceDescription}
                    onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    placeholder="Describe the service you need or provide..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location / Service Area</label>
                  <input 
                    type="text" 
                    value={formData.serviceArea}
                    onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    placeholder="Enter your service area or location"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3 - Past Service */}
            {currentStep === 3 && (
              <div className="max-w-2xl mx-auto px-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">PAST SERVICE</h3>
                <p className="text-gray-600 mb-8 text-center">Have we served you in the past?</p>
                
                <div className="flex justify-center space-x-8">
                  <button
                    type="button"
                    onClick={() => handleInputChange('servedInPast', 'true')}
                    className={`px-10 py-4 rounded-lg font-semibold text-lg transition-colors ${
                      formData.servedInPast === true
                        ? 'bg-[#002D72] text-white'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('servedInPast', 'false')}
                    className={`px-10 py-4 rounded-lg font-semibold text-lg transition-colors ${
                      formData.servedInPast === false
                        ? 'bg-[#002D72] text-white'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 - Availability */}
            {currentStep === 4 && (
              <div className="max-w-xl mx-auto">
                <h3 className="text-base font-bold text-gray-800 mb-1">AVAILABILITY</h3>
                <p className="text-gray-600 mb-2 text-sm">Set your working hours or availability schedule.</p>
                
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Days</label>
                  <div className="grid grid-cols-7 gap-1 ">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`px-1 py-1 rounded text-xs font-medium transition-colors ${
                          formData.preferredDays.includes(day)
                            ? 'bg-[#002D72] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-2 ">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                  <textarea 
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={1}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-[#002D72] focus:border-transparent text-gray-700"
                    placeholder="Any additional information..."
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.consentToEmails}
                      onChange={(e) => handleInputChange('consentToEmails', String(e.target.checked))}
                      className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72] flex-shrink-0"
                      required
                    />
                    <span className="text-xs text-gray-700">
                      I consent to receiving emails regarding my service request and updates.
                    </span>
                  </label>
                </div>

                {/* Emergency Contact Information */}
                <div className="p-2 bg-[#F4F7FF] rounded">
                  <p className="text-xs text-gray-600 text-center">
                    <span className="font-semibold text-[#002D72]">For same-day service or emergencies,</span> please call us directly at{" "}
                    <a href="tel:301-949-2500" className="font-bold text-[#D32F2F] hover:underline">301-949-2500</a>
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-3">
              <button 
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center text-sm font-medium ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-[#D32F2F] hover:text-[#B71C1C]'
                }`}
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous
              </button>

              <button 
                type={currentStep === 4 ? 'submit' : 'button'}
                onClick={currentStep === 4 ? undefined : (e) => nextStep(e)}
                className="flex items-center px-6 py-3 bg-[#002D72] text-white rounded-lg hover:bg-[#001A5C] transition-colors font-medium"
              >
                {currentStep === 4 ? 'Submit Request' : 'Next'}
                {currentStep < 4 && (
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
