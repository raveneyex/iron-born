import { WeightUnits } from '@/types/exercise';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface WeightUnitsSelectProps {
  className?: string;
  weightUnits: WeightUnits;
  onChange: (weightUnits: WeightUnits) => void;
}

export function WeightUnitsSelect(props: WeightUnitsSelectProps) {
  const { weightUnits, onChange, className } = props;

  return (
    <Select onValueChange={onChange} value={weightUnits}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Weight Units" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kg">kg</SelectItem>
        <SelectItem value="lbs">lbs</SelectItem>
      </SelectContent>
    </Select>
  );
}
