import { KEY_SOURCE_EVENT_MESSAGE } from 'src/shared/constants/DataFixed';

export const postMessageIframe = function (
  payload = { event: '', payload: {} },
  options,
) {
  const { target } = options;
  // console.log({ target });
  const data = {
    source: KEY_SOURCE_EVENT_MESSAGE,
    payload: payload,
  };
  // console.log({ data });
  if (target?.contentWindow?.postMessage) {
    target?.contentWindow?.postMessage(data, {
      targetOrigin: '*',
    });
  }
};
