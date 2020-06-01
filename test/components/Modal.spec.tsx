import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Modal from '../../app/components/Modal/Modal';

test('loads modal', async () => {
  const { asFragment } = render(
    <Modal handleClose={() => {}} title="test">
      Test Modal
    </Modal>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('clicks close modal', async () => {
  const closeModal = jest.fn();

  render(
    <Modal handleClose={closeModal} title="test">
      Test Modal
    </Modal>
  );

  fireEvent.click(screen.getByRole('button'));
  expect(closeModal).toHaveBeenCalled();
});
