import { Button } from "../../../../shared/components/ui/button";

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
}

const NavigationButtons = ({ onBack, onNext }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        onClick={onBack}
        className="px-8 py-2 rounded-lg font-medium bg-transparent text-color-light border border-color-light"
      >
        Back
      </Button>
      <Button
        onClick={onNext}
        className="bg-color-createAccountButton-light text-color-createAccountButton-light px-8 py-2 rounded-lg font-medium"
      >
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;
