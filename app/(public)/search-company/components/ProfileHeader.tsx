import { Button } from "@/components/ui/button";
import { MapPin, PenLine, Share } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface ProfileHeaderProps {
  img: string | StaticImageData;
  name: string;
  description: string;
  location: string;
}

const ProfileHeader = ({
  img,
  name,
  description,
  location,
}: ProfileHeaderProps) => {
  return (
    <div className="w-full rounded-xl border-custom-border border -mt-20 bg-white z-2000 relative px-6 py-4 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image
          src={img}
          alt={"Company Image"}
          className="object-cover w-30 h-30 rounded-full"
        />
        <div>
          <p className="text-text-primary text-3xl font-bold">{name}</p>
          <p className="text-text-secondary text-xl">{description}</p>
          <p className="flex items-center">
            <MapPin size={14} />
            <span>{location}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button className="p-6 rounded-sm" variant={"default"}>
          <PenLine />
          Write a review
        </Button>
        <Button className="p-6 rounded-sm" variant={"outline"}>
          <Share />
          Share
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
