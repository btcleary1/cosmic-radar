import { redirect } from 'next/navigation';

// Root redirects straight to the hub (main crypto dashboard)
export default function Home() {
  redirect('/hub');
}
