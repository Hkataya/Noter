import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button.attrs({
  className:
    'inline-flex justify-center w-full rounded-md  text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150'
})``;

const DropdownWrapper = styled.div.attrs({
  className:
    'origin-top-right absolute left-0 mt-2 min-w-64 rounded-md shadow-lg z-10'
})``;

const DropdownItem = styled.button.attrs({
  className:
    'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
})``;

type Item = {
  label: string;
  action: () => void;
};

type Props = {
  items: Array<Item>;
};

function MenuButton(props: Props) {
  const [dropdown, setDropdown] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (divRef.current && !divRef.current.contains(e.target))
      setDropdown(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const { items } = props;
  return (
    <div ref={divRef} className="relative inline-block">
      <div>
        <ButtonWrapper
          role="button"
          type="button"
          onClick={e => {
            e.stopPropagation();
            if (dropdown) setDropdown(false);
            else setDropdown(true);
          }}
        >
          <i className="fas fa-ellipsis-v" />
        </ButtonWrapper>
      </div>

      {dropdown && (
        <DropdownWrapper>
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              {items.map((item: Item) => (
                <DropdownItem
                  key={item.label}
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setDropdown(false);
                    item.action();
                  }}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </div>
          </div>
        </DropdownWrapper>
      )}
    </div>
  );
}

export default MenuButton;
