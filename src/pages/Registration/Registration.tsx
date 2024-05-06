import FormRegistration from '../../components/FormRegistration/FormRegistration';

export default function Registration() {
  const handleRegister = () => {};

  return (
    <div>
      <FormRegistration onSumbit={handleRegister} />
    </div>
  );
}
