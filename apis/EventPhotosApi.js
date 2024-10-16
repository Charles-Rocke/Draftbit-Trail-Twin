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

export const createEventPhotoPOST = async (
  Constants,
  { event_id, event_photo },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict[''] = '';
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:wCZYlsX6/event_photos${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({ event_id: event_id, event_photo: event_photo }),
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

export const useCreateEventPhotoPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      createEventPhotoPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('event_photos', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('event_photo');
        queryClient.invalidateQueries('event_photos');
      },
    }
  );
};

export const FetchCreateEventPhotoPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  event_id,
  event_photo,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateEventPhotoPOST(
    { event_id, event_photo },
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
  return children({ loading, data, error, refetchCreateEventPhoto: refetch });
};

export const getEventPhotoGET = async (
  Constants,
  { event_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (event_id !== undefined) {
    paramsDict['event_id'] = `eq.${renderParam(event_id)}`;
  }
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:wCZYlsX6/event_photos${renderQueryString(
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

export const useGetEventPhotoGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['event_photo', args],
    () => getEventPhotoGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['event_photos']),
    }
  );
};

export const FetchGetEventPhotoGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  event_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetEventPhotoGET(
    { event_id },
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
  return children({ loading, data, error, refetchGetEventPhoto: refetch });
};
