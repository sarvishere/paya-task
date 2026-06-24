import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Search } = Input;

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    console.log('جستجو:', value);
  };

  return (
    <Search
      placeholder="جستجو..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
      className="w-48 md:w-64"
      size="middle"
      allowClear
      prefix={<SearchOutlined className="text-gray-400" />}
    />
  );
};