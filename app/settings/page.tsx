"use client";

import { Suspense, useState } from "react";
import ProfileInformation from "@/components/profile-information";
import ChangePassword from "@/components/change-password";
import TrustAndSafety from "@/components/trust-and-safety";
import PrivacyAndPolicy from "@/components/privacy-and-policy";
import TermsAndConditions from "@/components/terms-and-conditions";
import SettingsLayout from "@/components/settings-layout";

 function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileInformation />;
      case "password":
        return <ChangePassword />;
      case "trust":
        return <TrustAndSafety />;
      case "privacy":
        return <PrivacyAndPolicy />;
      case "terms":
        return <TermsAndConditions />;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w- mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>

        <SettingsLayout
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        >
          {renderContent()}
        </SettingsLayout>
      </div>
    </div>
  );
}

export default function Settings() {
  return <Suspense fallback={<div>Loading...</div>}><SettingsPage /></Suspense>
}