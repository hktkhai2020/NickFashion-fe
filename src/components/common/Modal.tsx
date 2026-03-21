import React from 'react';
import { Modal as AntModal } from 'antd';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  closable?: boolean;
  maskClosable?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width = 520,
  closable = true,
  maskClosable = true,
  className = '',
}) => {
  return (
    <AntModal
      open={open}
      onCancel={onClose}
      title={title}
      footer={footer}
      width={width}
      closable={closable}
      maskClosable={maskClosable}
      className={className}
      centered
    >
      {children}
    </AntModal>
  );
};

export default Modal;
