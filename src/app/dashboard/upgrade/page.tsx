import { UpgradeClient } from './components/upgrade-client';

export default function UpgradePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium font-headline">Upgrade Your Plan</h1>
        <p className="text-sm text-muted-foreground">
          Choose a service package to unlock your full potential and get expert guidance.
        </p>
      </div>
      <UpgradeClient />
    </div>
  );
}
