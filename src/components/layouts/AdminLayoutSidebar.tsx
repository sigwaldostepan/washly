import { ADMIN_NAVIGATIONS } from '@/constants';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { JWTPayload } from '@/lib/jwt';

interface AdminLayoutSidebarProps {
  admin: JWTPayload;
}

export const AdminLayoutSidebar: React.FC<AdminLayoutSidebarProps> = ({ admin }) => {
  const placeholder = admin.name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
    .substring(0, 2);

  return (
    <Sidebar variant='sidebar' collapsible='offcanvas'>
      <SidebarContent>
        <SidebarHeader className='mt-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='rounded-full'>
              <AvatarFallback className='bg-foreground text-muted'>{placeholder}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-semibold'>{admin.name}</p>
              <p className='text-muted-foreground text-xs'>{admin.email}</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_NAVIGATIONS.map((navigation) => (
                <SidebarMenuItem key={navigation.label}>
                  <SidebarMenuButton asChild>
                    <Link href={navigation.href}>
                      <navigation.icon />
                      <span className='capitalize'>{navigation.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
