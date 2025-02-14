export default function ShowReceiptItem({
  title,
  value,
  bold = false,
}: {
  title: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="w-full flex items-start justify-between text-sm">
      <span className="flex-1 font-semibold">{title}:</span>
      <span className={`${bold ? "font-bold" : ""}`}>{value}</span>
    </div>
  );
}
