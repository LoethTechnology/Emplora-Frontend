const sectionBadge = ({ text }: {text:string }) => {
    return (
        <h3 className="bg-[#EBEDF7] py-0.5 px-2 border border-[#C0C8E5] rounded-full text-[#334EAC] w-fit mb-4">
            {text}
        </h3>
    )
};

export default sectionBadge