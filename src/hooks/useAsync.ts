import { DependencyList, useCallback, useEffect, useState } from 'react';

const useAsync = <T, P, D extends DependencyList>(
  callback: (params: P) => Promise<T>,
  params: P,
  deps: D,
): [T | undefined, boolean, Error | undefined] => {
  const [isPending, setPending] = useState(false);
  const [err, setError] = useState<Error | undefined>(undefined);
  const [result, setResult] = useState<T | undefined>();
  const doJob = useCallback(async () => {
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
  }, deps);
  useEffect(() => {
    doJob();
  }, deps);
  return [result, isPending, err];
};
export default useAsync;
