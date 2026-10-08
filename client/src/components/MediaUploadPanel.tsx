import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { startLogin } from '@/const';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import {
  AudioLines,
  CheckCircle2,
  FileAudio,
  FileText,
  FileVideo,
  ImagePlus,
  Loader2,
  LockKeyhole,
  Play,
  Upload,
  Video,
} from 'lucide-react';

type MediaKind = 'gallery' | 'sermon';
type MediaFormat = 'image' | 'video' | 'audio' | 'document';

type MediaUploadPanelProps = {
  kind: MediaKind;
  title: string;
  description: string;
  accent: string;
  accept: string;
};

const MAX_UPLOAD_SIZE = 35 * 1024 * 1024;

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatFromFile = (file: File): MediaFormat => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'document';
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? '');
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = () => reject(new Error('Unable to read this file.'));
    reader.readAsDataURL(file);
  });

const MediaIcon = ({ format }: { format: MediaFormat }) => {
  if (format === 'image') return <ImagePlus className="h-5 w-5" aria-hidden="true" />;
  if (format === 'video') return <FileVideo className="h-5 w-5" aria-hidden="true" />;
  if (format === 'audio') return <FileAudio className="h-5 w-5" aria-hidden="true" />;
  return <FileText className="h-5 w-5" aria-hidden="true" />;
};

