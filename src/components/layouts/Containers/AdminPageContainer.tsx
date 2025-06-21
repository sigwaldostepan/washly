import React from 'react';

interface AdminPageContainerProps extends React.PropsWithChildren {
  title: string;
  description?: string;
}

export const AdminPageContainer: React.FC<AdminPageContainerProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <header className='padded mt-2 !py-0 md:mt-4'>
        <h1 className='mb-2 text-2xl font-semibold md:text-3xl'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </header>
      {children}
    </>
  );
};
