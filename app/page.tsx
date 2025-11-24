import TrackingElements from '../components/TrackingElements'

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
        
        <TrackingElements />
      </div>
      
      <footer style={{
        marginTop: '4rem',
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=4cd065e3-375a-432d-b502-637f707a97de" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=0dba82c5-dcfd-4b57-88f5-3e3187a9375d" target="_blank" rel="noopener noreferrer" data-termly-policy="terms" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Terms</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=48b90709-f7e3-477a-92e0-c0651c58ea92" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>EULA</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=b8805927-bede-443a-8e00-0cecc5e085ab" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Returns</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=a6daf11f-eca0-42aa-819f-9176e280e531" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Disclaimer</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=f83305ce-4481-4155-adfe-6b77217dd7ce" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Shipping</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=04bd18d4-a636-4043-860e-b9d20814a3c5" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Acceptable Use</a>
          |
          <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=6f33d3ff-28cd-44c8-9311-2882270e33c0" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Impressum</a>
          |
          <a href="#" className="termly-display-preferences" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Cookie Preferences</a>
        </div>
      </footer>
    </main>
  )
}