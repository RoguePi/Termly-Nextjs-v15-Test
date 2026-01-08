export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Next.js v15</h1>
        <p>Modern web development with elegant design and powerful features</p>
        
        <div className="features">
          <div className="feature">
            <h3>⚡ Fast</h3>
            <p>Optimized performance</p>
          </div>
          <div className="feature">
            <h3>🎨 Beautiful</h3>
            <p>Modern design</p>
          </div>
          <div className="feature">
            <h3>📱 Responsive</h3>
            <p>Works everywhere</p>
          </div>
        </div>
        
        {/* YouTube embed - will be blocked by Termly */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>Featured Video</h2>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/xnOwOBYaA3w" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{
              maxWidth: '100%',
              borderRadius: '10px'
            }}
            data-categories="advertising"
          ></iframe>
        </div>
        
        {/* Policy Links */}
        <footer style={{
          marginTop: '3rem',
          padding: '2rem 0',
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=1763a4cf-d4be-48ed-864f-f9d653d38d83" style={{ color: '#667eea', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=162b211b-1872-4580-831e-c8abb42cf0a7" style={{ color: '#667eea', textDecoration: 'none' }}>Cookie Policy</a>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=c39e5888-b2d4-47c2-92b9-ba2e808ecab1" style={{ color: '#667eea', textDecoration: 'none' }}>Return Policy</a>
            <a href="#" className="termly-display-preferences">Consent Preferences</a>
          </div>
        </footer>
      </div>
      
      {/* Example third-party scripts - these will be blocked by Termly */}
      
      {/* Facebook Pixel */}
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
      
    </main>
  )
}