import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Card } from '@/components/common';
import type { Address } from '@/types/user';

interface AddressFormProps {
  address?: Address;
  onSubmit?: (values: AddressFormValues) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export interface AddressFormValues {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  ward?: string;
  postalCode?: string;
  isDefault?: boolean;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm<AddressFormValues>();

  const handleFinish = (values: AddressFormValues) => {
    onSubmit?.(values);
  };

  return (
    <Card title={address ? 'Edit Address' : 'Add New Address'}>
      <Form
        form={form}
        layout="vertical"
        initialValues={address ? {
          fullName: address.fullName,
          phone: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          district: address.district,
          ward: address.ward,
          postalCode: address.postalCode,
          isDefault: address.isDefault,
        } : undefined}
        onFinish={handleFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter full name' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter phone number' },
              { pattern: /^[0-9]{10,11}$/, message: 'Invalid phone number' },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </div>

        <Form.Item
          name="addressLine1"
          label="Address Line 1"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input placeholder="Street address, P.O. box" />
        </Form.Item>

        <Form.Item name="addressLine2" label="Address Line 2">
          <Input placeholder="Apartment, suite, unit, etc. (optional)" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            name="city"
            label="City/Province"
            rules={[{ required: true, message: 'Please select city' }]}
          >
            <Select placeholder="Select city">
              <Select.Option value="hcm">Ho Chi Minh City</Select.Option>
              <Select.Option value="hanoi">Hanoi</Select.Option>
              <Select.Option value="danang">Da Nang</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label="District"
            rules={[{ required: true, message: 'Please select district' }]}
          >
            <Select placeholder="Select district">
              <Select.Option value="district1">District 1</Select.Option>
              <Select.Option value="district2">District 2</Select.Option>
              <Select.Option value="district3">District 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="ward" label="Ward">
            <Select placeholder="Select ward" allowClear>
              <Select.Option value="ward1">Ward 1</Select.Option>
              <Select.Option value="ward2">Ward 2</Select.Option>
              <Select.Option value="ward3">Ward 3</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="postalCode" label="Postal Code">
          <Input placeholder="Enter postal code" />
        </Form.Item>

        <Form.Item name="isDefault" valuePropName="checked">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isDefault" className="w-4 h-4" />
            <label htmlFor="isDefault" className="text-gray-700">
              Set as default address
            </label>
          </div>
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">
          {onCancel && (
            <Button onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="primary" htmlType="submit" loading={loading}>
            {address ? 'Update Address' : 'Add Address'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AddressForm;
