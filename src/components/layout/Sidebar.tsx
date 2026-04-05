
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Flame,
  User,
  Settings,
  Newspaper,
  Rss,
  Heart
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { users, companies } from '@/lib/data';


const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/trends', label: 'Trends', icon: Flame },
  { href: '/live', label: 'Live News', icon: Rss },
  { href: '/liked', label: 'Liked', icon: Heart },
];

const bigTechCompanies = companies.filter(c => ['Google', 'Apple', 'Microsoft', 'Nvidia', 'Meta'].includes(c.name));

const adminItems = [
  { href: '/admin', label: 'Admin', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const currentUser = users.find(u => u.role === 'admin') || users[0];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild variant="default" size="lg" className="mb-4">
              <Link href="/article/new">
                <Newspaper />
                <span>New Post</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="my-4">
            {menuItems.map((item) => (
              <SidebarMenuButton
                key={item.href}
                asChild
                variant="ghost"
                isActive={isActive(item.href)}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenuItem>
          <Separator className="my-2" />
          <SidebarMenuItem>
            <p className="px-2 pt-4 pb-2 text-xs font-medium text-muted-foreground">Big Tech</p>
            <div className="flex items-center justify-around px-2 py-2">
            {bigTechCompanies.map((company) => (
               <Link key={company.id} href={`/company/${company.slug}`}>
                <Avatar className="h-8 w-8 transition-transform duration-300 ease-in-out hover:scale-110">
                    <AvatarImage src={company.logoUrl} alt={company.name} data-ai-hint={company.logoHint} className="p-1 bg-white rounded-full" />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
               </Link>
            ))}
            </div>
          </SidebarMenuItem>
          <Separator className="my-2" />
          {currentUser.role === 'admin' && (
            <SidebarMenuItem>
               <p className="px-2 pt-4 pb-2 text-xs font-medium text-muted-foreground">Admin</p>
              {adminItems.map((item) => (
                <SidebarMenuButton
                  key={item.href}
                  asChild
                  variant="ghost"
                  isActive={isActive(item.href)}
                  tooltip={{ children: item.label, side: 'right', align: 'center' }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto w-full justify-start p-2">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoUrl} alt={currentUser.displayName} data-ai-hint={currentUser.photoHint} />
                    <AvatarFallback>
                      {currentUser.displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{currentUser.displayName}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56 mb-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
