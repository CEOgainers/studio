
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { SettingsClient } from './components/settings-client';
  
  export default function SettingsPage() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-medium font-headline">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and notification settings.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Account</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
                <SettingsClient />
            </CardContent>
        </Card>
      </div>
    );
  }
  