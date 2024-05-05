import FormRegistration from '../../components/FormRegistration/FormRegistration';

export default function Registration() {
  const handleSubmit = () => {};

  return (
    <div>
      <FormRegistration onSumbit={handleSubmit} />
    </div>
  );
}
