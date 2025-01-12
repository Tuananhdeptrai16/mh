import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  isErrorResponse,
  getMessageResponse,
  getResultResponse,
  getCodeResponse,
  getErrorsResponse,
} from '../shared/utils/Service';
import { isEmpty, isPromise } from '../shared/utils/Typeof';
import notification from '../shared/utils/notification';

const useCallApi = ({ success, callApi, error = undefined, useToastShowError = true, customErrorHandler = null }) => {
    const { messages } = useIntl();
    const [loading, setLoading] = useState(false);
  
    const send = (params) => {
      return new Promise((resolve, reject) => {
        let rs = callApi(params);
        if (!isPromise(rs)) {
          reject({ message: 'API không trả về Promise' });
          return;
        }
        setLoading(true);
        rs.then((dataFromServer = {}) => {
          setLoading(false);
          console.log('Dữ liệu nhận được từ server:', dataFromServer);  // Debug
          if (
            isErrorResponse(dataFromServer) ||
            isErrorResponse(dataFromServer.data) ||
            dataFromServer.status >= 400
          ) {

            const errorMessage = getMessageResponse(dataFromServer.data);
            const errors = getErrorsResponse(dataFromServer);
  
            if (customErrorHandler) {
              customErrorHandler(dataFromServer);
            }
  
            if (useToastShowError) {
              if (isEmpty(errors)) {
                notification.error(errorMessage);
              } else {
                const textError = Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ));
                notification.error(textError);
              }
            }
  
            if (error) {
              error({
                code: getCodeResponse(dataFromServer),
                message: errorMessage,
                raw: dataFromServer,
              });
            }
          } else {
            console.log("Chạy thành công r",dataFromServer );
            const result = getResultResponse(dataFromServer?.data);
         //   const result = getResultResponse(dataFromServer ? dataFromServer : "không dữ liệu");
            console.log('Dữ liệu sau khi xử lý:', result); // Debug
            resolve(result, params);
            if (success) {
              success(result, params);  // Gọi success với dữ liệu đã xử lý
            }
          }
        }).catch((thrown) => {
          setLoading(false);
          const messageError = getMessageResponse(thrown);
          const errors = getErrorsResponse(thrown?.raw);
  
          if (isEmpty(errors)) {
            const messageShow = messages?.[messageError] || messageError;
            notification.error(messageShow);
            reject({
              code: getCodeResponse(thrown),
              message: messageShow,
              raw: thrown,
            });
            if (error) {
              error({
                code: getCodeResponse(thrown),
                message: messageShow,
                raw: thrown,
              });
            }
          } else {
            const textError = Object.values(errors).map((error, index) => (
              <div key={index}>{error}</div>
            ));
            notification.error(textError);
            reject({
              code: getCodeResponse(thrown),
              message: Object.values(errors).join('\n'),
              raw: thrown,
            });
            if (error) {
              error({
                code: getCodeResponse(thrown),
                message: Object.values(errors).join('\n'),
                raw: thrown,
              });
            }
          }
        });
      });
    };
  
    return {
      loading,
      send,
    };
  };
  

export default useCallApi;
