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

export const createAttendeePOST = async (
  Constants,
  {
    attendeeAgeInputV1,
    attendeeSafetySelfie,
    eventIdInputV1,
    joinAttendeeNameInputV1,
  },
  handlers = {}
) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/attendees`;
  const options = {
    body: JSON.stringify({
      attendee_name: joinAttendeeNameInputV1,
      attendee_age: attendeeAgeInputV1,
      attendee_safety_selfie: attendeeSafetySelfie,
      event_id: eventIdInputV1,
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

export const useCreateAttendeePOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      createAttendeePOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('attendees', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('attendee');
        queryClient.invalidateQueries('attendees');
      },
    }
  );
};

export const FetchCreateAttendeePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  attendeeAgeInputV1,
  attendeeSafetySelfie,
  eventIdInputV1,
  joinAttendeeNameInputV1,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateAttendeePOST(
    {
      attendeeAgeInputV1,
      attendeeSafetySelfie,
      eventIdInputV1,
      joinAttendeeNameInputV1,
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
  return children({ loading, data, error, refetchCreateAttendee: refetch });
};

export const createEventPOST = async (
  Constants,
  {
    addressInputV1,
    dateInputV1,
    descriptionInputV1,
    hostAgeInputV1,
    hostNameInputV1,
    imageDbUrl,
    invitesInputV1,
    partySizeInputV1,
    rideNameInput,
    startTimeInputV1,
    tagsInputV1,
    trailNameInputV1,
  },
  handlers = {}
) => {
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/events`;
  const options = {
    body: JSON.stringify({
      host_name: hostNameInputV1,
      host_age: hostAgeInputV1,
      trail_names: trailNameInputV1,
      event_name: rideNameInput,
      party_size: partySizeInputV1,
      address: addressInputV1,
      start_time: startTimeInputV1,
      date: dateInputV1,
      invites: invitesInputV1,
      tags: tagsInputV1,
      event_description: descriptionInputV1,
      safety_selfie: imageDbUrl,
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
  descriptionInputV1,
  hostAgeInputV1,
  hostNameInputV1,
  imageDbUrl,
  invitesInputV1,
  partySizeInputV1,
  rideNameInput,
  startTimeInputV1,
  tagsInputV1,
  trailNameInputV1,
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
      descriptionInputV1,
      hostAgeInputV1,
      hostNameInputV1,
      imageDbUrl,
      invitesInputV1,
      partySizeInputV1,
      rideNameInput,
      startTimeInputV1,
      tagsInputV1,
      trailNameInputV1,
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

export const deleteEventByIDDELETE = async (
  Constants,
  { id, select },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['select'] = select !== undefined ? renderParam(select) : '';
  if (id !== undefined) {
    paramsDict['id'] = `eq.${renderParam(id)}`;
  }
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
    method: 'DELETE',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useDeleteEventByIDDELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      deleteEventByIDDELETE(Constants, { ...initialArgs, ...args }, handlers),
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

export const getAttendeesGET = async (Constants, { select }, handlers = {}) => {
  const paramsDict = {};
  paramsDict['select'] = select !== undefined ? renderParam(select) : '';
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/attendees${renderQueryString(
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

export const useGetAttendeesGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['attendees', args],
    () => getAttendeesGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAttendeesGET = ({
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
  } = useGetAttendeesGET(
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
  return children({ loading, data, error, refetchGetAttendees: refetch });
};

export const getAttendeesByEventIdGET = async (
  Constants,
  { eventId, select },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['select'] = select !== undefined ? renderParam(select) : '';
  paramsDict['event_id'] =
    eventId !== undefined ? `eq.${renderParam(eventId)}` : '';
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/attendees${renderQueryString(
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

export const useGetAttendeesByEventIdGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['attendees', args],
    () => getAttendeesByEventIdGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAttendeesByEventIdGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  eventId,
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
  } = useGetAttendeesByEventIdGET(
    { eventId, select },
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
    refetchGetAttendeesByEventId: refetch,
  });
};

export const getEventDescriptionGET = async (
  Constants,
  { event_description, id },
  handlers = {}
) => {
  const paramsDict = {};
  if (event_description !== undefined) {
    paramsDict['select'] = renderParam(event_description);
  }
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

export const useGetEventDescriptionGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['event', args],
    () => getEventDescriptionGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['events']),
    }
  );
};

export const FetchGetEventDescriptionGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  event_description,
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
  } = useGetEventDescriptionGET(
    { event_description, id },
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
    refetchGetEventDescription: refetch,
  });
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

export const getHostInfoGET = async (
  Constants,
  { host_age, id, saftey_selfie },
  handlers = {}
) => {
  const paramsDict = {};
  if (host_age !== undefined) {
    paramsDict['select'] = renderParam(host_age);
  }
  paramsDict['id'] = id !== undefined ? `eq.${renderParam(id)}` : '';
  if (saftey_selfie !== undefined) {
    paramsDict['select'] = renderParam(saftey_selfie);
  }
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

export const useGetHostInfoGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['events', args],
    () => getHostInfoGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetHostInfoGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  host_age,
  id,
  saftey_selfie,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetHostInfoGET(
    { host_age, id, saftey_selfie },
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
  return children({ loading, data, error, refetchGetHostInfo: refetch });
};

export const getSingleAttendeeGET = async (
  Constants,
  { id, select },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['select'] = select !== undefined ? renderParam(select) : '';
  paramsDict['id'] = id !== undefined ? `eq.${renderParam(id)}` : '';
  const url = `https://ctiafgkrjympwdsviiew.supabase.co/rest/v1/attendees${renderQueryString(
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

export const useGetSingleAttendeeGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['attendee', args],
    () => getSingleAttendeeGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['attendees']),
    }
  );
};

export const FetchGetSingleAttendeeGET = ({
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
  } = useGetSingleAttendeeGET(
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
  return children({ loading, data, error, refetchGetSingleAttendee: refetch });
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

export const getTrailNamesGET = async (
  Constants,
  { id, trail_names },
  handlers = {}
) => {
  const paramsDict = {};
  if (trail_names !== undefined) {
    paramsDict['select'] = renderParam(trail_names);
  }
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

export const useGetTrailNamesGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['event', args],
    () => getTrailNamesGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['events']),
    }
  );
};

export const FetchGetTrailNamesGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
  trail_names,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetTrailNamesGET(
    { id, trail_names },
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
  return children({ loading, data, error, refetchGetTrailNames: refetch });
};
