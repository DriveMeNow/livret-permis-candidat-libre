// src/pages/Candidate.jsx
import Navbar from '../components/Navbar';
import CandidateInfoForm from '../components/CandidateInfoForm';
import DocumentsUploader from '../components/DocumentsUploader';

export default function CandidatePage() {
  return (
    <div>
      <Navbar />
      <CandidateInfoForm />
      <DocumentsUploader />
    </div>
  );
}