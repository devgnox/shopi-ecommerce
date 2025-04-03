'use client'
import React from "react";
import { useNotifications } from "../../hooks/useNotification";

const Notification = () => {
  const notifications = useNotifications();

  if(notifications.items.length ==0 ) return null

  return (
    <div aria-live="assertive" className="fixed top-2 right-2 w-full bg-amber-600 h-10">
      {notifications.items?.filter((notification) => notification.active)
        .map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
            <button onClick={() => notifications.remove(notification.id)}>
              Dismiss notification
            </button>
          </div>
        ))}
    </div>
  );
};

export default Notification;
