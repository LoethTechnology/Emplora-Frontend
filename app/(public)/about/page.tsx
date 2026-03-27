import Footer from "../../../components/footer/footer";
import Navbar from "../../../components/navbar/navbar";
import Image from "next/image";
import backdrop from "../../../images/about/backdrop.png";
import image1 from "../../../images/about/image1.jpg";
import SectionBadge from "../../../components/sectionBadge/sectionBadge";
import ServiceCard from "../../../components/serviceCard/serviceCard";
import { Search, BookOpen, Users, Briefcase } from "lucide-react";
import WhyCard from "../../../components/whyCard/whyCard";
import image2 from "../../../images/about/image2.jpg"
import image3 from "../../../images/about/image3.jpg"
import image4 from "../../../images/about/image4.jpg"

const About = () => {
  return (
    <main>
      <div className="relative">
        <Navbar variant="overlay" />
        <div className="relative h-96 flex items-center justify-center">
          <Image
            src={backdrop}
            alt="about backdrop"
            fill
            className="object-cover"
          />
          <div className="text-white">
            <h1 className="relative z-10 font-semibold text-4xl">About Us</h1>
            <p className="relative text-center">Home | About Us</p>
          </div>
        </div>
      </div>
      <section className="bg-white flex flex-col md:flex-row md:items-start justify-center p-10 md:p-30 gap-10 md:gap-20">
        <div className="flex flex-col w-xs md:w-sm">
          <SectionBadge text="About Us" />
          <p>
            Emplora is an employer rating and review platform built to bring
            transparency to the job market. We believe that every job seeker
            deserves access to honest, real-world insights before making career
            decisions. Through Emplora, employees and former employees can share
            their experiences, rate companies, and help others understand what
            it&apos;s truly like to work in different organizations. Our goal is
            to empower individuals while encouraging companies to create better,
            more accountable workplaces.
          </p>
        </div>
        <div>
          <Image
            src={image1}
            alt="about backdrop"
            width={500}
            height={400}
            className="object-contain rounded-2xl"
          />
        </div>
      </section>
      <section className="py-10 md:p-20 bg-[#EBEDF7] ">
        <div className="flex flex-col  items-center justify-center">
          <SectionBadge text="Our services" />
          <h2 className="text-black font-semibold text-3xl">What we Do</h2>
          <p>We provide a platform where users can:</p>
          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 pt-12 w-full md:px-20 px-4">
            <ServiceCard
              icon={Search}
              text="Search for your companies"
              active={true}
            />
            <ServiceCard
              icon={BookOpen}
              text="Read authentic employee reviews"
            />
            <ServiceCard icon={Users} text="Share their office experiences" />
            <ServiceCard
              icon={Briefcase}
              text="Make informed career decisions"
            />
          </div>
        </div>
      </section>
      <section className="p-20 ">
        <div className="flex flex-col items-center justify-center">
          <SectionBadge text="Why Choose Us" />
          <h2 className="text-black font-semibold text-3xl">Why Emplora?</h2>
          
          <div className="flex flex-col md:flex-row gap-4 pt-12">
            <WhyCard image={image2} text="Real experience empower people with knowledge and create a more transparent job ecosystem."/>
            <WhyCard image={image3} text="Transparency builds better workplaces by encouraging trust accountability and open communication."/>
            <WhyCard image={image4} text="Your voice can help someone choose better and help them take a step towards a more fulfilling career."/>
           
            
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default About;
