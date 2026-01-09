export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Next.js Pages Router - Termly Integration Test</h1>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>YouTube Video (Advertising Category)</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; compute-pressure 'none'"
          allowFullScreen
          data-categories="advertising"
        ></iframe>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Policy Links</h2>
        <ul>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/cookie-policy">Cookie Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Test Scripts</h2>
        <p>Facebook Pixel (should be blocked until consent):</p>
      </section>

      <script
        type="text/plain"
        data-categories="advertising"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `
        }}
      />
    </div>
  );
}
