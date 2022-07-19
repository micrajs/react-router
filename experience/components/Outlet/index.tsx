import React, {useMemo} from 'react';
import {RouteProvider, useRouteContext} from '../RouteProvider';

export interface OutletProps {
  name?: string;
}

export function Outlet({name}: OutletProps) {
  const context = useRouteContext();
  const routes = useMemo(
    () =>
      context.nested.map((route) =>
        !name || route.name === name ? (
          <RouteProvider key={route.id} route={route} />
        ) : null,
      ),
    [context, name],
  );

  return context ? <>{routes}</> : null;
}
