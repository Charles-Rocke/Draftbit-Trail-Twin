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

export const createUserPhotoRowPOST = async (
  Constants,
  { user_id },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict[''] = '';
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:ZNE4kd-w/user_photos${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({ user_id: user_id }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: 'https://x8ki-letl-twmt.n7.xano.io/api:ZNE4kd-w',
      'Content-Type': 'multipart/form-data',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useCreateUserPhotoRowPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      createUserPhotoRowPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('user_photos', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('user_photo');
        queryClient.invalidateQueries('user_photos');
      },
    }
  );
};

export const FetchCreateUserPhotoRowPOST = ({
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
  } = useCreateUserPhotoRowPOST(
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
  return children({ loading, data, error, refetchCreateUserPhotoRow: refetch });
};

export const getUserPhotosGET = async (
  Constants,
  { user_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (user_id !== undefined) {
    paramsDict['user_id'] = renderParam(user_id);
  }
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:ZNE4kd-w/user_photos${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: 'https://x8ki-letl-twmt.n7.xano.io/api:ZNE4kd-w',
      'Content-Type': 'multipart/form-data',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetUserPhotosGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['user_photo', args],
    () => getUserPhotosGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['user_photos']),
    }
  );
};

export const FetchGetUserPhotosGET = ({
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
  } = useGetUserPhotosGET(
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
  return children({ loading, data, error, refetchGetUserPhotos: refetch });
};
