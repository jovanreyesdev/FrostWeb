// @flow
import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

type Props = {
  start: Object;
  end: Object;
  onStartChange: (date: Object) => void;
  onEndChange: (date: Object) => void;
};

export default ({
  start, end,
  onStartChange, onEndChange,
}: Props) => (
  <>
    <DatePicker
      selected={start}
      onChange={onStartChange}
      selectsStart
      startDate={start}
      endDate={end}
      className="date-range-picker"
      maxDate={new Date()}
    />
    <DatePicker
      selected={end}
      onChange={onEndChange}
      selectsEnd
      startDate={start}
      endDate={end}
      minDate={start}
      maxDate={new Date()}
      className="date-range-picker"
    />
  </>
);
