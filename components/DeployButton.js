import { useState } from 'react';

export default function DeployButton({ projectId, onDeployed }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDeploy = async () => {
    setLoading(true);
    setResult(null);
    try {
      // In a real app, fetch your project data first. Here we send a placeholder file.
      const files = [{ path: 'pages/index.js', content: '// demo project file' }];
      const projectName = `Project ${projectId}`;

      const res = await fetch('http://localhost:4000/deploy-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files, projectName })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setResult('Deploy failed: ' + (errorData.error || res.statusText));
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult('Deployed! Live URL: https://' + data.url);
      if (onDeployed) onDeployed(data.url);
    } catch (err) {
      setResult('Deploy error: ' + (err?.message || String(err)));
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button
        onClick={handleDeploy}
        disabled={loading}
        style={{
          background: '#10B981',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Deploying...' : 'Deploy Project'}
      </button>
      {result && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{result}</div>
      )}
    </div>
  );
}