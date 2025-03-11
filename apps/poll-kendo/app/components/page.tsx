import { ReactNode, FC } from "react";

type PageProps = {
  title: string;
  children: ReactNode;
};

export const Page: FC<PageProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col min-h-screen p-16 items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            {title}
          </h1>
          <div className="h-[80px]">
            <img src="/bitovi-logo.png" alt="Bitovi" className="block w-full" />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};
