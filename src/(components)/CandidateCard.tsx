import Image from 'next/image';

interface CandidateCardProps {
  name: string;
  title: string;
  image: string;
  className?: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, title, image, className }) => {
  return (
    <div className={`bg-teal-800 rounded-2xl p-6 text-white flex flex-col ${className}`}>
      <div className="flex flex-col items-center text-center mb-6">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-teal-200 text-sm">{title}</p>
      </div>
      <div className="flex-1 flex items-end justify-center">
        <div className="w-full max-w-48 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={200}
            height={210}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;