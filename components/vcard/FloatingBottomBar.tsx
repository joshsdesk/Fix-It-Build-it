"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faArrowUpFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";
import { generateVCard } from "@/functions/generate-vcard";

export default function FloatingBottomBar() {
  const handleDownload = () => {
    const blob = generateVCard();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "JohnDoe.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "John Doe - Fix-It Build-It",
          text: "Check out my digital business card!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      // Fallback
      alert("Copy this link to share: " + window.location.href);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
      <div className="w-full max-w-md flex items-center justify-between gap-3">
        
        {/* QR Code Button */}
        <button 
          className="w-14 h-14 rounded-full bg-fibi-accent text-white flex items-center justify-center shadow-lg hover:bg-fibi-accent-muted transition-colors"
          onClick={() => alert("QR Code generation coming soon!")}
        >
          <FontAwesomeIcon icon={faQrcode} className="text-xl" />
        </button>
        
        {/* Share Button */}
        <button 
          className="w-14 h-14 rounded-full bg-fibi-accent text-white flex items-center justify-center shadow-lg hover:bg-fibi-accent-muted transition-colors"
          onClick={handleShare}
        >
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-xl" />
        </button>

        {/* Add to Contact Button */}
        <button 
          onClick={handleDownload}
          className="flex-1 h-14 rounded-full bg-fibi-accent text-white flex items-center justify-center gap-2 shadow-lg hover:bg-fibi-accent-muted transition-colors px-4"
        >
          <span className="font-semibold text-lg">Add to Contact</span>
          <div className="w-8 h-8 bg-white text-fibi-accent rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>

      </div>
    </div>
  );
}
