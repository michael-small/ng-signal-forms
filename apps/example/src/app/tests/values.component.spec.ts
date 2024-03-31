import { render, screen, fireEvent } from '@testing-library/angular';
import ValuesComponent from './values.component';

it('renders default values of form controls', async () => {
  await render(ValuesComponent);

  expect(screen.getByText('form.value().name: Alice')).toBeDefined();
  expect(screen.getByText('form.value().age:')).toBeDefined();
});

it('renders values of form controls after prefilling each control', async () => {
  await render(ValuesComponent);
  fireEvent.click(screen.getByRole('button', { name: /Prefill form/ }));

  expect(screen.getByText('form.value().name: Bob')).toBeDefined();
  expect(screen.getByText('form.value().age: 42')).toBeDefined();
});
