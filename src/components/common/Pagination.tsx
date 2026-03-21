import React from 'react';
import { Pagination as AntPagination } from 'antd';

interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize = 12,
  onChange,
  showSizeChanger = true,
  showQuickJumper = false,
  showTotal,
  className = '',
}) => {
  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <AntPagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={showTotal || ((total) => `Total ${total} items`)}
        pageSizeOptions={['12', '24', '48', '96']}
      />
    </div>
  );
};

export default Pagination;
