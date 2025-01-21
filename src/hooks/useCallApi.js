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
import useCustomNotification from '../shared/utils/notification';
const useCallApi = ({ success, callApi, error = undefined, useToastShowError = true, customErrorHandler = null }) => {
  const { messages } = useIntl();
  const [loading, setLoading] = useState(false);
  const { error: handleError } = useCustomNotification();
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
        
        // Kiểm tra lỗi trong dữ liệu nhận được
        if (
          isErrorResponse(dataFromServer) ||
          isErrorResponse(dataFromServer.data) ||
          dataFromServer.status >= 400
        ) {
          const errorMessage = getMessageResponse(dataFromServer.data);
          const errors = getErrorsResponse(dataFromServer);

          // Tùy chỉnh lỗi nếu cần
          if (customErrorHandler) {
            customErrorHandler(dataFromServer);
          }

          // Hiển thị thông báo lỗi
          if (useToastShowError) {
            if (isEmpty(errors)) {
              handleError(errorMessage);
            } else {
              const textError = Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ));
              handleError(textError);
            }
          }

          // Gọi hàm `error` nếu có
          if (error) {
            error({
              code: getCodeResponse(dataFromServer),
              message: errorMessage,
              raw: dataFromServer,
            });
          }

          // Trả về reject với dữ liệu lỗi nếu cần
          reject({
            code: getCodeResponse(dataFromServer),
            message: errorMessage,
            raw: dataFromServer,
          });
        } else {
          // Nếu không có lỗi, trả về kết quả xử lý
          const result = getResultResponse(dataFromServer ? dataFromServer : "không dữ liệu");
          console.log('Dữ liệu sau khi xử lý:', result); // Debug
          resolve(result, params);

          if (success) {
            success(result, params);  // Gọi success với dữ liệu đã xử lý
          }
        }
      }).catch((thrown) => {
        setLoading(false);
        
        // Xử lý lỗi từ API
        const messageError = getMessageResponse(thrown);
        const errors = getErrorsResponse(thrown?.raw);
        
        if (isEmpty(errors)) {
          const messageShow = messages?.[messageError] || messageError;
          handleError(messageShow);

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
          handleError(textError);

          // Gọi reject để trả về lỗi
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
