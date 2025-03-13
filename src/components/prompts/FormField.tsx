
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface FormFieldProps {
  id: string;
  label: string;
  tooltip?: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}

const FormField = ({ id, label, tooltip, children, rightElement }: FormFieldProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <label htmlFor={id} className="text-lg font-medium block mb-2">
          {label}
        </label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {rightElement}
      </div>
      {children}
    </div>
  );
};

export default FormField;
