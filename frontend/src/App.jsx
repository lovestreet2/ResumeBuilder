import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/authContext.jsx";
import ResumeForm from "./components/resume/ResumeForm.jsx";
import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EducationDetails from "./components/resumes/EducationDetails.jsx";
import WorkExperience from "./components/resumes/WorkExperience.jsx";
import SkillsSection from "./components/resumes/SkillsSection.jsx";
import ProjectsSection from "./components/resumes/ProjectsSection.jsx";
import ResumeSections from "./components/resumes/ResumeSections.jsx";
import PersonalDetails from "./components/resumes/Personal Details.jsx";
import { ResumeContext, ResumeProvider } from "./context/resumeContext.jsx";
import FinalResumePreview from "./components/resume/FinalResumePreview.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeForm />} />

          <Route path="/person" element={<PersonalDetails />} />
          <Route path="/educate" element={<EducationDetails />} />
          <Route path="/exp" element={<WorkExperience />} />
          <Route path="/skill" element={<SkillsSection />} />
          <Route path="/project" element={<ProjectsSection />} />
          <Route path="/resumes" element={<ResumeSections />} />

          <Route path="/finalresume" element={<FinalResumePreview />} />
        </Routes>
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;

{
  /*import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

// Import Components
import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeForm from "./components/resume/ResumeForm.jsx";
import PersonalDetails from "./components/resumes/Personal Details.jsx";
import EducationDetails from "./components/resumes/EducationDetails.jsx";
import WorkExperience from "./components/resumes/WorkExperience.jsx";
import SkillsSection from "./components/resumes/SkillsSection.jsx";
import ProjectsSection from "./components/resumes/ProjectsSection.jsx";
import ResumeSections from "./components/resumes/ResumeSections.jsx";
import FinalResumePreview from "./components/resume/FinalResumePreview.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login" />} />

        
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeForm />} />
          <Route path="/person" element={<PersonalDetails />} />
          <Route path="/educate" element={<EducationDetails />} />
          <Route path="/exp" element={<WorkExperience />} />
          <Route path="/skill" element={<SkillsSection />} />
          <Route path="/project" element={<ProjectsSection />} />
          <Route path="/resumes" element={<ResumeSections />} />
          <Route path="/final-preview" element={<FinalResumePreview />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;*/
}
