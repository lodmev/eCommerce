import { ReactNode } from 'react';
import { Outlet, UIMatch, useMatches } from 'react-router-dom';
import { v4 } from 'uuid';
import debug from '../../utils/debug';

type CrumbType = (data: UIMatch['data']) => ReactNode;

export default function Breadcrumbs(): ReactNode {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean((match.handle as { crumb?: CrumbType })?.crumb))
    .map((match) => (match.handle as { crumb: CrumbType })?.crumb(match.data));
  debug.log(crumbs);
  return (
    <>
      <ul>
        {crumbs.map((value) => (
          <li key={v4()}>{value}</li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
