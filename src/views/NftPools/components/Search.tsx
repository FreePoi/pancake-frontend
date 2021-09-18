import React, { FC } from 'react';
import styled from 'styled-components';
import { Input } from '@kaco/uikit';

const Search: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Input
        style={{
          boxShadow: 'none',
          height: '48px',
          background: '#1F252A',
          border: '1px solid #12171A',
          borderRadius: '12px',
          fontSize: '12px',
        }}
        id="token-search-input"
        scale="lg"
        placeholder="Search NFT"
        autoComplete="off"
      />
    </div>
  );
};

export default styled(Search)``;
