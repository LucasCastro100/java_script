import { stackIcons } from "@/icons/stackIcons";

export const StackList = ({ tags }: { tags: string[] }) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Stacks usadas:</h4>
    <div className="flex flex-wrap gap-8 justify-center">
      {tags.map(tag => {
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
