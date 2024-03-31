import { render, screen, fireEvent } from '@testing-library/angular';
import ValuesComponent from './values.component';
import userEvent from '@testing-library/user-event';

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

it('updates form values when form is filled out manually', async () => {
  await render(ValuesComponent);

  await userEvent.type(screen.getByLabelText('Name'), ' is cool');
  expect(screen.getByText('form.value().name: Alice is cool')).toBeDefined();

  await userEvent.type(screen.getByLabelText('Age'), '2');
  expect(screen.getByText('form.value().age: 2')).toBeDefined();
});
