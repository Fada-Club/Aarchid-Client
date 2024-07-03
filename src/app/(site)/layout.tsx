import { deleteCookies } from "@/actions/user/cookiers";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <div className="flex flex-row">
      <div>
        <Sidebar deleteCookie={deleteCookies}/>
      </div>
      <div className="flex flex-col">
        <div>
          <TopBar/>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
