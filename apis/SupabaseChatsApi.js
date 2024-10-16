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

export const createChatPOST = async (
  Constants,
  { chatName, user_ids },
  handlers = {}
) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/chat`;
  const options = {
    body: JSON.stringify({ user_ids: user_ids, chat_name: chatName }),
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

export const useCreateChatPOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => createChatPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('chat', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('chat');
        queryClient.invalidateQueries('chats');
      },
    }
  );
};

export const FetchCreateChatPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  chatName,
  user_ids,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateChatPOST(
    { chatName, user_ids },
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
  return children({ loading, data, error, refetchCreateChat: refetch });
};

export const deleteChatByIdDELETE = async (
  Constants,
  { id },
  handlers = {}
) => {
  const paramsDict = {};
  if (id !== undefined) {
    paramsDict['id'] = `eq.${renderParam(id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/chat${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
    method: 'DELETE',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useDeleteChatByIdDELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      deleteChatByIdDELETE(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('chat', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('chat');
        queryClient.invalidateQueries('chats');
      },
    }
  );
};

export const getChatsGET = async (Constants, { select }, handlers = {}) => {
  const paramsDict = {};
  if (select !== undefined) {
    paramsDict['select'] = renderParam(select);
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/chat${renderQueryString(
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

export const useGetChatsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['chats', args],
    () => getChatsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetChatsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  select,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetChatsGET(
    { select },
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
  return children({ loading, data, error, refetchGetChats: refetch });
};

export const getChatsColumn1GET = async (
  Constants,
  { user_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (user_id !== undefined) {
    paramsDict['user_id1'] = `eq.${renderParam(user_id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/chat${renderQueryString(
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

export const useGetChatsColumn1GET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['chats', args],
    () => getChatsColumn1GET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetChatsColumn1GET = ({
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
    refetch,
  } = useGetChatsColumn1GET(
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
  return children({ loading, data, error, refetchGetChatsColumn1: refetch });
};

export const getChatsColumn2GET = async (
  Constants,
  { user_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (user_id !== undefined) {
    paramsDict['user_id2'] = `eq.${renderParam(user_id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/chat${renderQueryString(
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

export const useGetChatsColumn2GET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['chats', args],
    () => getChatsColumn2GET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetChatsColumn2GET = ({
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
    refetch,
  } = useGetChatsColumn2GET(
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
  return children({ loading, data, error, refetchGetChatsColumn2: refetch });
};

export const getSingleChatByIdGET = async (
  Constants,
  { id },
  handlers = {}
) => {
  const paramsDict = {};
  if (id !== undefined) {
    paramsDict['id'] = `eq.${renderParam(id)}`;
  }
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/chat${renderQueryString(
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

export const useGetSingleChatByIdGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['chat', args],
    () => getSingleChatByIdGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['chats']),
    }
  );
};

export const FetchGetSingleChatByIdGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetSingleChatByIdGET(
    { id },
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
  return children({ loading, data, error, refetchGetSingleChatById: refetch });
};
