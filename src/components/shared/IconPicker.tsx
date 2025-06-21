'use client';

import React, { useMemo } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { icons } from 'lucide-react';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

interface IconPickerProps {
  buttonClassName?: string;
  defaultValue: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  buttonClassName,
  defaultValue,
  isOpen,
  onChange,
  setIsOpen,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const iconNames = React.useMemo(() => Object.keys(icons), []);

  const filteredIcons = useMemo(
    () => iconNames.filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase())),
    [iconNames, searchTerm],
  );

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm('');
  };

  const DefaultIcon = icons[defaultValue as keyof typeof icons];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button type='button' variant='outline' className={buttonClassName}>
          {defaultValue ? (
            <>
              <DefaultIcon className='mr-2 !size-4' /> {defaultValue}
            </>
          ) : (
            <>
              <Search className='mr-2 !size-4' /> Pilih icon
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px]'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Cari icon...'
            value={searchTerm}
            onValueChange={(e) => setSearchTerm(e)}
          />
          <CommandList className='h-[250px]'>
            {filteredIcons.length === 0 ? (
              <CommandEmpty>Icon tidak ditemukan.</CommandEmpty>
            ) : (
              <CommandGroup>
                <div className='grid grid-cols-6 gap-1 p-2'>
                  {filteredIcons.map((iconName) => {
                    const Icon = icons[iconName as keyof typeof icons];

                    return (
                      <CommandItem
                        key={iconName}
                        onSelect={() => handleSelect(iconName)}
                        className='flex h-auto flex-col items-center justify-center p-2'
                        title={iconName}
                      >
                        <Icon className='h-5 w-5' />
                      </CommandItem>
                    );
                  })}
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
