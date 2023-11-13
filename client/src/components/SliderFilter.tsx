import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export type SliderFilterProps = {
  range: number[];
  label: string;
  step?: number;
  rangeQuery?: number[];
  setRangeQuery: (query: [number, number]) => void;
};

function SliderFilter({
  range,
  label,
  step = 1,
  rangeQuery = [0, 0],
  setRangeQuery,
}: SliderFilterProps) {
  return (
    <div className="flex flex-col grow">
      <div>{label}</div>
      <Slider
        range
        step={step}
        min={range[0]}
        max={range[1]}
        value={rangeQuery}
        onChange={(val) => setRangeQuery(val as [number, number])}
      />
      <div className="flex flex-row justify-between">
        <div>{rangeQuery[0]}</div>
        <div>{rangeQuery[1]}</div>
      </div>
    </div>
  );
}

export default SliderFilter;
