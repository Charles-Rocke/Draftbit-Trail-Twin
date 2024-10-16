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

export const createUserDataPOST = async (
  Constants,
  { user_id },
  handlers = {}
) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/user_data`;
  const options = {
    body: JSON.stringify({ user_id: user_id }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useCreateUserDataPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      createUserDataPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user_data', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user_datum');
        queryClient.invalidateQueries('user_data');
      },
    }
  );
};

export const FetchCreateUserDataPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateUserDataPOST(
    { user_id },
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
  return children({ loading, data, error, refetchCreateUserData: refetch });
};

export const getUserByUniqueUserIdGET = async (
  Constants,
  { select, user_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (select !== undefined) {
    paramsDict['select'] = renderParam(select);
  }
  if (user_id !== undefined) {
    paramsDict['user_id'] = `eq.${renderParam(user_id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/user_data${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetUserByUniqueUserIdGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['user_datum', args],
    () => getUserByUniqueUserIdGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['user_data']),
    }
  );
};

export const FetchGetUserByUniqueUserIdGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  select,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetUserByUniqueUserIdGET(
    { select, user_id },
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
  return children({
    loading,
    data,
    error,
    refetchGetUserByUniqueUserId: refetch,
  });
};

export const getUserDetailGET = async (
  Constants,
  { detail, user_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (user_id !== undefined) {
    paramsDict['user_id'] = `eq.${renderParam(user_id)}`;
  }
  if (detail !== undefined) {
    paramsDict['select'] = renderParam(detail);
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/user_data${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetUserDetailGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['user_datum', args],
    () => getUserDetailGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['user_data']),
    }
  );
};

export const FetchGetUserDetailGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  detail,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetUserDetailGET(
    { detail, user_id },
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
  return children({ loading, data, error, refetchGetUserDetail: refetch });
};

export const getUsersGET = async (Constants, _args, handlers = {}) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/user_data`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetUsersGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['user_data', args],
    () => getUsersGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetUsersGET = ({
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
    refetch,
  } = useGetUsersGET(
    {},
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
  return children({ loading, data, error, refetchGetUsers: refetch });
};

export const updateChatIdsPATCH = async (
  Constants,
  { chat_ids, user_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (user_id !== undefined) {
    paramsDict['user_id'] = `eq.${renderParam(user_id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/user_data${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({ chat_ids: chat_ids }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateChatIdsPATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateChatIdsPATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user_data', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user_datum');
        queryClient.invalidateQueries('user_data');
      },
    }
  );
};

export const updateUserDataPATCH = async (
  Constants,
  {
    age,
    bike,
    bio,
    location,
    looking_for,
    name,
    profile_photo,
    riding_style,
    skillLevel,
    user_id,
  },
  handlers = {}
) => {
  const paramsDict = {};
  if (user_id !== undefined) {
    paramsDict['user_id'] = `eq.${renderParam(user_id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/user_data${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({
      name: name,
      age: age,
      location: location,
      bio: bio,
      skill_level: skillLevel,
      bike: bike,
      looking_for: looking_for,
      riding_style: riding_style,
      profile_photo: profile_photo,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateUserDataPATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateUserDataPATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user_data', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user_datum');
        queryClient.invalidateQueries('user_data');
      },
    }
  );
};
