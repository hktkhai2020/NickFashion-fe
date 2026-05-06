import { notification } from "antd";

const useGlobal = () => {
  const [api, contextHolder] = notification.useNotification();
  return {
    api,
    contextHolder,
  };
};

export default useGlobal;
