import { FaReact, FaNodeJs } from "react-icons/fa";
import { MdStorage } from "react-icons/md";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiMysql  } from "react-icons/si";

export const stackIcons: Record<string, { icon: JSX.Element; label: string }> = {
  react: { icon: <FaReact />, label: "React" },
  typescript: { icon: <SiTypescript />, label: "TypeScript" },
  nextjs: { icon: <SiNextdotjs />, label: "Next.js" },
  tailwindcss: { icon: <SiTailwindcss />, label: "TailwindCSS" },
  nodejs: { icon: <FaNodeJs />, label: "Node.js" },
  express: { icon: <SiExpress />, label: "Express" },
  mongodb: { icon: <SiMongodb />, label: "MongoDB" },
  storage: { icon: <MdStorage />, label: "Storage" },
  mysql: { icon: <SiMysql />, label: "Mysql" },
};
