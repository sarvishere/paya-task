import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export const loadingSuffix = (loading: boolean): ReactNode => {
  return loading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
  ) : null;
};

export const LoadingSuffix = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
  ) : null;
};

export const combineSuffix = (
  loading: boolean,
  customSuffix?: ReactNode
): ReactNode => {
  const loadingIcon = loading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
  ) : null;

  return (
    <div className="flex items-center gap-1">
      {loadingIcon}
      {customSuffix}
    </div>
  );
};