import { FormEvent } from 'react';
import Button from '../../components/Button/Button';
import FormRegistration from '../../components/FormRegistration/FormRegistration';
import Input from '../../components/Input/Input';

export default function Registration() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <FormRegistration onSumbit={handleSubmit}>
        <Input type="email" placeholder="Email" />
        <Button type="submit" styleClass="green-filled">
          Register
        </Button>
      </FormRegistration>
    </div>
  );
}
