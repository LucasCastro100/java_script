import { stackIcons } from "@/icons/stackIcons";

type StackListProps = {
  stacks: string[];
};

export const StackList = ({ stacks }: StackListProps) => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <h4 className="text-sm font-semibold text-gray-700">Stacks usadas</h4>
    <div className="flex flex-wrap gap-8 justify-center">
      {stacks.map(tag => {
        const stack = stackIcons[tag.toLowerCase()];
        if (!stack) return null;
        return (
          <div
            key={tag}
            className="flex flex-col items-center transition-transform transform hover:scale-110 text-2xl"
            aria-label={stack.label}
            title={stack.label}
          >
            {stack.icon}
          </div>
        );
      })}
    </div>
  </div>
);
