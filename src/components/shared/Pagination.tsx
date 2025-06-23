import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className='mt-4 flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:justify-end'>
      <p className='text-sm font-semibold'>
        Page {page} dari {totalPages}
      </p>
      <div className='space-x-2'>
        <Button
          className='h-8 w-8'
          variant='outline'
          disabled={page === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft />
        </Button>
        <Button
          className='h-8 w-8'
          variant='outline'
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          className='h-8 w-8'
          variant='outline'
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          className='h-8 w-8'
          variant='outline'
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};
