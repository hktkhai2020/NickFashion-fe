import React from 'react';
import { EditOutlined, CameraOutlined } from '@ant-design/icons';
import { Card } from '@/components/common';
import { Button } from '@/components/common';
import type { User } from '@/types/user';

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
  onChangeAvatar?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onEdit,
  onChangeAvatar,
}) => {
  return (
    <Card>
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-semibold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <button
            onClick={onChangeAvatar}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <CameraOutlined />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <Button
              variant="outline"
              icon={<EditOutlined />}
              onClick={onEdit}
            >
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{user.gender || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('vi-VN')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
