import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import AppLocale from './localization'; // Đảm bảo bạn đã cấu hình đúng
import ExampleNotification from './example/ExampleNotification';

function App() {
  const currentLocale = 'en';  // Ngôn ngữ hiện tại (tiếng Việt)

  return (
    <IntlProvider locale={currentLocale} messages={AppLocale[currentLocale].messages}>
      <div>
        <h1>
          <FormattedMessage id="greeting" defaultMessage="Hello!" />
          <FormattedMessage id="hello" defaultMessage="I love you!" />
        </h1>
        <p>
          <FormattedMessage id="sidebar.market_report_management" defaultMessage="Market Report Management" />
        </p>
        <ExampleNotification></ExampleNotification>
      </div>
    </IntlProvider>
  );
}

export default App;
