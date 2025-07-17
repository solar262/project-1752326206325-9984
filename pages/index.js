import DeployButton from '../components/DeployButton';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to your generated app!</h1>
      <p>Click below to deploy the demo project to Vercel.</p>
      <DeployButton projectId="demo" />
    </main>
  );
}