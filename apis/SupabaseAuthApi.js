import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import {
  encodeQueryParam,
  renderParam,
  renderQueryString,
} from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

const cleanHeaders = headers =>
  Object.fromEntries(Object.entries(headers).filter(kv => kv[1] != null));

export const loginPOST = async (
  Constants,
  { loginEmail, loginPassword },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['grant_type'] = 'password';
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/auth/v1/token${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['APP_KEY_HEADER'],
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useLoginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['login', args], () => loginPOST(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['logins']),
  });
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  loginEmail,
  loginPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useLoginPOST(
    { loginEmail, loginPassword },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchLogin: refetch });
};

export const logoutPOST = async (Constants, _args, handlers = {}) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/auth/v1/logout`;
  const options = {
    body: JSON.stringify({ key: 'value' }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['APP_KEY_HEADER'],
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useLogoutPOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => logoutPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export const FetchLogoutPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useLogoutPOST({}, { refetchInterval, handlers: { onData, ...handlers } });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchLogout: refetch });
};

export const signupPOST = async (
  Constants,
  { signupEmail, signupPassword },
  handlers = {}
) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/auth/v1/signup`;
  const options = {
    body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['APP_KEY_HEADER'],
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useSignupPOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => signupPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export const FetchSignupPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  signupEmail,
  signupPassword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useSignupPOST(
    { signupEmail, signupPassword },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchSignup: refetch });
};
