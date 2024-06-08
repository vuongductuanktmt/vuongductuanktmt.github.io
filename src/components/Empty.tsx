import EmptyIcon from "~/icons/EmptyIcon";

export default function Empty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex justify-center flex-col items-center h-full">
      <EmptyIcon />
      <div>
        <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
          {title}
        </h2>
        <p className="text-center text-black text-sm font-normal leading-snug pb-4">
          {description}
        </p>
      </div>
    </div>
  );
}
