"use client";

import React, { useState } from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { vcardData, SocialAccount } from "@/config/BusinessInfo";
import { SocialIcon } from "@/components/ui/SocialIcon";

type PlatformId = 'website' | 'linkedin' | 'facebook' | 'instagram';

// A dedicated component for rendering a single dropdown item statically
function StaticLinkPreview({ acc }: { acc: SocialAccount }) {
  const title = acc.label || acc.type + " " + acc.platform;
  const desc = acc.description || "";
  const imageUrl = acc.imageUrl || null;

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

  // Helper to safely extract a handle for default primary links
  const getHandle = (url: string) => {
    try {
      if (url.includes('instagram.com/')) return '@' + url.split('instagram.com/')[1].split('?')[0].replace(/\//g, '');
      if (url.includes('linkedin.com/in/')) return url.split('linkedin.com/in/')[1].split('?')[0].replace(/\//g, '');
      if (url.includes('facebook.com/')) return url.split('facebook.com/')[1].split('?')[0].replace(/\//g, '');
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return 'Link';
    }
  };

  // Helper to check if a primary URL is already customized in socialAccounts
  const isCustomized = (url: string) => {
    return (vcardData.socialAccounts || []).some(acc => acc.url === url);
  };

  // Add primary accounts with fallback labels if they aren't provided explicitly in socialAccounts
  if (vcardData.website && !isCustomized(vcardData.website)) accountsByPlatform.website.push({ platform: 'website', type: 'Business', url: vcardData.website, label: "Main Website", description: getHandle(vcardData.website), imageUrl: vcardData.logoImage });
  if (vcardData.linkedin && !isCustomized(vcardData.linkedin)) accountsByPlatform.linkedin.push({ platform: 'linkedin', type: 'Business', url: vcardData.linkedin, label: "Main LinkedIn", description: getHandle(vcardData.linkedin), imageUrl: vcardData.profileImage });
  if (vcardData.facebook && !isCustomized(vcardData.facebook)) accountsByPlatform.facebook.push({ platform: 'facebook', type: 'Business', url: vcardData.facebook, label: "Main Facebook", description: getHandle(vcardData.facebook), imageUrl: vcardData.logoImage });
  if (vcardData.instagram && !isCustomized(vcardData.instagram)) accountsByPlatform.instagram.push({ 
    platform: 'instagram', 
    type: 'Business', 
    url: vcardData.instagram, 
    label: "Fix-It Build-It Colorado", 
    description: getHandle(vcardData.instagram),
    imageUrl: "https://scontent-msp1-1.cdninstagram.com/v/t51.82787-19/731754283_18114890849311047_7974306995239146690_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=108&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=maL8The0ZFEQ7kNvwGhP6Cx&_nc_oc=AdpQei6TbKVhTJHNZBKpBoWzWHDF6YVcv8XqugARNYPIKqchxHAeNuaIMAfC_MvshK0&_nc_zt=24&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_gid=jCLV6zBBL7g_Z_GfyD-ayg&_nc_ss=7b689&oh=00_AQNA-s9wpEhA-PggUhyouSAZ88CVauZVRXrExJtxt954TA&oe=6AC378C8"
  });

  // Add extra social accounts from array (these now take precedence)
  (vcardData.socialAccounts || []).forEach(acc => {
    const plat = acc.platform as PlatformId;
    if (accountsByPlatform[plat]) {
      accountsByPlatform[plat].push(acc as SocialAccount);
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
              <StaticLinkPreview key={idx} acc={acc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
