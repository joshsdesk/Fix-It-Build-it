"use client";

import React, { useState, useEffect } from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { vcardData, SocialAccount } from "@/config/BusinessInfo";
import { SocialIcon } from "@/components/ui/SocialIcon";

type PlatformId = 'website' | 'linkedin' | 'facebook' | 'instagram';

// Interface for the dynamically scraped data
interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
}

// A dedicated component for rendering a single dropdown item
function DynamicLinkPreview({ acc }: { acc: SocialAccount }) {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreview() {
      try {
        const res = await fetch(`/api/link-preview?url=${encodeURIComponent(acc.url)}`);
        const json = await res.json();
        setData(json as LinkPreviewData);
      } catch (err) {
        console.error("Failed to fetch link preview", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPreview();
  }, [acc.url]);

  if (loading) {
    return (
      <div className="flex flex-row p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 animate-pulse items-start">
        <div className="w-16 h-16 rounded-md bg-slate-700 mr-3 flex-shrink-0"></div>
        <div className="flex flex-col flex-1 gap-2 mt-1">
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
          <div className="h-3 bg-slate-700/50 rounded w-full"></div>
          <div className="h-3 bg-slate-700/50 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  // Fallback defaults if scraper failed to find something
  const title = data?.title || acc.type + " " + acc.platform;
  const desc = data?.description || "";
  // Prefer user's manual image override, then the scraped image
  const imageUrl = acc.imageUrl || data?.image || null;

  return (
    <a 
      href={acc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row p-3 hover:bg-slate-800/80 rounded-lg transition-colors border border-slate-700/50 hover:border-fibi-accent/50 group items-start"
    >
      {/* Thumbnail Image - Standalone (No borders/backgrounds) */}
      {imageUrl ? (
        <div className="w-16 h-16 mr-3 flex-shrink-0 relative">
          <img 
            src={imageUrl} 
            alt={`${title} Profile`} 
            className="w-full h-full object-contain absolute inset-0"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('span')?.classList.remove('hidden');
            }}
          />
          <span className="hidden w-full h-full text-slate-500 text-xl font-bold flex items-center justify-center relative z-10">{title.charAt(0)}</span>
        </div>
      ) : (
        <div className="w-16 h-16 mr-3 flex-shrink-0 flex items-center justify-center">
          <span className="text-slate-500 text-xl font-bold">{title.charAt(0)}</span>
        </div>
      )}
      
      {/* Content Right Side */}
      <div className="flex flex-col flex-1 overflow-hidden justify-center">
        <h3 className="text-slate-200 text-base font-bold truncate pr-2 group-hover:text-white mb-1">
          {title}
        </h3>
        
        {desc && (
          <p className="text-slate-400 text-xs leading-relaxed mb-2 line-clamp-2">
            {desc}
          </p>
        )}
        
        <div className="flex items-center text-fibi-accent/80 text-xs font-medium group-hover:text-fibi-accent mt-auto">
          <span className="truncate">Visit Link</span>
          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}

export default function WebLinksCard() {
  const [expandedPlatform, setExpandedPlatform] = useState<PlatformId | null>(null);

  const accountsByPlatform: Record<PlatformId, SocialAccount[]> = {
    website: [],
    linkedin: [],
    facebook: [],
    instagram: [],
  };

  // Add primary accounts
  if (vcardData.website) accountsByPlatform.website.push({ platform: 'website', type: 'Business', url: vcardData.website });
  if (vcardData.linkedin) accountsByPlatform.linkedin.push({ platform: 'linkedin', type: 'Business', url: vcardData.linkedin });
  if (vcardData.facebook) accountsByPlatform.facebook.push({ platform: 'facebook', type: 'Business', url: vcardData.facebook });
  if (vcardData.instagram) accountsByPlatform.instagram.push({ platform: 'instagram', type: 'Business', url: vcardData.instagram });

  // Add extra social accounts from array
  (vcardData.socialAccounts || []).forEach(acc => {
    const plat = acc.platform as PlatformId;
    if (accountsByPlatform[plat]) {
      const isDuplicate = accountsByPlatform[plat].some(existing => existing.url === acc.url);
      if (!isDuplicate) {
        accountsByPlatform[plat].push(acc as SocialAccount);
      }
    }
  });

  const platforms = [
    { id: 'website', icon: faGlobe, label: "Website" },
    { id: 'linkedin', icon: faLinkedin, label: "LinkedIn" },
    { id: 'facebook', icon: faFacebook, label: "Facebook" },
    { id: 'instagram', icon: faInstagram, label: "Instagram" },
  ] as const;

  const handleIconClick = (e: React.MouseEvent, id: PlatformId, count: number) => {
    if (count > 1) {
      e.preventDefault();
      setExpandedPlatform(expandedPlatform === id ? null : id);
    }
  };

  const expandedAccounts = expandedPlatform ? accountsByPlatform[expandedPlatform] : [];

  return (
    <div className="component-surface p-4 flex flex-col items-center bg-slate-900/80 backdrop-blur-md">
      <div className="w-full flex justify-around items-center relative">
        {platforms.map((plat) => {
          const accs = accountsByPlatform[plat.id];
          if (accs.length === 0) return null;
          
          const primaryUrl = accs[0].url;
          const isExpanded = expandedPlatform === plat.id;
          
          return (
            <div key={plat.id} className="relative flex flex-col items-center">
              <SocialIcon
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={plat.icon}
                label={plat.label}
                size="4xl"
                className={`w-14 h-14 ${isExpanded ? 'text-fibi-accent scale-110' : ''}`}
                onClick={(e) => handleIconClick(e, plat.id, accs.length)}
              />
              {accs.length > 1 && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 transition-colors ${isExpanded ? 'bg-fibi-accent' : 'bg-slate-600'}`} />
              )}
            </div>
          )
        })}
      </div>
      
      {/* Expandable Sub-list Area */}
      {expandedPlatform && expandedAccounts.length > 0 && (
        <div className="w-full mt-3 border-t border-slate-700/50 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-slate-400 mb-3 ml-1 font-medium uppercase tracking-wider">
            Select a {expandedPlatform} profile
          </p>
          <div className="flex flex-col gap-2">
            {expandedAccounts.map((acc, idx) => (
              <DynamicLinkPreview key={idx} acc={acc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
