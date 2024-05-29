import { DependencyList, useEffect, useState } from 'react';

const useAsync = <T, P, D extends DependencyList>(
  callback: (params?: P) => Promise<T>,
  params: P | undefined,
  deps: D,
): [T | undefined, boolean, Error | undefined] => {
  const [isPending, setPending] = useState(false);
  const [err, setError] = useState<Error | undefined>(undefined);
  const [result, setResult] = useState<T | undefined>();
  const doJob = async () => {
    try {
      setError(undefined);
      setPending(true);
      const res = await callback(params);
      setResult(res);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    doJob();
  }, deps);
  return [result, isPending, err];
};
export default useAsync;
