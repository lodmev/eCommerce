import { FormEvent } from 'react';

type Props = {
  children: React.ReactNode;
  onSumbit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function FormRegistration(props: Props) {
  const { onSumbit, children } = props;
  return <form onSubmit={onSumbit}>{children}</form>;
}
