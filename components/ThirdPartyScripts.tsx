export default function ThirdPartyScripts() {
  return (
    <>
      {/* Google Analytics - will be blocked by Termly */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" data-termly-policy="analytics"></script>
      <script data-termly-policy="analytics" dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `
      }}></script>
      
      {/* Facebook Pixel - will be blocked by Termly */}
      <img 
        src="https://www.facebook.com/tr?id=123456789&ev=PageView&noscript=1" 
        width="1" 
        height="1" 
        style={{display: 'none'}} 
        alt="" 
        data-termly-policy="marketing"
      />
      
      {/* Google Ads - will be blocked by Termly */}
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890"
        data-termly-policy="advertising"
      ></script>
      
      {/* Marketing Cookies - will be blocked by Termly */}
      <script data-termly-policy="marketing" dangerouslySetInnerHTML={{
        __html: `
          document.cookie = "marketing_test=true; path=/; max-age=86400";
          document.cookie = "ad_tracking=enabled; path=/; max-age=86400";
          console.log('Marketing cookies set');
        `
      }}></script>
      
      {/* Twitter Pixel - will be blocked by Termly */}
      <script data-termly-policy="marketing" dangerouslySetInnerHTML={{
        __html: `
          window.twq = window.twq || function(){(window.twq.q = window.twq.q || []).push(arguments)};
          window.twq('init','o1234');
          window.twq('track','PageView');
        `
      }}></script>
      <script async src="https://static.ads-twitter.com/uwt.js" data-termly-policy="marketing"></script>
      
      {/* LinkedIn Insight Tag - will be blocked by Termly */}
      <script 
        async 
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        data-termly-policy="marketing"
      ></script>
      
      {/* TikTok Pixel - will be blocked by Termly */}
      <script data-termly-policy="marketing" dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.load('C123456789');ttq.page();
          }(window, document, 'ttq');
        `
      }}></script>
      
      {/* Hotjar - will be blocked by Termly */}
      <script data-termly-policy="analytics" dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:1234567,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `
      }}></script>
    </>
  )
}