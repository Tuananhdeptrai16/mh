import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

const { confirm } = Modal;

const useConfirmExit = (confirmExit, when = true) => {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    navigator.push = (...args) => {
      const confirm = () => push(...args);
      confirmExit(confirm);
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when]);
};

export const usePrompt = ({
  title = 'Rời trang?',
  message = 'Các thay đổi của bạn sẽ không được lưu. Bạn có muốn tiếp tục?',
  when = true,
  onContinue,
}) => {
  // This is to ensure that work is saved on page accidental exit or refresh
  useEffect(() => {
    if (when) {
      window.onbeforeunload = function () {
        return message;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  const confirmExit = useCallback(
    (confirmNavigation) => {
      const onConfirm = () => {
        if (onContinue) onContinue();
        confirmNavigation();
      };

      confirm({
        title,
        icon: <ExclamationCircleOutlined />,
        content: message,
        onOk: onConfirm,
        onCancel: onContinue,
        width: 500,
        okText: 'Đồng ý',
      });
    },
    [message, onContinue, title],
  );

  useConfirmExit(confirmExit, when);
};
