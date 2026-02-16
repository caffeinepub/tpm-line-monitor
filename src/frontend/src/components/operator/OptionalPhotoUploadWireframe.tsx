import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export default function OptionalPhotoUploadWireframe() {
  return (
    <div className="space-y-2">
      <Button variant="outline" size="lg" className="w-full h-14 gap-2">
        <Camera className="h-5 w-5" />
        Attach Photo
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Upload a photo of completed work (optional)
      </p>
      <div className="bg-muted rounded-lg p-8 text-center mt-4">
        <p className="text-muted-foreground">Photo preview placeholder</p>
      </div>
    </div>
  );
}
