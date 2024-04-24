import React from 'react';
import DisplayLicensePackages from '../Components/DisplayLicensePackages'
import FeedbackForm from '../Components/AddReview'

export default function Home() {
  return (
    <div>
      <div> <DisplayLicensePackages /> </div>
      <div> <FeedbackForm /> </div>
    </div>
  );
}
