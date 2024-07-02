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

export const createEventPOST = async (
  Constants,
  {
    addressInputV1,
    dateInputV1,
    eventNameInputV1,
    eventTypeInputV1,
    hostNameInputV1,
    invitesInputV1,
    partySizeInputV1,
    startTimeInputV1,
    tagsInputV1,
  },
  handlers = {}
) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/events`;
  const options = {
    body: JSON.stringify({
      host_name: hostNameInputV1,
      event_name: eventNameInputV1,
      party_size: partySizeInputV1,
      address: addressInputV1,
      start_time: startTimeInputV1,
      date: dateInputV1,
      invites: invitesInputV1,
      tags: tagsInputV1,
      event_type: eventTypeInputV1,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      apiKey: Constants['apiKey'],
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useCreateEventPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => createEventPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('events', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('event');
        queryClient.invalidateQueries('events');
      },
    }
  );
};

export const FetchCreateEventPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  addressInputV1,
  dateInputV1,
  eventNameInputV1,
  eventTypeInputV1,
  hostNameInputV1,
  invitesInputV1,
  partySizeInputV1,
  startTimeInputV1,
  tagsInputV1,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateEventPOST(
    {
      addressInputV1,
      dateInputV1,
      eventNameInputV1,
      eventTypeInputV1,
      hostNameInputV1,
      invitesInputV1,
      partySizeInputV1,
      startTimeInputV1,
      tagsInputV1,
    },
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
  return children({ loading, data, error, refetchCreateEvent: refetch });
};

export const getEventsGET = async (Constants, { select }, handlers = {}) => {
  const paramsDict = {};
  paramsDict['select'] = select !== undefined ? renderParam(select) : '';
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/events${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetEventsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['events', args],
    () => getEventsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetEventsGET = ({
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
  } = useGetEventsGET(
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
  return children({ loading, data, error, refetchGetEvents: refetch });
};

export const getSingleEventGET = async (
  Constants,
  { id, select },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['select'] = select !== undefined ? renderParam(select) : '';
  paramsDict['id'] = id !== undefined ? `eq.${renderParam(id)}` : '';
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/events${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['apiKey'],
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetSingleEventGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['event', args],
    () => getSingleEventGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['events']),
    }
  );
};

export const FetchGetSingleEventGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
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
  } = useGetSingleEventGET(
    { id, select },
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
  return children({ loading, data, error, refetchGetSingleEvent: refetch });
};
