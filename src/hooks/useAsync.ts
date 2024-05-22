import { useState } from 'react';

const useAsync = (callback: () => void) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [done, setDone] = useState(false);
  const doJob = async () => {
    try {
      setPending(true);
      callback();
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setDone(true);
    }
  };
  doJob();
  return { doJob, done, isPending, error };
};
export default useAsync;
