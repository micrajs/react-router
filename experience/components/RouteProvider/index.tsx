/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {createContext, useContext, useEffect, useState} from 'react';
import type {SPARoute, RouteState} from '@micra/spa-router';

function Noop() {
  return null;
}

function resolveView(state: RouteState): SPARoute['view'] {
  if (['loading', 'idle'].includes(state.status) && state.route['loading']) {
    return state.route['loading'];
  }

  if (state.status === 'error' && state.route['errorBoundary']) {
    return state.route['errorBoundary'];
  }

  return state.route['view'];
}

function getView(state: RouteState, Fallback: React.ComponentType = Noop) {
  const view = resolveView(state);
  if (view) {
    return typeof view === 'string' ? use<any>(view) : view;
  }

  return Fallback;
}

export const routeContext = createContext<RouteState>({} as any);
export const useRouteContext = () => useContext(routeContext);

export interface RouteProviderProps {
  route: SPARoute;
}

export function RouteProvider({route}: RouteProviderProps) {
  const [context, setContext] = useState(() =>
    use('spa-route-context').getStateFor(route),
  );

  useEffect(() => {
    const manager = use('spa-route-context');
    setContext(manager.getStateFor(route));
    return manager.on(`change:${route.id}`, (newContext) =>
      setContext({...newContext}),
    );
  }, [route]);

  const Component = getView(context);

  return (
    <routeContext.Provider value={context}>
      <Component {...(context?.data ?? {})} />
    </routeContext.Provider>
  );
}
