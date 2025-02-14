export function FormationActionButtonDirectionChild({
  dir,
  onClick,
}: {
  dir: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-sm bg-primary p-1 ${
        dir == "-"
          ? "rotate-90"
          : dir == "|"
          ? "rotate-0"
          : dir == "/"
          ? "rotate-45"
          : "rotate-[135deg]"
      }`}
      onClick={onClick}
    >
      {"|"}
    </button>
  );
}
export function FormationActionButtonChild({
  isAdd,
  onClick,
}: {
  isAdd: boolean;
  onClick: () => void;
}) {
  return (
    <button className="rounded-sm bg-primary p-1" onClick={onClick}>
      {isAdd ? "+" : "-"}
    </button>
  );
}
export default function FormationActionButton({
  isRemove,
  isHorizontal,
  onAdd,
  onRemove,
}: {
  isRemove: boolean;
  isHorizontal: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"} gap-1`}>
      <FormationActionButtonChild isAdd={true} onClick={onAdd} />
      {isRemove && (
        <FormationActionButtonChild isAdd={false} onClick={onRemove} />
      )}
    </div>
  );
}
