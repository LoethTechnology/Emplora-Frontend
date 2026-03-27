import { LucideIcon} from "lucide-react";

interface ServiceCardProps {
    icon: LucideIcon;
    text: string;
    active?: boolean;
}

const ServiceCard = ({ icon: Icon, text, active = false }: ServiceCardProps) => {
  return (
    <div className={`rounded-lg p-5 flex flex-col gap-6 md:w-1/2 ${active ? "bg-[#3D52A0] text-white" : "bg-white text-black"}`}>
      <div className={`p-2 rounded-lg w-fit ${active ? "bg-[#4D62B0]" : "bg-[#EBEDF7]"}`}>
        <Icon size={24} className={active ? "text-white" : "text-[#3D52A0]"} />
      </div>
      <p className="text-sm md:text-md font-medium">{text}</p>
    </div>
  );
};

export default ServiceCard;