import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import { uploadImage, UploadResult } from '@/lib/imageUpload';
import { useToast } from '@/hooks/use-toast';
import { useWeb3 } from '@/contexts/Web3Context';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  currentImage?: string;
  onUploadComplete: (result: UploadResult) => void;
  label?: string;
  className?: string;
  useWeb3?: boolean;
  maxSize?: number; // in MB
}

export const ImageUpload = ({
  currentImage,
  onUploadComplete,
  label = 'Upload Image',
  className,
  useWeb3 = false,
  maxSize = 5,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResult, setUploadedResult] = useState<UploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { isConnected: isWeb3Connected } = useWeb3();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: `Image must be less than ${maxSize}MB`,
        variant: 'destructive',
      });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      const result = await uploadImage(file, useWeb3 && isWeb3Connected);
      setUploadedResult(result);
      onUploadComplete(result);
      toast({
        title: 'Upload successful',
        description: useWeb3 && result.type === 'ipfs' 
          ? 'Image uploaded to IPFS (decentralized storage)' 
          : 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadedResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Label>{label}</Label>
      
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={preview || undefined} alt="Preview" />
          <AvatarFallback>
            <Upload className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
              id="image-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </>
              )}
            </Button>
            
            {preview && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {uploadedResult && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {uploadedResult.type === 'ipfs' 
                  ? 'Stored on IPFS (Web3)' 
                  : 'Stored locally'}
              </span>
            </div>
          )}

          <p className="text-xs text-gray-500">
            Max size: {maxSize}MB. {useWeb3 && isWeb3Connected && 'Using Web3 storage (IPFS)'}
          </p>
        </div>
      </div>
    </div>
  );
};

