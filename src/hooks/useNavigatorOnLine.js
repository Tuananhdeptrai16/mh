import { useState, useEffect, useRef } from "react";

export const useNetworkStatusNotifier = () => {
  console.log('Hàm này đang đước sử udnjg ');
    const [message, setMessage] = useState("");
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const firstUpdate = useRef(true);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);

            // Bỏ qua lần cập nhật đầu tiên
            if (firstUpdate.current) {
                firstUpdate.current = false;
                return;
            }

            // Hiển thị thông báo
            navigator.onLine
                ? setMessage("You are back online!")
                : setMessage("You are currently offline");
        };

        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    return { message, isOnline };
};
