import { Separator } from "@/app/admin/components/ui/separator";
import { DisplayForm } from "@/app/admin/settings/display/display-form";

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-sm text-muted-foreground">
          Turn items on or off to control what&apos;s displayed in the app.
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  );
}
