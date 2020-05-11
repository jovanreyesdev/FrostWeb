// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';
import { ISource } from '../../store/sources/types';

type SelectSourceButtonProps = {
  onSelect: (source: ISource) => void;
  source: ISource;
}

export const SelectSourceButton = ({ onSelect, source }: SelectSourceButtonProps) => {
  const onClick = () => {
    if (onSelect) {
      onSelect(source);
    }
  };

  return (
    <Button
      onClick={onClick}
      size="tiny"
      fluid
    >
      View observations
    </Button>
  );
};
