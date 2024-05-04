import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

export default function Registration() {
  return (
    <div>
      <Input placeholder="Enter your name" />
      <Button styleClass="green-filled">Register</Button>
    </div>
  );
}
