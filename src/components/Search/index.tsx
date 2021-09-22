import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Input } from '@kaco/uikit';
import SearchSvg from '../svg/search.svg';

const Wrapper = styled.div<{ focused: boolean }>`
  width: 100%;
  height: 52px;
  background: #122124;
  border: 1px solid #1f373b;
  border-radius: 16px;
  padding: 0px 18px;
  display: flex;
  align-items: center;
  border: ${(props) => (props.focused ? '2px solid #1bd3d5' : '')};
  > input {
    flex: 1;
    background: #122124;
    border-width: 0px;
  }
`;

const Search: FC<{ className?: string; value: string; onChange: (now: string) => void; placeholder: string }> = ({
  className,
  value,
  onChange,
  placeholder,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <Wrapper tabIndex={1} className={className} focused={focused}>
      <img src={SearchSvg} alt="" />
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default Search;
