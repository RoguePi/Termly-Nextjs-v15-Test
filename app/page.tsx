import ConsentButton from '../components/ConsentButton'

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
      <ConsentButton />
    </main>
  )
}