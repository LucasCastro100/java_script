import { ListMenuItemProps } from "../list-menu/type";

export interface SidebarAccordionProps {
  title: string;
  items: ListMenuItemProps[];
  defaultOpen?: boolean;
}