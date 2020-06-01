import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MenuButton from '../../app/components/Button/MenuButton';

test('loads menu button', async () => {
  const { asFragment } = render(
    <MenuButton
      items={[
        {
          label: 'Remove',
          action: () => {}
        }
      ]}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test('clicks all provided items', async () => {
  const mockedFn1 = jest.fn();
  const mockedFn2 = jest.fn();

  render(
    <MenuButton
      items={[
        {
          label: 'Remove',
          action: mockedFn1
        },
        {
          label: 'Edit',
          action: mockedFn2
        }
      ]}
    />
  );

  fireEvent.click(screen.getByRole('button'));
  fireEvent.click(screen.getByText('Remove'));
  expect(mockedFn1).toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button'));
  fireEvent.click(screen.getByText('Edit'));
  expect(mockedFn2).toHaveBeenCalled();
});
