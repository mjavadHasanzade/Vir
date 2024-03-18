import React, { useState } from "react";
import styles from "./styles.module.css";
import CloseIcon from "~/images/close.svg";

interface NoticeProps {
  children: React.ReactNode;
  status: "SUCCESS" | "ERROR";
  mini?: boolean;
  dismissible?: boolean;
  style?: React.CSSProperties;
}

const Notice: React.FC<NoticeProps> = ({
  children,
  status,
  mini,
  dismissible,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      style={style}
      className={[
        styles.notice,
        isVisible !== true ? styles.notDisplayed : "",
        status === "SUCCESS" ? styles.successNotice : "",
        status === "ERROR" ? styles.errorNotice : "",
        mini ? styles.miniNotice : "",
      ].join(" ")}
    >
      {dismissible && (
        <span
          role="button"
          tabIndex={0}
          className={styles.dismiss}
          onClick={() => setIsVisible(false)}
        >
          <img src={CloseIcon.src} alt="close icon" />
        </span>
      )}
      {children}
    </div>
  );
};

export default Notice;