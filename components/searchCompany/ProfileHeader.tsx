import { Button } from '@/components/ui/button';
import { MapPin, PenLine, Share } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ProfileHeaderProps {
  img: string | StaticImageData;
  name: string;
  description: string;
  location: string;
  onReview: () => void;
}

const ProfileHeader = ({ img, name, description, location, onReview }: ProfileHeaderProps) => {
  return (
    <div className="w-full rounded-xl border-custom-border border md:-mt-20 bg-white relative px-2 md:px-6 py-4">
      {/* Row 1: avatar + text + buttons (desktop) / avatar + buttons (mobile) */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 md:items-center items-start flex-col md:flex-row min-w-0">
          <Image
            src={img}
            alt={'Company Image'}
            className="object-cover w-30 h-30 rounded-full shrink-0"
          />
          {/* Text — hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-col min-w-0 w-full">
            <p className="text-text-primary text-3xl font-bold truncate">{name}</p>
            <p className="text-text-secondary text-xl">{description}</p>
            <p className="flex items-center gap-1">
              <MapPin size={14} className="shrink-0" />
              <span>{location}</span>
            </p>
          </div>
        </div>

        {/* Buttons*/}
        <div className="flex gap-2 flex-col md:flex-row shrink-0 md:self-center">
          <Button className="p-6 rounded-sm flex gap-1" variant={'default'} onClick={onReview}>
            <PenLine />
            Write a review
          </Button>
          <Button className="p-6 rounded-sm flex gap-1" variant={'outline'}>
            <Share />
            Share
          </Button>
        </div>
      </div>

      {/* Row 2: text — mobile only, full width so it wraps freely */}
      <div className="flex md:hidden flex-col mt-3 w-full">
        <p className="text-text-primary text-3xl font-bold">{name}</p>
        <p className="text-text-secondary text-xl">{description}</p>
        <p className="flex items-center gap-1">
          <MapPin size={14} className="shrink-0" />
          <span>{location}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