export default function MediaUploadPanel({ kind, title, description, accent, accept }: MediaUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [sermonDate, setSermonDate] = useState('');
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const assetsQuery = trpc.media.list.useQuery({ kind });
  const uploadMutation = trpc.media.upload.useMutation({
    onSuccess: async () => {
      setSuccessMessage(kind === 'gallery' ? 'Image added to the gallery.' : 'Sermon added to the library.');
      setFormError('');
      setFile(null);
      setTitleValue('');
      setDescriptionValue('');
      setSpeaker('');
      setSermonDate('');
      if (inputRef.current) inputRef.current.value = '';
      await utils.media.list.invalidate({ kind });
    },
    onError: (error) => {
      setSuccessMessage('');
      setFormError(error.message || 'The upload could not be completed.');
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setSuccessMessage('');
    setFormError('');
    setFileError('');

    if (!nextFile) {
      setFile(null);
      return;
    }

    if (nextFile.size > MAX_UPLOAD_SIZE) {
      setFile(null);
      setFileError('Please choose a file smaller than 35 MB.');
      return;
    }

    if (kind === 'gallery' && !nextFile.type.startsWith('image/')) {
      setFile(null);
      setFileError('Gallery uploads must be image files.');
      return;
    }

    setFile(nextFile);
    if (!titleValue) {
      setTitleValue(nextFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setFormError('');

    if (!file) {
      setFormError('Choose a file before uploading.');
      return;
    }
    if (!titleValue.trim()) {
      setFormError('Add a title for this upload.');
      return;
    }

    try {
      const fileData = await fileToBase64(file);
      await uploadMutation.mutateAsync({
        kind,
        format: formatFromFile(file),
        title: titleValue.trim(),
        description: descriptionValue.trim() || undefined,
        speaker: kind === 'sermon' ? speaker.trim() || undefined : undefined,
        sermonDate: kind === 'sermon' ? sermonDate || undefined : undefined,
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        fileSize: file.size,
        fileData,
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'The file could not be prepared.');
    }
  };

  return (
    <section className="mt-16" aria-labelledby={`${kind}-library-heading`}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">Digital ministry archive</p>
          <h2 id={`${kind}-library-heading`} className="text-3xl font-bold text-deep-blue">{title}</h2>
          <p className="mt-2 max-w-2xl text-gray-600">{description}</p>
        </div>
        <div className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold ${accent}`}>
          <Upload className="h-4 w-4" aria-hidden="true" /> Admin uploads
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f5f9ff] to-white p-6 shadow-[0_20px_50px_rgba(18,58,130,0.1)]">
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-deep-blue p-3 text-white">
              <MediaIcon format={kind === 'gallery' ? 'image' : 'video'} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-deep-blue">Upload {kind === 'gallery' ? 'gallery images' : 'a sermon'}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {kind === 'gallery' ? 'Add event, worship, and ministry photos to the public gallery.' : 'Upload a video, audio recording, or Word document sermon.'}
              </p>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-xl border border-dashed border-blue-200 bg-white p-5 text-center">
              <LockKeyhole className="mx-auto mb-3 h-7 w-7 text-gold" aria-hidden="true" />
              <p className="font-semibold text-deep-blue">Admin access is required</p>
              <p className="mt-2 text-sm text-gray-600">Sign in with your ministry account to upload content.</p>
              <button type="button" onClick={() => startLogin()} className="mt-4 rounded-full bg-deep-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">
                Sign in to upload
              </button>
            </div>
          ) : user?.role !== 'admin' ? (
            <div className="rounded-xl border border-dashed border-blue-200 bg-white p-5 text-center">
              <LockKeyhole className="mx-auto mb-3 h-7 w-7 text-gold" aria-hidden="true" />
              <p className="font-semibold text-deep-blue">Admin access required</p>
              <p className="mt-2 text-sm text-gray-600">Your signed-in account can browse this library but cannot publish files.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block cursor-pointer rounded-xl border-2 border-dashed border-blue-200 bg-white p-5 text-center transition hover:border-gold hover:bg-[#fffdf7]">
                <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="sr-only" />
                <Upload className="mx-auto mb-2 h-7 w-7 text-deep-blue" aria-hidden="true" />
                <span className="block font-semibold text-deep-blue">Choose a file</span>
                <span className="mt-1 block text-xs text-gray-500">Maximum 35 MB · {accept.replaceAll(',', ', ')}</span>
              </label>

              {file && (
                <div className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm shadow-sm">
                  <div className="rounded-lg bg-light-gray p-2 text-deep-blue"><MediaIcon format={formatFromFile(file)} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-deep-blue">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
              )}

              <input value={titleValue} onChange={(event) => setTitleValue(event.target.value)} placeholder="Title" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-deep-blue outline-none focus:border-gold" required />
              {kind === 'sermon' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={speaker} onChange={(event) => setSpeaker(event.target.value)} placeholder="Speaker" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-deep-blue outline-none focus:border-gold" />
                  <input type="date" value={sermonDate} onChange={(event) => setSermonDate(event.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-deep-blue outline-none focus:border-gold" />
                </div>
              )}
              <textarea value={descriptionValue} onChange={(event) => setDescriptionValue(event.target.value)} placeholder="Short description (optional)" rows={3} className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-deep-blue outline-none focus:border-gold" />
              <button type="submit" disabled={uploadMutation.isPending} className="flex w-full items-center justify-center gap-2 rounded-full bg-deep-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
                {uploadMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
                {uploadMutation.isPending ? 'Uploading…' : 'Upload to library'}
              </button>
            </form>
          )}

          {(fileError || formError) && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{fileError || formError}</p>}
          {successMessage && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{successMessage}</p>}
        </div>

        <div>
          {assetsQuery.isLoading ? (
            <div className="flex min-h-48 items-center justify-center rounded-2xl bg-light-gray text-gray-500"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading library…</div>
          ) : assetsQuery.error ? (
            <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">Unable to load this library right now.</div>
          ) : assetsQuery.data?.length ? (
            <div className={kind === 'gallery' ? 'grid grid-cols-2 gap-4 sm:grid-cols-3' : 'space-y-4'}>
              {assetsQuery.data.map((asset) => (
                <article key={asset.id} className={kind === 'gallery' ? 'group overflow-hidden rounded-2xl bg-white shadow-md' : 'rounded-2xl border border-blue-100 bg-white p-4 shadow-md'}>
                  {kind === 'gallery' ? (
                    <a href={asset.storageUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="aspect-square overflow-hidden bg-light-gray">
                        <img src={asset.storageUrl} alt={asset.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-3"><h3 className="truncate font-bold text-deep-blue">{asset.title}</h3><p className="mt-1 text-xs text-gray-500">{new Date(asset.createdAt).toLocaleDateString()}</p></div>
                    </a>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-gold/15 p-3 text-gold"><MediaIcon format={asset.format as MediaFormat} /></div>
                        <div className="min-w-0 flex-1"><h3 className="font-bold text-deep-blue">{asset.title}</h3><p className="mt-1 text-sm text-gray-600">{asset.speaker || 'Anchor of Christ International Ministries'}{asset.sermonDate ? ` · ${asset.sermonDate}` : ''}</p></div>
                        {asset.format === 'video' && <Video className="h-5 w-5 text-red-500" aria-label="Video sermon" />}
                        {asset.format === 'audio' && <AudioLines className="h-5 w-5 text-deep-blue" aria-label="Audio sermon" />}
                      </div>
                      {asset.description && <p className="mt-3 text-sm leading-6 text-gray-600">{asset.description}</p>}
                      {asset.format === 'video' && <video className="mt-4 w-full rounded-xl bg-black" controls preload="metadata" src={asset.storageUrl}><track kind="captions" /></video>}
                      {asset.format === 'audio' && <audio className="mt-4 w-full" controls src={asset.storageUrl} />}
                      {asset.format === 'document' && <a href={asset.storageUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-deep-blue px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"><FileText className="h-4 w-4" aria-hidden="true" /> Open Word sermon</a>}
                    </>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-[#f8fbff] p-8 text-center">
              {kind === 'gallery' ? <ImagePlus className="mb-3 h-9 w-9 text-gold" aria-hidden="true" /> : <Play className="mb-3 h-9 w-9 text-gold" aria-hidden="true" />}
              <p className="font-semibold text-deep-blue">Your {kind === 'gallery' ? 'gallery' : 'sermon library'} is ready</p>
              <p className="mt-2 max-w-sm text-sm text-gray-600">Uploaded content will appear here for visitors to browse and play.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
