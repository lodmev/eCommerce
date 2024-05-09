import FormLogin from '../../components/FormLogin/FormLogin';

export default function Login() {
  const handleLogin = () => {};

  return (
    <div>
      <FormLogin onSubmit={handleLogin} />
    </div>
  );
}
