"use client"

import { Menu, X } from "lucide-react"
import {
  Button,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  Avatar,
  DrawerFooter,
} from "@/src/shared/ui"
import { ProjectSelector } from "./ProjectSelector"
import Link from "next/link"
import { DRAWER_ACCOUNT_LINKS } from "../model/const"

export const MobileMenu = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger className="sm:hidden" asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex w-full! max-w-sm flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between gap-3 border-b">
          <ProjectSelector />
          <DrawerClose asChild>
            <Button className="rounded-md" variant="ghost" size="icon">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <span className="mb-2 block text-xs font-bold tracking-wider text-foreground/50 uppercase">
              Profile
            </span>

            <ul className="flex flex-col gap-1">
              {DRAWER_ACCOUNT_LINKS.map((link) => {
                const Icon = link.icon

                return (
                  <li className="flex-1" key={link.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <DrawerClose asChild>
                        <Link href={link.href}>
                          <Icon className="size-4" />
                          {link.key}
                        </Link>
                      </DrawerClose>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        <DrawerFooter className="border-t">
          <div className="flex items-center gap-3">
            <Avatar />
            <span className="text-sm font-medium">User</span>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
