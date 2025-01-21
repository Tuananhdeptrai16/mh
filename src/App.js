import React from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import AppLocale from "./localization"; // Đảm bảo bạn đã cấu hình đúng
import ExampleNotification from "./example/ExampleNotification";
import ExampleCustomApiCall from "./example/ExampleUseCallApi";
import ExampleUseEncryptData from "./example/ExampleUseEncryptData";
import { NetworkStatusIndicator } from "./example/NetworkStatusIndicator";
import ExampleDragElement from "./example/Drag/ExampleDragElement";
function App() {
  const currentLocale = "vi"; // Ngôn ngữ hiện tại (tiếng Việt)

  return (
    <IntlProvider
      locale={currentLocale}
      messages={AppLocale[currentLocale].messages}
    >
      <div>
        <h1>
          <FormattedMessage id="greeting" defaultMessage="Hello!" />
          <FormattedMessage id="hello" defaultMessage="I love you!" />
        </h1>
        <p>
          <FormattedMessage
            id="sidebar.market_report_management"
            defaultMessage="Market Report Management"
          />
        </p>
        <ExampleNotification></ExampleNotification>
        <ExampleCustomApiCall></ExampleCustomApiCall>
        <ExampleUseEncryptData></ExampleUseEncryptData>
        <NetworkStatusIndicator></NetworkStatusIndicator>
        <ExampleDragElement></ExampleDragElement>
      </div>
    </IntlProvider>
  );
}

export default App;
