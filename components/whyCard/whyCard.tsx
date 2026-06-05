import Image, { StaticImageData } from "next/image";

interface WhyCardProps {
  image: StaticImageData;
  text: string;
}

const WhyCard = ({ image, text }: WhyCardProps) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl pb-3 md:w-72 border-2 border-gray-100">
      <Image
        src={image}
        alt={text}
        width={300}
        height={200}
        className="object-cover rounded-t-xl w-full h-48"
      />
      <p className="text-md text-gray-700 px-3">{text}</p>
    </div>
  );
};

export default WhyCard;