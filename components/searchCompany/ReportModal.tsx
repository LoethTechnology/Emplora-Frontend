import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

interface ReportType {
  name: string;
  subCategories: string[];
}

const ReportModal = ({ onOpenChange, open, onSubmit }: Props) => {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);

  const ReportTypes: ReportType[] = [
    {
      name: 'Violence and Criminal Information',
      subCategories: [
        'Promotes or encourages violence, including threats, harm, or dangerous behavior toward individuals or groups.',
        'Contains threatening language or supports actions that could lead to physical harm or unsafe situations.',
        'Shares, encourages, or provides information related to criminal activities or illegal behavior.',
      ],
    },
    {
      name: 'Hate/Harrassment',
      subCategories: [
        'Contains hate speech, offensive language, or discriminatory remarks targeting individuals or groups based on identity.',
        'Includes harassment, bullying, or repeated negative comments intended to intimidate or demean others.',
        'Promotes hostility or disrespect toward a person or group in a way that creates an unsafe or unwelcoming environment.',
      ],
    },
    {
      name: 'Misinformation/Sharing personal Information',
      subCategories: [
        'Contains false or misleading information that could confuse or harm others.',
        'Shares personal or sensitive information (e.g. phone numbers, emails, addresses) without consent.',
        'Spreads unverified or inaccurate claims presented as facts.',
        'Exposes private details about an individual that violate their privacy or safety.',
        'Misrepresents a person, company, or situation in a deceptive or harmful way.',
      ],
    },
    {
      name: 'Scam/Spam/Fraud',
      subCategories: [
        'Promotes scams, fake offers, or deceptive schemes intended to mislead users.',
        'Contains spam, including repetitive, irrelevant, or unsolicited promotional content.',
        'Requests money, personal information, or sensitive details under false pretenses.',
        'Shares suspicious links or content that may lead to fraud or security risks.',
        'Impersonates a person, company, or organization to deceive or exploit others.',
      ],
    },
    {
      name: 'Deceptive Comment',
      subCategories: [
        'Contains false or misleading information presented as fact.',
        'Misrepresents a company, situation, or experience in a way that could mislead others.',
        'Appears intentionally dishonest or created to manipulate opinions or perceptions.',
      ],
    },
    {
      name: 'Bullying/Exploitation',
      subCategories: [
        'Promotes or encourages bullying, intimidation, or exploitation of others.',
        'Contains threats, harassment, or harmful behavior targeted at individuals or groups.',
        'Shares, supports, or normalizes abusive or exploitative actions toward others.',
      ],
    },
    {
      name: 'Other',
      subCategories: [
        'Content does not clearly fit into any existing moderation category.',
        'Contains unclear, ambiguous, or context-dependent material that requires manual review.',
        'Includes mixed content that spans multiple categories without a dominant type.',
        'Relates to new or emerging behaviors not yet defined in the current policy set.',
        'Requires additional context or user intent to accurately determine the appropriate classification',
      ],
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={val => {
        // reset steps when dialog is closed
        if (!val) {
          setStep(0);
          setSelectedType(null);
        }
        onOpenChange(val);
      }}
    >
      <DialogContent className="w-full py-2 px-0 rounded-t-lg rounded-lg max-h-[80vh] overflow-y-auto md:min-w-[60%] md:p-4">
        {step === 0 && (
          <div className="space-y-4">
            <div className="px-2">
              <h3 className="text-md md:text-lg font-medium text-text-primary">
                Report this comment
              </h3>
              <p className="text-sm md:text-md text-text-secondary">
                We aim to keep this space safe and respectful. Report any comment that feels
                inappropriate.
              </p>
            </div>
            <div className="space-y-2">
              {ReportTypes.map(type => (
                <button
                  key={type.name}
                  onClick={() => {
                    setSelectedType(type);
                    setStep(1);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      viewBox="0 0 5 5"
                      fill="none"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#2F2F2F" />
                    </svg>
                    <p className="text-sm md:text-base text-left text-text-primary">{type.name}</p>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex gap-2 items-center border-b pb-1">
              <Button variant={'ghost'} onClick={() => setStep(0)}>
                <ChevronLeft size={20} />
              </Button>
              <h3 className="md:text-lg font-medium text-text-primary">{selectedType?.name}</h3>
            </div>
            <div className="flex flex-col gap-30">
              <div className="space-y-2 ">
                {selectedType?.subCategories.map((subCategory, index) => (
                  <div key={index} className="flex items-center gap-4 md:px-3 px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 5 5"
                      fill="none"
                      className="md:h-1.5 md:w-1.5"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#2F2F2F" />
                    </svg>
                    <p className="text-sm md:text-base text-left text-text-secondary">
                      {subCategory}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => {
                  onSubmit();
                  onOpenChange(false);
                  setStep(0);
                  setSelectedType(null);
                }}
                variant={'destructive'}
                className="w-full py-6"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
