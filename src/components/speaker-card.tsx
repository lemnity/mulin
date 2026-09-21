import Image from "next/image";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function SpeakerCard({
  name,
  bio,
  photo,
}: {
  name: string;
  bio: string;
  photo?: string;
}) {
  return (
    <div className="flex gap-4">
      {photo ? (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image src={photo} alt={name} fill sizes="64px" className="object-cover" />
        </div>
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-tint text-lg font-semibold text-blue">
          {initialsOf(name)}
        </div>
      )}
      <div>
        <p className="font-semibold text-ink">{name}</p>
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-body">{bio}</p>
      </div>
    </div>
  );
}
