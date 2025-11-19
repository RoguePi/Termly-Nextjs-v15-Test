export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Next.js v16</h1>
        <p>Next-generation web development with cutting-edge features and performance</p>
        
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
      </div>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '8px',
        maxWidth: '800px'
      }}>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=4cd065e3-375a-432d-b502-637f707a97de" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Privacy Policy
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=0dba82c5-dcfd-4b57-88f5-3e3187a9375d" target="_blank" rel="noopener noreferrer" data-termly-policy="terms" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Terms & Conditions
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=48b90709-f7e3-477a-92e0-c0651c58ea92" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          EULA
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=b8805927-bede-443a-8e00-0cecc5e085ab" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Return Policy
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=a6daf11f-eca0-42aa-819f-9176e280e531" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Disclaimer
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=f83305ce-4481-4155-adfe-6b77217dd7ce" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Shipping Policy
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=04bd18d4-a636-4043-860e-b9d20814a3c5" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Acceptable Use
        </a>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=6f33d3ff-28cd-44c8-9311-2882270e33c0" target="_blank" rel="noopener noreferrer" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Impressum
        </a>
        <a href="#" className="termly-display-preferences" style={{
          padding: '8px 12px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Consent Preferences
        </a>
      </div>
    </main>
  )
}